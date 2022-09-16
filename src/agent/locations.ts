import { ICountryListResult } from "@/lib/interfaces/locations"
import { useQuery } from "react-query"
import { arriumAPI } from "./axios"

export function fetchCountryList(): Promise<ICountryListResult> {
  return arriumAPI.get("/location/country").then(response => response.data)
}

export function useCountryList() {
  return useQuery("country-list", () => fetchCountryList())
}
