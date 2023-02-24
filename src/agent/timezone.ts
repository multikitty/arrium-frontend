import { useQuery } from "react-query"
import { arriumAPI, getTimezoneAPI, listTimezoneAPI } from "./axios"

export interface Timezone {
  countryCode: string
  countryName: string
  zoneName: string
  gmtOffset: number
  timestamp: number
}

export interface IFetchAllTimezonesListData {
  status: string
  message: string
  zones: Array<Timezone>
}

export interface IFetchAllTimezonesListResult {
  success: boolean
  message: string
  data: IFetchAllTimezonesListData
}

function fetchAllTimezonesList(): Promise<IFetchAllTimezonesListResult> {
  return arriumAPI.get("/timezone/list").then(response => response.data)
}

export function useAllTimezonesList() {
  return useQuery<IFetchAllTimezonesListResult>(
    "all-timezones-list",
    fetchAllTimezonesList
  )
}

export interface FetchTimezonesByCountryResult {
  message: string
  status: string
  zones: Timezone[]
}

export interface FetchTimezoneByZoneResult {
  gmtOffset: number
  message: string
  status: string
  zoneEnd: number
  zoneName: string
  zoneStart: number
}

function fetchTimezonesByCountry(
  country: string
): Promise<FetchTimezonesByCountryResult> {
  return listTimezoneAPI
    .get("", { params: { country } })
    .then(response => response.data)
}

export function useTimezonesByCountry(country: string | null) {
  return useQuery(
    ["timezone-list", country],
    () => fetchTimezonesByCountry(country!),
    { enabled: !!country }
  )
}

function fetchTimezoneByZone(zone: string): Promise<FetchTimezoneByZoneResult> {
  return getTimezoneAPI
    .get("", { params: { zone } })
    .then(response => response.data)
}

export function useTimezoneByZone(zone: string) {
  return useQuery(["timezone-data", zone], () => fetchTimezoneByZone(zone))
}
