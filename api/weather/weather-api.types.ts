export type UserField = "defaults" | "profile"

/** All user fields as an array */
export const UserFields = ["defaults", "profile"] as ReadonlyArray<UserField>

export interface UserPersonalInfoApiData {
  country?: string
  age?: number
  biography?: string
  city?: string
  dob?: string
}

/** User status info */
export interface UserStatus {
  // @deprecated Use `levelInfo` from the `ArtistLevelStore`
  artistLevel?: number
  // @deprecated Use `levelInfo.level > 0` instead
  //             Previously, `verifiedArtist` would be how we determine
  //             whether a user is an artist. On the backend, this would
  //             just be a level check on the old profile artist level
  //
  //             The artist leveling service is now the source of truth
  //             for artist levels and thus we're moving away from this
  //             flag and surfacing a direct level info check
  verifiedArtist?: boolean
  // Whether the user is a headliner
  //
  // Previously, we'd determine this by checking artist level >= 100,
  // but moving forward, headliners could be level 1 artists, so this
  // is a new flag to indicate "headliner" status
  verified?: boolean
  /** Whether the artist has had their stream verified */
  streamVerified?: boolean
}

export interface UserProfileApiData {
  personalInfo?: UserPersonalInfoApiData
  image?: string
  socialMedia?: Record<string, string | null>
  moji?: { id: string; owned?: boolean }
  userStatus?: UserStatus
  verifiedArtist?: boolean
}

export interface UserApiData {
  id: string
  name?: string
  type?: string
  fullName?: string
  full_name?: string
  profile?: UserProfileApiData
  followers?: { count: number }
  enabled?: boolean
  createdAt?: string
}

export enum NotificationSubscriptionTypes {
  "artist",
}

export interface FollowConnectionsData {
  id: string
  followerId: string
  targetId: string
  userId: string
  notificationSubscriptionEnabled: boolean
  type: NotificationSubscriptionTypes
  notificationSubscriptionId: string
  createdAt?: string
}
