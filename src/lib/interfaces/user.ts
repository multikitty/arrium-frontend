import { PlanType, RegistrationStepsType, UserRolesType } from "@/types/common"
import { CustomerAccountStatus } from "./customers"

export interface CurrentUserData {
  phoneNumber: string
  pricingPlan: boolean
  planType: PlanType
  refCode: string
  tzName: string
  currentSteps: RegistrationStepsType
  otp: number
  email: string
  country: string
  emailVerified: boolean
  lastname: string
  accountStatus: CustomerAccountStatus
  role: UserRolesType
  flexCountry: string
  firstname: string
  startDate: number
  sk: string
  phoneVerified: boolean
  region: string
  pk: string
  dialCode: string
  customerID: string
}

export interface CurrentUserResult {
  message: string
  success: boolean
  data?: CurrentUserData
}

export interface UserByRoleVariables {
  role: UserRolesType
}

export interface UserByRoleResultData {
  firstname: string
  lastname: string
  sk: string
  role: UserRolesType
  pk: string
}

export interface UserByRoleResult {
  message: string
  success: boolean
  data?: { Items: UserByRoleResultData[] }
}

export interface UpdatePasswordVariables {
  password: string
  newPassword: string
  confirmPassword: string
}

export interface UpdateProfileVariables {
  fieldName: "firstname" | "lastname" | "phoneNumber" | "tzName"
  fieldValue: string
}

export interface UpdateFlexInfoVariables {
  pk: string
  amznFlexUser: string
  amznFlexPassword: string
}

export interface UpdateProfileError {
  fieldName: string
  fieldValue: string
}

export interface UpdatePasswordResult {
  message: string
  success: boolean
}
export interface UpdateProfileResult {
  message: string
  success: boolean
  validationError?: UpdateProfileError
}

export interface RequestEmailVerifyVariables {
  email: string
}

export interface RequestEmailVerifyError {
  email: string
}

export interface RequestEmailVerifyResult {
  message: string
  success: boolean
  validationError?: RequestEmailVerifyError
}

export interface VerifyEmailVariables {
  verficationToken: string
}

export interface VerifyEmailError {
  verficationToken?: string
}

export interface VerifyEmailResult {
  message: string
  success: boolean
  validationError?: VerifyEmailError
}

export interface UpdatePricingPlanStatusVariables {
  userSK: string
  userPK: string
  pricingPlan: boolean
}

export interface UpdatePricingPlanStatusError
  extends UpdatePricingPlanStatusVariables {}

export interface UpdatePricingPlanStatusResult {
  message: string
  success: boolean
  validationError?: UpdatePricingPlanStatusError
}
