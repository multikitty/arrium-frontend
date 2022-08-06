import { RegistrationStepsType, UserRolesType } from "@/types/common"

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
