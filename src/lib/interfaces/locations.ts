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
  Count: 6
  ScannedCount: 6
}

export interface ICountryListResult {
  message: string
  success: boolean
  data?: ICountryListData
}
