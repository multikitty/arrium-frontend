export interface PhoneModelListVariables {
  next_page?: boolean
  sk?: string
  pk?: string
}

export interface PhoneModelListDataItem {
  ModelID: string
  sk: string
  ModelName: string
  pk: string
}

export interface PhoneModelListData {
  Items: PhoneModelListDataItem[]
  Count: number
  ScannedCount: number
}

export interface PhoneModelListResult {
  success: boolean
  message: string
  data: PhoneModelListData
  validationError?: PhoneModelListVariables
}

export interface AddPhoneModelVariables {
  modelName: string
  modelId: string
}

export interface AddPhoneModelResult {
  success: boolean
  message: string
  validationError?: AddPhoneModelVariables
}

export interface OsVersionListVariables {
  next_page?: boolean
  sk?: string
  pk?: string
}

export interface OsVersionListDataItem {
  sk: string
  osVersion: string
  pk: string
}

export interface OsVersionListData {
  Items: OsVersionListDataItem[]
  Count: number
  ScannedCount: number
}

export interface OsVersionListResult {
  success: boolean
  message: string
  data: OsVersionListData
  validationError?: OsVersionListVariables
}

export interface AddOsVersionVariables {
  osVersion: string
}

export interface AddOsVersionResult {
  success: boolean
  message: string
  validationError?: AddOsVersionVariables
}

export interface FlexVersionListVariables {
  next_page?: boolean
  sk?: string
  pk?: string
}

export interface FlexVersionListDataItem {
  sk: string
  flexVersion: string
  pk: string
}

export interface FlexVersionListData {
  Items: FlexVersionListDataItem[]
  Count: number
  ScannedCount: number
}

export interface FlexVersionListResult {
  success: boolean
  message: string
  data: FlexVersionListData
  validationError?: FlexVersionListVariables
}

export interface AddFlexVersionVariables {
  flexVersion: string
}

export interface AddFlexVersionResult {
  success: boolean
  message: string
  validationError?: AddFlexVersionVariables
}

export interface DeleteModelsAndVersionsVariables {
  deletePk: string
  deleteSk: string
}

export interface DeleteModelsAndVersionsResult {
  success: boolean
  message: string
  validationError?: DeleteModelsAndVersionsVariables
}
