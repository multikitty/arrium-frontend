export interface IStationTypeListDataItem {
  sk: string
  stationType: string
  pk: string
}

export interface IStationTypeListData {
  Items: IStationTypeListDataItem[]
  Count: number
  ScannedCount: number
}

export interface IStationTypeListResult {
  message: string
  success: boolean
  data?: IStationTypeListData
}
