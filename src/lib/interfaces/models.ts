export interface IPhoneModelListVariables {
  next_page?: boolean
  sk?: string
  pk?: string
  entityName: "phoneModel"
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
