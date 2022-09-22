import {
  IAddStationTypeResult,
  IAddStationTypeVariables,
  IDeleteStationTypeResult,
  IDeleteStationTypeVariables,
} from "@/lib/interfaces/stationTypes"
import { IStationTypeListResult } from "@/lib/interfaces/stationTypes"
import { MutationFunction, useQuery } from "react-query"
import { arriumAPI } from "./axios"

export function fetchStationTypeList(): Promise<IStationTypeListResult> {
  return arriumAPI.get("/location/station-type").then(response => response.data)
}

export function useStationTypeList() {
  return useQuery("station-type-list", () => fetchStationTypeList())
}

export const addStationType: MutationFunction<
  IAddStationTypeResult,
  IAddStationTypeVariables
> = async params => {
  return await (
    await arriumAPI.post("/location/station-type", params)
  ).data
}

export const deleteStationType: MutationFunction<
  IDeleteStationTypeResult,
  IDeleteStationTypeVariables
> = async params => {
  return await (
    await arriumAPI.delete("/location/station-type", { data: params })
  ).data
}
