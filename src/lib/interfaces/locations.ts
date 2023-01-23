export interface CountryListDataItem {
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

export interface CountryListData {
  Items: CountryListDataItem[]
  Count: number
  ScannedCount: number
}

export interface CountryListResult {
  message: string
  success: boolean
  data?: CountryListData
}

export interface AddCountryVariables {
  country: string
  countryCode: string
}

export interface AddCountryResult {
  success: boolean
  message: string
  validationError?: AddCountryVariables
}

export interface RegionListVariables {
  country_code: string
}

export interface RegionListDataItem {
  sk: string
  regionCode: string
  pk: string
  regionName: string
  regionID: string
}

export interface RegionListData {
  Items: RegionListDataItem[]
  Count: number
  ScannedCount: number
}

export interface RegionListResult {
  message: string
  success: boolean
  data?: RegionListData
  validationError?: RegionListVariables
}

export interface AddRegionVariables {
  countryCode: string
  regionName: string
  regionCode: string
  regionId: string
}

export interface AddRegionResult {
  success: boolean
  message: string
  validationError?: AddRegionVariables
}

export interface StationListVariables {
  countryCode: string
  regionCode: string
}

export interface StationListDataItem {
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

export interface StationListData {
  Items: StationListDataItem[]
  Count: number
  ScannedCount: number
}

export interface StationListResult {
  message: string
  success: boolean
  data?: StationListData
  validationError?: StationListVariables
}

export interface AddStationVariables {
  countryCode: string
  regionName: string
  regionCode: string
  regionId: string
  stationName: string
  stationCode: string
  stationId: string
  stationType: string
  address1?: string
  address2?: string
  address3?: string
  city?: string
  state?: string
  postalCode?: string
  longitude?: string
  latitude?: string
}

export interface AddStationResult {
  success: boolean
  message: string
  validationError?: AddStationVariables
}

export interface DeleteCountryVariables {
  sortKey: string
  partitionKey: string
}

export interface DeleteCountryResult {
  message: string
  success: boolean
  validationError?: DeleteCountryVariables
}

export interface DeleteRegionVariables extends DeleteCountryVariables {}

export interface DeleteRegionResult extends DeleteCountryResult {}

export interface DeleteStationVariables extends DeleteCountryVariables {}

export interface DeleteStationResult extends DeleteCountryResult {}
