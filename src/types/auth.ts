import { UserRolesType } from "./common"

export type UserType = {
  firstName: string
  lastName: string
  phoneNumber?: string
  isPhoneVerified?: boolean
  email?: string
  isEmailVerified?: boolean
  role?: UserRolesType
  id: string
} | null
