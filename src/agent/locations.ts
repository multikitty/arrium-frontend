import {
  ICountryListResult,
  IDeleteCountryResult,
  IDeleteCountryVariables,
  IDeleteRegionResult,
  IDeleteRegionVariables,
  IRegionListResult,
  IRegionListVariables,
} from "@/lib/interfaces/locations"
import { MutationFunction, useQuery } from "react-query"
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
    .get("/location/region", { params: { coutnry_code: country_code } })
    .then(response => response.data)
}

export function useRegionList(
  country_code: IRegionListVariables["country_code"]
) {
  return useQuery(
    ["region-list", country_code],
    () => fetchRegionList(country_code),
    {
      enabled: !!country_code,
    }
  )
}

export const deleteCountry: MutationFunction<
  IDeleteCountryResult,
  IDeleteCountryVariables
> = async params => {
  return await (
    await arriumAPI.delete("/location/country", { data: params })
  ).data
}

export const deleteRegion: MutationFunction<
  IDeleteRegionResult,
  IDeleteRegionVariables
> = async params => {
  return await (
    await arriumAPI.delete("/location/region", { data: params })
  ).data
}
