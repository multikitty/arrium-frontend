export interface RegistrationUserVariables {
  email: string
  password: string
  country: string
  refCode: string
}

export interface RegistrationUserData {
  token: string
}

export interface RegistrationUserValidationError
  extends RegistrationUserVariables {}

export interface RegistrationUserResult {
  message: string
  success: boolean
  data?: RegistrationUserData
  validationError?: RegistrationUserValidationError
}

export interface AccountInfoVariables {
  firstname: string
  lastname: string
  country: string
  dialCode: string
  phoneNumber: string
  tzName: string
}

export interface AccountInfoValidationError extends AccountInfoVariables {}

export interface AccountInfoResult {
  message: string
  success: boolean
  validationError?: AccountInfoValidationError
}

export interface OtpConfirmationVariables {
  otp: string
}

export interface OtpConfirmationValidationError {
  otp?: string
}

export interface OtpConfirmationResult {
  message: string
  success: boolean
  validationError?: OtpConfirmationValidationError
}

export interface FlexInfoVariables {
  amznFlexUser: string
  amznFlexPassword: string
}

export interface FlexInfoValidationError extends Partial<FlexInfoVariables> {}

export interface FlexInfoResult {
  message: string
  success: boolean
  validationError?: FlexInfoValidationError
}
