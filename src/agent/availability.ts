import { arriumAPI } from "./axios"
import { MutationFunction, useQuery } from "react-query"
import { GetAvailabilityTableResult } from "@/lib/interfaces/availability"

export const setBlockStartSearch: MutationFunction<any, any> = async params => {
  return await (
    await arriumAPI.post("/block/start-search", {})
  )?.data
}

export const setBlockStopSearch: MutationFunction<any, any> = async params => {
  return await (
    await arriumAPI.get(`/block/stop-search/${params.taskId}`, {})
  )?.data
}

export async function fetchSearchedBlocksData(): Promise<GetAvailabilityTableResult> {
  return await arriumAPI.get("/block/").then(response => response?.data)
}

export function useSearchedBlocks() {
  return useQuery("get-searched-blocks-data", () => fetchSearchedBlocksData())
}
