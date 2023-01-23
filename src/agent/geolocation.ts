import { useQuery, UseQueryOptions, UseQueryResult } from "react-query"
import { getGeolocationAPI } from "./axios"

export interface GeolocationData {
  country: string
  country_code: string
  calling_code: string
  flag: {
    img: string
    emoji: string
    emoji_unicode: string
  }
  timezone: {
    id: string
    abbr: string
    is_dst: boolean
    offset: number
    utc: string
    current_time: string
  }
}

function fetchGeolocation(): Promise<GeolocationData> {
  return getGeolocationAPI.get("").then(response => response.data)
}

export function useGeolocation(
  options?: UseQueryOptions<any, any, any, any>
): UseQueryResult<GeolocationData> {
  return useQuery("geolocation", fetchGeolocation, options)
}
