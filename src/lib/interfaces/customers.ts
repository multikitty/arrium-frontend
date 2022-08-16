export interface ICustomersListVariables {
  nextPage?: boolean
  sk?: string
  pk?: string
  customerID?: string
  pkEmail?: string
}

export interface ICustomersListDataItem {
  phoneNumber: string
  currentSteps: string
  pkEmail: string
  emailVerified: boolean
  lastname: string
  password: string
  accountStatus: string
  role: string
  firstname: string
  sk: string
  phoneVerified: boolean
  pk: string
  dialCode: string
  customerID: string
}

export interface ICustomersListDataLastEvaluatedKey {
  pkEmail: string
  sk: string
  pk: string
  customerID: string
}

export interface ICustomersListData {
  Items: ICustomersListDataItem[]
  Count: number
  ScannedCount: number
  LastEvaluatedKey: ICustomersListDataLastEvaluatedKey
}

export interface ICustomersListResult {
  message: string
  success: boolean
  data?: ICustomersListData
}

export interface ICustomerAccountInfoVariables {
  pk: string
  sk: string
}

export interface ICustomerAccountInfoData {
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

export interface ICustomerAccountInfoResult {
  message: string
  success: boolean
  data?: ICustomerAccountInfoData
}

export interface ICustomerConfigInfoVariables {
  pk: string
}

export interface ICustomerConfigInfoData {
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

export interface ICustomerConfigInfoResult {
  message: string
  success: boolean
  data?: ICustomerConfigInfoData
}
