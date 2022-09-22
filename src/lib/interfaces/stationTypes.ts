import { IDeleteCountryResult, IDeleteCountryVariables } from "./locations"

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

export interface IAddStationTypeVariables {
  stationType: string
}

export interface IAddStationTypeResult {
  success: boolean
  message: string
  validationError?: IAddStationTypeVariables
}

export interface IDeleteStationTypeVariables extends IDeleteCountryVariables {}

export interface IDeleteStationTypeResult extends IDeleteCountryResult {}
