export interface ICurrentUserData {
  phoneNumber: string
  refCode: string
  countryCode: string
  tzName: string
  currentSteps: string
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

export interface ICurrentUserResult {
  message: string
  success: boolean
  data?: ICurrentUserData
}
