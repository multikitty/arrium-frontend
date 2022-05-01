import { UserRoles } from "./common"

export type UserType = {
  firstName: string
  lastName: string
  phoneNumber?: string
  isPhoneVerified?: boolean
  email?: string
  isEmailVerified?: boolean
  role?: UserRoles
} | null
