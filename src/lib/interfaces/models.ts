export interface IPhoneModelListVariables {
  next_page?: boolean
  sk?: string
  pk?: string
}

export interface IPhoneModelListDataItem {
  ModelID: string
  sk: string
  ModelName: string
  pk: string
}

export interface IPhoneModelListData {
  Items: IPhoneModelListDataItem[]
  Count: number
  ScannedCount: number
}

export interface IPhoneModelListResult {
  success: boolean
  message: string
  data: IPhoneModelListData
  validationError?: IPhoneModelListVariables
}

export interface IOsVersionListVariables {
  next_page?: boolean
  sk?: string
  pk?: string
}

export interface IOsVersionListDataItem {
  sk: string
  osVersion: string
  pk: string
}

export interface IOsVersionListData {
  Items: IOsVersionListDataItem[]
  Count: number
  ScannedCount: number
}

export interface IOsVersionListResult {
  success: boolean
  message: string
  data: IOsVersionListData
  validationError?: IOsVersionListVariables
}

export interface IFlexVersionListVariables {
  next_page?: boolean
  sk?: string
  pk?: string
}

export interface IFlexVersionListDataItem {
  sk: string
  flexVersion: string
  pk: string
}

export interface IFlexVersionListData {
  Items: IFlexVersionListDataItem[]
  Count: number
  ScannedCount: number
}

export interface IFlexVersionListResult {
  success: boolean
  message: string
  data: IFlexVersionListData
  validationError?: IFlexVersionListVariables
}
