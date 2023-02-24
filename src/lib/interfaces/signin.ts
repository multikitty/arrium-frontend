import { PlanType, RegistrationStepsType, UserRolesType } from "@/types/common"
import { CustomerAccountStatus } from "@/lib/interfaces/customers"

export interface SigninUserVariables {
  email: string
  password: string
}

export interface SigninUserData {
  phoneNumber: string
  refCode: string
  created_at: number
  tzName: string
  currentSteps: RegistrationStepsType
  email: string
  amznFlexUser: string
  emailVerified: boolean
  lastname: string
  role: UserRolesType
  firstname: string
  sk: string
  phoneVerified: boolean
  pk: string
  customerID: string
  token: string
  planType: PlanType
  accountStatus: CustomerAccountStatus
  flexCountry: string
  stationType: string
  startDate: Date | null
  endDate: Date | null
}

export interface SigninFlexData {
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
}

export interface SigninData {
  userData: SigninUserData
  flexData: SigninFlexData
  isFreeTrial: boolean
}

export interface SigninUserResult {
  message: string
  success: boolean
  data?: SigninData
}
