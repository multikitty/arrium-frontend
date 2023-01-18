import {
  AddCountryResult,
  AddCountryVariables,
  AddRegionResult,
  AddRegionVariables,
  AddStationResult,
  AddStationVariables,
  CountryListResult,
  DeleteCountryResult,
  DeleteCountryVariables,
  DeleteRegionResult,
  DeleteRegionVariables,
  DeleteStationResult,
  DeleteStationVariables,
  RegionListResult,
  RegionListVariables,
  StationListResult,
  StationListVariables,
} from "@/lib/interfaces/locations"
import { MutationFunction, useQuery } from "react-query"
import { arriumAPI } from "./axios"

export function fetchCountryList(): Promise<CountryListResult> {
  return arriumAPI.get("/location/country").then(response => response.data)
}

export function useCountryList() {
  return useQuery<CountryListResult>("country-list", () => fetchCountryList())
}

export function fetchRegionList(
  country_code: RegionListVariables["country_code"]
): Promise<RegionListResult> {
  return arriumAPI
    .get("/location/region", { params: { coutnry_code: country_code } })
    .then(response => response.data)
}

export function useRegionList(
  country_code: RegionListVariables["country_code"]
) {
  return useQuery(
    ["region-list", country_code],
    () => fetchRegionList(country_code),
    {
      enabled: !!country_code,
    }
  )
}

export function fetchStationList(
  countryCode: StationListVariables["countryCode"],
  regionCode: StationListVariables["regionCode"]
): Promise<StationListResult> {
  return arriumAPI
    .get("/location/station", { params: { countryCode, regionCode } })
    .then(response => response.data)
}

export function useStationList(
  countryCode: StationListVariables["countryCode"],
  regionCode: StationListVariables["regionCode"]
) {
  return useQuery(
    ["station-list", countryCode, regionCode],
    () => fetchStationList(countryCode, regionCode),
    {
      enabled: !!countryCode && !!regionCode,
    }
  )
}

export const addCountry: MutationFunction<
  AddCountryResult,
  AddCountryVariables
> = async params => {
  return await (
    await arriumAPI.post("/location/country", params)
  ).data
}

export const deleteCountry: MutationFunction<
  DeleteCountryResult,
  DeleteCountryVariables
> = async params => {
  return await (
    await arriumAPI.delete("/location/country", { data: params })
  ).data
}

export const addRegion: MutationFunction<AddRegionResult, AddRegionVariables> =
  async params => {
    return await (
      await arriumAPI.post("/location/region", params)
    ).data
  }

export const deleteRegion: MutationFunction<
  DeleteRegionResult,
  DeleteRegionVariables
> = async params => {
  return await (
    await arriumAPI.delete("/location/region", { data: params })
  ).data
}

export const addStation: MutationFunction<
  AddStationResult,
  AddStationVariables
> = async params => {
  return await (
    await arriumAPI.post("/location/station", params)
  ).data
}

export const deleteStation: MutationFunction<
  DeleteStationResult,
  DeleteStationVariables
> = async params => {
  return await (
    await arriumAPI.delete("/location/station", { data: params })
  ).data
}
