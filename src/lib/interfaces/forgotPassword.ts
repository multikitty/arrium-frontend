export interface IForgotPasswordVariables {
  email: string
}

export interface IForgotPasswordError extends IForgotPasswordVariables {}

export interface IForgotPasswordResult {
  message: string
  success: boolean
  validationError?: IForgotPasswordError
}
