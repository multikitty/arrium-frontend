import {
  IAddCountryResult,
  IAddCountryVariables,
  IAddRegionResult,
  IAddRegionVariables,
  IAddStationResult,
  IAddStationVariables,
  ICountryListResult,
  IDeleteCountryResult,
  IDeleteCountryVariables,
  IDeleteRegionResult,
  IDeleteRegionVariables,
  IDeleteStationResult,
  IDeleteStationVariables,
  IRegionListResult,
  IRegionListVariables,
  IStationListResult,
  IStationListVariables,
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

export function fetchStationList(
  countryCode: IStationListVariables["countryCode"],
  regionCode: IStationListVariables["regionCode"]
): Promise<IStationListResult> {
  return arriumAPI
    .get("/location/station", { params: { countryCode, regionCode } })
    .then(response => response.data)
}

export function useStationList(
  countryCode: IStationListVariables["countryCode"],
  regionCode: IStationListVariables["regionCode"]
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
  IAddCountryResult,
  IAddCountryVariables
> = async params => {
  return await (
    await arriumAPI.post("/location/country", params)
  ).data
}

export const deleteCountry: MutationFunction<
  IDeleteCountryResult,
  IDeleteCountryVariables
> = async params => {
  return await (
    await arriumAPI.delete("/location/country", { data: params })
  ).data
}

export const addRegion: MutationFunction<
  IAddRegionResult,
  IAddRegionVariables
> = async params => {
  return await (
    await arriumAPI.post("/location/region", params)
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

export const addStation: MutationFunction<
  IAddStationResult,
  IAddStationVariables
> = async params => {
  return await (
    await arriumAPI.post("/location/station", params)
  ).data
}

export const deleteStation: MutationFunction<
  IDeleteStationResult,
  IDeleteStationVariables
> = async params => {
  return await (
    await arriumAPI.delete("/location/station", { data: params })
  ).data
}
