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
}

export interface ISigninUserResult {
  message: string
  success: boolean
  data?: ISigninUserData
}
