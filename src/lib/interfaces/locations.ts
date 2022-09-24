export interface ICountryListDataItem {
  tzEnd?: string
  countryCode: string
  tzName?: string
  tzCAbb?: string
  country: string
  tzDst?: string
  tzNAbb?: string
  tzGMToffset?: string
  tzStart?: string
  sk: string
  pk: string
  dialCode?: string
}

export interface ICountryListData {
  Items: ICountryListDataItem[]
  Count: number
  ScannedCount: number
}

export interface ICountryListResult {
  message: string
  success: boolean
  data?: ICountryListData
}

export interface IAddCountryVariables {
  tzEnd?: string
  country: string
  countryCode: string
  tzName?: string
  tzCAbb?: string
  tzDst?: string
  tzNAbb?: string
  tzGMToffset?: string
  tzStart?: string
  dialCode?: string
}

export interface IAddCountryResult {
  success: boolean
  message: string
  validationError?: IAddCountryVariables
}

export interface IRegionListVariables {
  country_code: string
}

export interface IRegionListDataItem {
  sk: string
  regionCode: string
  pk: string
  regionName: string
  regionID: string
}

export interface IRegionListData {
  Items: IRegionListDataItem[]
  Count: number
  ScannedCount: number
}

export interface IRegionListResult {
  message: string
  success: boolean
  data?: IRegionListData
  validationError?: IRegionListVariables
}

export interface IAddRegionVariables {
  countryCode: string
  regionName: string
  regionCode: string
  regionId: string
}

export interface IAddRegionResult {
  success: boolean
  message: string
  validationError?: IAddRegionVariables
}

export interface IStationListVariables {
  countryCode: string
  regionCode: string
}

export interface IStationListDataItem {
  stationCode: string
  stationType: string
  stationID: string
  stationName: string
  sk: string
  regionCode: string
  pk: string
  regionName: string
  regionID: string
}

export interface IStationListData {
  Items: IStationListDataItem[]
  Count: number
  ScannedCount: number
}

export interface IStationListResult {
  message: string
  success: boolean
  data?: IStationListData
  validationError?: IStationListVariables
}

export interface IAddStationVariables {
  countryCode: string
  regionName: string
  regionCode: string
  regionId: string
  stationName: string
  stationCode: string
  stationId: string
  stationType: string
}

export interface IAddStationResult {
  success: boolean
  message: string
  validationError?: IAddStationVariables
}

export interface IDeleteCountryVariables {
  sortKey: string
  partitionKey: string
}

export interface IDeleteCountryResult {
  message: string
  success: boolean
  validationError?: IDeleteCountryVariables
}

export interface IDeleteRegionVariables extends IDeleteCountryVariables {}

export interface IDeleteRegionResult extends IDeleteCountryResult {}

export interface IDeleteStationVariables extends IDeleteCountryVariables {}

export interface IDeleteStationResult extends IDeleteCountryResult {}
