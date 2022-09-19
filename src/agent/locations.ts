import {
  ICountryListResult,
  IRegionListResult,
  IRegionListVariables,
} from "@/lib/interfaces/locations"
import { useQuery } from "react-query"
import { arriumAPI } from "./axios"

export function fetchCountryList(): Promise<ICountryListResult> {
  return arriumAPI.get("/location/country").then(response => response.data)
}

export function useCountryList() {
  return useQuery("country-list", () => fetchCountryList())
}

export function fetchRegionList(
  country_code: IRegionListVariables["country_code"]
): Promise<IRegionListResult> {
  return arriumAPI
    .get("/location/region", { params: { country_code } })
    .then(response => response.data)
}

export function useRegionList(
  country_code: IRegionListVariables["country_code"]
) {
  return useQuery("region-list", () => fetchRegionList(country_code), {
    enabled: !!country_code,
  })
}
