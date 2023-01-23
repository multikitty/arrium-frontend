import {
  AddFlexVersionResult,
  AddFlexVersionVariables,
  AddOsVersionResult,
  AddOsVersionVariables,
  AddPhoneModelResult,
  AddPhoneModelVariables,
  DeleteModelsAndVersionsResult,
  DeleteModelsAndVersionsVariables,
  FlexVersionListResult,
  OsVersionListResult,
  PhoneModelListResult,
} from "@/lib/interfaces/models"
import { MutationFunction, useQuery } from "react-query"
import { arriumAPI } from "./axios"

function fetchPhoneModelList(): Promise<PhoneModelListResult> {
  return arriumAPI
    .get("/model-versions/list?entityName=phoneModel")
    .then(response => response.data)
}

export function usePhoneModelList() {
  return useQuery("phone-model-list", () => fetchPhoneModelList())
}

export const addPhoneModel: MutationFunction<
  AddPhoneModelResult,
  AddPhoneModelVariables
> = async params => {
  return await (
    await arriumAPI.post("/model-versions/phone-model/add", params)
  ).data
}

function fetchOsVersionList(): Promise<OsVersionListResult> {
  return arriumAPI
    .get("/model-versions/list?entityName=osVersion")
    .then(response => response.data)
}

export function useOsVersionList() {
  return useQuery("os-version-list", () => fetchOsVersionList())
}

export const addOsVersion: MutationFunction<
  AddOsVersionResult,
  AddOsVersionVariables
> = async params => {
  return await (
    await arriumAPI.post("/model-versions/os-version/add", params)
  ).data
}

function fetchFlexVersionList(): Promise<FlexVersionListResult> {
  return arriumAPI
    .get("/model-versions/list?entityName=flexVersion")
    .then(response => response.data)
}

export function useFlexVersionList() {
  return useQuery("flex-version-list", () => fetchFlexVersionList())
}

export const addFlexVersion: MutationFunction<
  AddFlexVersionResult,
  AddFlexVersionVariables
> = async params => {
  return await (
    await arriumAPI.post("/model-versions/flex-version/add", params)
  ).data
}

export const deleteModelsAndVersions: MutationFunction<
  DeleteModelsAndVersionsResult,
  DeleteModelsAndVersionsVariables
> = async params => {
  return await (
    await arriumAPI.delete("/model-versions/delete", { data: params })
  ).data
}
