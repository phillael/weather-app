import { UserApi } from "../../api/weather";
import { MockEnvironment } from "../../test/models/mock-environment";
import {
  mockRequest,
  mockResponse,
  mockResponseError,
} from "../../test/__mocks__/api";
import { UserModel } from "../user/user";
import { createUserStoreDefaultModel, UserStoreModel } from "./user-store";

const fetchedUserId = "test-fetch";
const env = MockEnvironment();

test("can be created", () => {
  const instance = UserStoreModel.create({});
  expect(instance).toBeTruthy();
  const defaultModel = createUserStoreDefaultModel();
  expect(defaultModel).toBeTruthy();
});

describe("views", () => {
  describe("get", () => {
    test("returns user id for user with passed name", () => {
      const id = "test_user_id";
      const name = "Test Name";
      const userSnapshot = { id, name };
      const existing = UserModel.create(userSnapshot);
      const store = UserStoreModel.create({
        users: { test_user_id: userSnapshot },
      });
      expect(store.get(id)?.id).toEqual(existing.id);
    });
  });
});

describe("actions", () => {
  describe("add", () => {
    test("adds new correctly", () => {
      const store = UserStoreModel.create({}, env);
      store.add({ id: "strong", name: "strong_name" }, true);
      expect(store.get("strong")?.name).toEqual("strong_name");
      store.add({ id: "weak", name: "weak_name" }, false);
      expect(store.get("weak")?.name).toEqual("weak_name");
    });
    test("merges with existing correctly (weak vs strong)", () => {
      const store = UserStoreModel.create(
        { users: { [fetchedUserId]: { id: fetchedUserId, name: "existing" } } },
        env
      );
      store.add({ id: fetchedUserId, name: "new" }, true);
      expect(store.get(fetchedUserId)?.name).toEqual("existing");
      store.add({ id: fetchedUserId, name: "new" }, false);
      expect(store.get(fetchedUserId)?.name).toEqual("new");
    });
  });
  describe("fetch", () => {
    test("fetches user info", async () => {
      const store = UserStoreModel.create({}, env);

      const request = mockRequest();
      jest.spyOn(UserApi, "getUser").mockReturnValue(request as any);
      store.fetch(fetchedUserId);
      expect(UserApi.getUser).toHaveBeenCalledWith(fetchedUserId);

      const callback = env.apiStore.dispatch.mock.calls[0][2];
      await callback(mockResponse({ id: fetchedUserId, name: "Test Name" }));

      expect(store.get(fetchedUserId)?.name).toEqual("Test Name");
      expect(store.get(fetchedUserId)?.id).toEqual(fetchedUserId);
      jest.clearAllMocks();
    });
    test("missing user ends up in the missingUsers map", async () => {
      const store = UserStoreModel.create({}, env);
      const request = mockRequest();
      jest.spyOn(UserApi, "getUser").mockReturnValue(request as any);
      const mockSet = jest.spyOn(store.missingUsers, "set");
      const mockPut = jest.spyOn(store.users, "put");

      store.fetch(fetchedUserId);
      const callback = env.apiStore.dispatch.mock.calls[0][2];
      await callback(mockResponseError());
      expect(mockPut).not.toBeCalled();
      expect(mockSet).toBeCalled();
      expect(store.missingUsers.get(fetchedUserId)).toBeTruthy();
      jest.clearAllMocks();
    });
  });
});
