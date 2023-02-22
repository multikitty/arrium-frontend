import { RegistrationStepsType } from "@/types/common"

export interface CurrentUserData {
  phoneNumber: string
  refCode: string
  country: string
  tzName: string
  currentSteps: RegistrationStepsType
  email: string
  emailVerified: boolean
  pkEmail: string
  lastname: string
  accountStatus: string
  role: string
  firstname: string
  startDate: number
  sk: string
  phoneVerified: boolean
  pk: string
  dialCode: string
  customerID: string
}

export interface CurrentUserResult {
  message: string
  success: boolean
  data?: CurrentUserData
}

export interface UpdateProfileVariables {
  fieldName: "firstname" | "lastname" | "phoneNumber" | "tzName"
  fieldValue: string
}

export interface UpdateProfileError {
  fieldName: string
  fieldValue: string
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
