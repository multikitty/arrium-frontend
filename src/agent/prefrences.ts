import {
  GetPrefrencesResult,
  GetPrefrencesScheduleResult,
  SetPrefrencesResult,
  SetPrefrencesScheduleVariables,
  SetPrefrencesVariables,
  UsePreferencesVariables,
} from "@/lib/interfaces/prefrences"
import { MutationFunction, useQuery } from "react-query"
import { arriumAPI } from "./axios"

export const setPrefrences: MutationFunction<
  SetPrefrencesResult,
  SetPrefrencesVariables
> = async prefrencesData => {
  return await (
    await arriumAPI.post("/preference/add", prefrencesData)
  ).data
}

export async function fetchPreferencesData(
  params: UsePreferencesVariables
): Promise<GetPrefrencesResult> {
  return await arriumAPI
    .get(`/preference?day=${params.day}`)
    .then(response => response?.data)
}

export function usePreferences(params: UsePreferencesVariables) {
  return useQuery("get-preference-data", () =>
    fetchPreferencesData({ day: params.day })
  )
}

export async function fetchPreferencesSchedule(): Promise<GetPrefrencesScheduleResult> {
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
  SetPrefrencesResult,
  SetPrefrencesScheduleVariables
> = async prefrencesScheduleData => {
  return await (
    await arriumAPI.post("/preference/schedule", prefrencesScheduleData)
  ).data
}
