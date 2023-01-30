import {
  IGetPrefrencesResult,
  ISetPrefrencesResult,
  ISetPrefrencesVariables,
} from "@/lib/interfaces/prefrences"
import { MutationFunction, useQuery } from "react-query"
import { arriumAPI } from "./axios"

export const setPrefrences: MutationFunction<
  ISetPrefrencesResult,
  ISetPrefrencesVariables
> = async prefrencesData => {
  return await (
    await arriumAPI.post("/preference/add", prefrencesData)
  ).data
}

export async function fetchPreferencesData(): Promise<IGetPrefrencesResult> {
  return arriumAPI.get("/preference").then(response => response.data)
}

export function usePreferences() {
  return useQuery("get-preference-data", () => fetchPreferencesData())
}
