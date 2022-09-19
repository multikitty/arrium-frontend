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
