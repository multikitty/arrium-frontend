import { UserRolesType } from "@/types/common"

export interface CustomersListVariables {
  nextPage?: boolean
  sk?: string
  pk?: string
  customerID?: string
  pkEmail?: string
}

export type CustomerAccountStatus = "inActive" | "active" | "disabled"
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
  endDate?: number
  sk: string
  phoneVerified: boolean
  pk: string
  dialCode: string
  customerID: string
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
  awsreg1: string
  awsreg2: string
  flexID: string
  devModel: string
  devSerial: string
  devID: string
  blockType: string
  country: string
  amznFlexPassword: string
  amznFlexUser: string
  planName: string
  amznID: string
  flexVersion: string
  osVersion: string
  sk: string
  region: string
  pk: string
  cogid1: string
  devType: string
  cogid2: string
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
  email: string
  emailVerified: boolean
  tzName: string
  userRole: string
  status: string
  startDate: number | null
  endDate: number | null
  passwordChangeRequest: boolean
}

export interface UpdateUserAccountInfoError
  extends UpdateUserAccountInfoVariables {}

export interface UpdateUserAccountInfoResult {
  message: string
  success: boolean
  validationError?: UpdateUserAccountInfoError
}

export interface UpdateConfigurationDetailsVariables {
  userPk: string
  flexUser: string
  flexPassword: string
  devModel: string
  devType: string
  devId: string
  devSerialNumber: string
  osVersion: string
  flexVersion: string
  awsReg1: string
  cogId1: string
  awsReg2: string
  cogId2: string
  amznId: string
  flexId: string
  country: string
  region: string
  planName: string
  blockType: string
}

export interface UpdateConfigurationDetailsError
  extends UpdateConfigurationDetailsVariables {}

export interface UpdateConfigurationDetailsResult {
  message: string
  success: boolean
  validationError?: UpdateConfigurationDetailsError
}
