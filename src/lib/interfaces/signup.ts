export interface IRegistrationUserVariables {
  email: string
  password: string
  country: string
  refCode: string
}

export interface IRegistrationUserData {
  token: string
}

export interface IRegistrationUserValidationError
  extends IRegistrationUserVariables {}

export interface IRegistrationUserResult {
  message: string
  success: boolean
  data?: IRegistrationUserData
  validationError?: IRegistrationUserValidationError
}

export interface IAccountInfoVariables {
  firstname: string
  lastname: string
  country: string
  dialCode: string
  phoneNumber: string
  tzName: string
}

export interface IAccountInfoValidationError extends IAccountInfoVariables {}

export interface IAccountInfoResult {
  message: string
  success: boolean
  validationError?: IAccountInfoValidationError
}

export interface IOtpConfirmationVariables {
  otp: string
}

export interface IOtpConfirmationValidationError {
  otp?: string
}

export interface IOtpConfirmationResult {
  message: string
  success: boolean
  validationError?: IOtpConfirmationValidationError
}

export interface IFlexInfoVariables {
  amznFlexUser: string
  amznFlexPassword: string
}

export interface IFlexInfoValidationError extends Partial<IFlexInfoVariables> {}

export interface IFlexInfoResult {
  message: string
  success: boolean
  validationError?: IFlexInfoValidationError
}
