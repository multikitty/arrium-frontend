import { IStationTypeListResult } from "@/lib/interfaces/stationTypes"
import { useQuery } from "react-query"
import { arriumAPI } from "./axios"

export function fetchStationTypeList(): Promise<IStationTypeListResult> {
  return arriumAPI.get("/location/station-type").then(response => response.data)
}

export function useStationTypeList() {
  return useQuery("station-type-list", () => fetchStationTypeList())
}
