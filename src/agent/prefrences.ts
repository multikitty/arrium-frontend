import {
  IGetPrefrencesResult,
  IGetPrefrencesScheduleResult,
  ISetPrefrencesResult,
  ISetPrefrencesScheduleVariables,
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
  return await arriumAPI.get("/preference").then(response => response?.data)
}

export function usePreferences() {
  return useQuery("get-preference-data", () => fetchPreferencesData())
}

export async function fetchPreferencesSchedule(): Promise<IGetPrefrencesScheduleResult> {
  return await arriumAPI
    .get("/preference/schedule")
    .then(response => response?.data)
}

export function usePreferencesSchedule() {
  return useQuery("get_preference-schedule-data", () =>
    fetchPreferencesSchedule()
  )
}

export const setPrefrencesSchedule: MutationFunction<
  ISetPrefrencesResult,
  ISetPrefrencesScheduleVariables
> = async prefrencesScheduleData => {
  return await (
    await arriumAPI.post("/preference/schedule", prefrencesScheduleData)
  ).data
}