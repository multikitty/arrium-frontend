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
  currentSteps?: RegistrationStepsType
  sk?: string
  pk?: string
  accountStatus: string,
  flexCountry: string,
  stationType: string,
  startDate: Date | null,
  endDate: Date | null
} | null

export type FlexDataType = {
  flexID: string
  devModel: string
  devSerial: string
  devID: string
  country: string
  amznFlexUser: string
  amznFlexPassword: string
  amznID: string
  flexVersion: string
  osVersion: string
  region: string
  devType: string
  sk: string
  pk: string
} | null
