export interface ForgotPasswordVariables {
  email: string
}

export interface ForgotPasswordError extends ForgotPasswordVariables {}

export interface ForgotPasswordResult {
  message: string
  success: boolean
  validationError?: ForgotPasswordError
}

export interface ForgotPasswordVerifyTokenVariables {
  verficationToken: string
}

export interface ForgotPasswordVerifyTokenValidationError
  extends Partial<ForgotPasswordVerifyTokenVariables> {}

export interface ForgotPasswordVerifyTokenResult {
  message: string
  success: boolean
  validationError?: ForgotPasswordVerifyTokenValidationError
}

export interface ForgotPasswordUpdatePasswordVariables {
  verficationToken: string
  password: string
}

export interface ForgotPasswordUpdatePasswordValidationError
  extends Partial<ForgotPasswordUpdatePasswordVariables> {}

export interface ForgotPasswordUpdatePasswordResult {
  message: string
  success: boolean
  validationError?: ForgotPasswordUpdatePasswordValidationError
}
