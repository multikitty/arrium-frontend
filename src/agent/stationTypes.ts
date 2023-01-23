import {
  AddStationTypeResult,
  AddStationTypeVariables,
  DeleteStationTypeResult,
  DeleteStationTypeVariables,
} from "@/lib/interfaces/stationTypes"
import { StationTypeListResult } from "@/lib/interfaces/stationTypes"
import { MutationFunction, useQuery } from "react-query"
import { arriumAPI } from "./axios"

function fetchStationTypeList(): Promise<StationTypeListResult> {
  return arriumAPI.get("/location/station-type").then(response => response.data)
}

export function useStationTypeList() {
  return useQuery("station-type-list", () => fetchStationTypeList())
}

export const addStationType: MutationFunction<
  AddStationTypeResult,
  AddStationTypeVariables
> = async params => {
  return await (
    await arriumAPI.post("/location/station-type", params)
  ).data
}

export const deleteStationType: MutationFunction<
  DeleteStationTypeResult,
  DeleteStationTypeVariables
> = async params => {
  return await (
    await arriumAPI.delete("/location/station-type", { data: params })
  ).data
}
