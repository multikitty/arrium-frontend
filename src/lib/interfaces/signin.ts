import { PlansType, RegistrationStepsType, UserRolesType } from "@/types/common"

export interface ISigninUserVariables {
  email: string
  password: string
}

export interface ISigninUserData {
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
  planType: PlansType
  accountStatus: string
  flexCountry: string
  stationType: string
  startDate: Date | null
  endDate: Date | null
}

export interface ISigninFlexData {
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

export interface ISigninData {
  userData: ISigninUserData
  flexData: ISigninFlexData
}

export interface ISigninUserResult {
  message: string
  success: boolean
  data?: ISigninData
}
