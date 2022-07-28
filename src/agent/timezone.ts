import { useQuery } from "react-query"
import { getTimezoneAPI, listTimezoneAPI } from "./axios"

export interface ITimezone {
  countryCode: string
  countryName: string
  gmtOffset: number
  timestamp: number
  zoneName: string
}

export interface IFetchTimezonesByCountryResult {
  message: string
  status: string
  zones: ITimezone[]
}

export interface IFetchTimezoneByZoneResult {
  gmtOffset: number
  message: string
  status: string
  zoneEnd: number
  zoneName: string
  zoneStart: number
}

export function fetchTimezonesByCountry(
  country: string
): Promise<IFetchTimezonesByCountryResult> {
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

export function fetchTimezoneByZone(
  zone: string
): Promise<IFetchTimezoneByZoneResult> {
  return getTimezoneAPI
    .get("", { params: { zone } })
    .then(response => response.data)
}

export function useTimezoneByZone(zone: string) {
  return useQuery(["timezone-data", zone], () => fetchTimezoneByZone(zone))
}
