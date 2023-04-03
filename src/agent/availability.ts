import { arriumAPI, arriumAPIPython } from "./axios"
import { MutationFunction, useQuery } from "react-query"
import {
  GetAvailabilityTableResult,
  SetBlockStartSearchProps,
} from "@/lib/interfaces/availability"

export const setBlockStartSearch: MutationFunction<any, any> = async (
  params: SetBlockStartSearchProps
) => {
  return await (
    await arriumAPIPython.post("/start-search", params)
  )?.data
}

export const setBlockStopSearch: MutationFunction<any, any> = async params => {
  return await (
    await arriumAPIPython.get(`/stop-search/${params.taskId}`, {})
  )?.data
}

export async function fetchSearchedBlocksData(): Promise<GetAvailabilityTableResult> {
  return await arriumAPI.get("/block/").then(response => response?.data)
}

export function useSearchedBlocks() {
  return useQuery("get-searched-blocks-data", () => fetchSearchedBlocksData())
}
