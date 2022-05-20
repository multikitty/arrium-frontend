import { UserRolesType } from "./common"
import { Plans } from "@/constants/common"

export type UserType = {
  id: string
  firstName: string
  lastName: string
  phoneNumber?: string
  isPhoneVerified?: boolean
  email?: string
  isEmailVerified?: boolean
  role?: UserRolesType
  plan?: keyof typeof Plans
} | null
