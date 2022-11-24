import { PlansType, RegistrationStepsType, UserRolesType } from "./common"
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
  tzName?: string
  amznFlexUser?: string
  refCode?: string
  currentSteps?: RegistrationStepsType,
  sk?: string,
  pk?: string
} | null
