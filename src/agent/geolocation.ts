import { useQuery } from "react-query"
import { getGeolocationAPI } from "./axios"

export interface IGeolocationData {
  calling_code: string
  country_code2: string
  country_flag: string
  country_name: string
  ip: "223.236.25.233"
  latitude: string
  longitude: string
  time_zone: {
    current_time: string
    current_time_unix: number
    dst_savings: number
    is_dst: boolean
    name: string
    offset: number
  }
}

function fetchGeolocation(): Promise<IGeolocationData> {
  return getGeolocationAPI.get("").then(response => response.data)
}

export function useGeolocation() {
  return useQuery("geolocation", () => fetchGeolocation())
}
