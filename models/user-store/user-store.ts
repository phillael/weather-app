import { flow, Instance, SnapshotOut, types } from "mobx-state-tree";
import { WeatherApi } from "../../api/weather";

/**
 * A store containing all known users, keyed by their id.
 * Contains actions to fetch users.
 */
export const UserStoreModel = types
  .model("UserStore")
  .props({
    /** Map of all known users and data, keyed by user id */
    users: types.map({}),
    /** All known missing user ids */
    missingUsers: types.optional(types.map(types.boolean), {}),
  })
  .views((self) => ({
    get(userId: string) {
      return self.users.get(userId);
    },
  }))
  .actions((self) => ({
    /**
     * Adds a user into the store, merging with an existing user if one exists
     * @param user the user Id or User
     * @param weak whether this is a weak merge - trust the existing user fields over this
     */
    add(user: UserSnapshotIn, weak = false) {
      const { id } = user;
      const existingUser = self.users.get(id);
      if (existingUser) {
        mergeSnapshot(existingUser, user, weak);
      } else {
        self.users.put(user);
      }
    },
  }))
  .actions((self) => ({
    fetch: flow(function* (userId: string) {
      const response = yield asyncApi(self, UserApi.getUser(userId));
      if (response.ok) {
        self.add({ id: response.data.id, name: response.data.name });
      } else {
        self.missingUsers.set(userId, true);
      }
    }),
  }));

type UserStoreType = Instance<typeof UserStoreModel>;
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>;
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
export const createUserStoreDefaultModel = () =>
  types.optional(UserStoreModel, {});
