export interface ForgotPasswordVariables {
  email: string
}

export interface ForgotPasswordError extends ForgotPasswordVariables {}

export interface ForgotPasswordResult {
  message: string
  success: boolean
  validationError?: ForgotPasswordError
}
