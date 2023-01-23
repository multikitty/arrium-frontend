import { DeleteCountryResult, DeleteCountryVariables } from "./locations"

export interface StationTypeListDataItem {
  sk: string
  stationType: string
  pk: string
}

export interface StationTypeListData {
  Items: StationTypeListDataItem[]
  Count: number
  ScannedCount: number
}

export interface StationTypeListResult {
  message: string
  success: boolean
  data?: StationTypeListData
}

export interface AddStationTypeVariables {
  stationType: string
}

export interface AddStationTypeResult {
  success: boolean
  message: string
  validationError?: AddStationTypeVariables
}

export interface DeleteStationTypeVariables extends DeleteCountryVariables {}

export interface DeleteStationTypeResult extends DeleteCountryResult {}
