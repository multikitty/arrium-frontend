import { PlansType, UserRolesType } from "./common"
import { CountryData } from "@/utils/getCountryData"

export type UserType = {
  id: string
  firstName: string
  lastName: string
  country: CountryData["countryShortName"]
  phoneNumber?: string
  isPhoneVerified?: boolean
  email?: string
  isEmailVerified?: boolean
  role?: UserRolesType
  plan?: PlansType
} | null
