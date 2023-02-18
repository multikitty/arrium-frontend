import { PlansType, UserRolesType } from "@/types/common"

export interface CustomersListVariables {
  nextPage?: boolean
  sk?: string
  pk?: string
  customerID?: string
  pkEmail?: string
}

export const CUSTOMER_ACCOUNT_STATUS = {
  active: "active",
  inActive: "inActive",
  disabled: "disabled",
} as const

export type CustomerAccountStatus = keyof typeof CUSTOMER_ACCOUNT_STATUS
export interface CustomersListDataItem {
  accountStatus: CustomerAccountStatus
  country: string
  currentSteps: string
  customerID: string
  dialCode: string
  email: string
  firstname: string
  lastname: string
  password: string
  phoneNumber: string
  pk: string
  region: string
  role: UserRolesType
  sk: string
}

export interface CustomersListDataLastEvaluatedKey {
  pkEmail: string
  sk: string
  pk: string
  customerID: string
}

export interface CustomersListData {
  Items: CustomersListDataItem[]
  Count: number
  ScannedCount: number
  LastEvaluatedKey: CustomersListDataLastEvaluatedKey
}

export interface CustomersListResult {
  message: string
  success: boolean
  data?: CustomersListData
}

export interface CustomerAccountInfoVariables {
  pk: string
  sk: string
}

export interface CustomerAccountInfoData {
  phoneNumber: string
  pricingPlan: boolean
  planType: PlansType
  refCode: string
  tzName: string
  currentSteps: string
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
  zendeskUserID: number
}

export interface CustomerAccountInfoResult {
  message: string
  success: boolean
  data?: CustomerAccountInfoData
}

export interface CustomerConfigInfoVariables {
  pk: string
}

export interface CustomerConfigInfoData {
  flexID: string
  usrAgent: string
  refToken: string
  sk: string
  accToken: string
  region: string
  pk: string
  country: string
  amznFlexPassword: string
  amznFlexUser: string
}

export interface CustomerConfigInfoResult {
  message: string
  success: boolean
  data?: CustomerConfigInfoData
}

export interface UpdateUserAccountInfoVariables {
  userSK: string
  userPK: string
  firstname: string
  lastname: string
  phoneNumber: string
  dialCode: string
  email: string
  emailVerified: boolean
  tzName: string
  userRole: UserRolesType
  status: CustomerAccountStatus
  planType: PlansType
  stationType: string
  startDate: number | null
  endDate: number | null
  passwordChangeRequest: boolean
  zendeskUserID: string
}

export interface UpdateUserAccountInfoError
  extends UpdateUserAccountInfoVariables {}

export interface UpdateUserAccountInfoResult {
  message: string
  success: boolean
  validationError?: UpdateUserAccountInfoError
}

export interface SendAccountApprovedEmailVariables {
  userSK: string
  userPK: string
}

export interface SendAccountApprovedEmailError
  extends SendAccountApprovedEmailVariables {}

export interface SendAccountApprovedEmailResult {
  message: string
  success: boolean
  validationError?: SendAccountApprovedEmailError
}

export interface UpdateConfigurationDetailsVariables {
  userPk: string
  userSk: string
  flexUser: string
  flexPassword: string
  accessToken: string
  refreshToken: string
  userAgent: string
  flexId: string
  country: string
  region: string
  zendeskUserID: string
  zendeskOrgID: string
}

export interface UpdateConfigurationDetailsError
  extends UpdateConfigurationDetailsVariables {}

export interface UpdateConfigurationDetailsResult {
  message: string
  success: boolean
  validationError?: UpdateConfigurationDetailsError
}
