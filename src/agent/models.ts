import {
  IAddFlexVersionResult,
  IAddFlexVersionVariables,
  IAddOsVersionResult,
  IAddOsVersionVariables,
  IAddPhoneModelResult,
  IAddPhoneModelVariables,
  IFlexVersionListResult,
  IOsVersionListResult,
  IPhoneModelListResult,
} from "@/lib/interfaces/models"
import { MutationFunction, useQuery } from "react-query"
import { arriumAPI } from "./axios"

function fetchPhoneModelList(): Promise<IPhoneModelListResult> {
  return arriumAPI
    .get("/model-versions/list?entityName=phoneModel")
    .then(response => response.data)
}

export function usePhoneModelList() {
  return useQuery("phone-model-list", () => fetchPhoneModelList())
}

export const addPhoneModel: MutationFunction<
  IAddPhoneModelResult,
  IAddPhoneModelVariables
> = async params => {
  return await (
    await arriumAPI.post("/model-versions/phone-model/add", params)
  ).data
}

function fetchOsVersionList(): Promise<IOsVersionListResult> {
  return arriumAPI
    .get("/model-versions/list?entityName=osVersion")
    .then(response => response.data)
}

export function useOsVersionList() {
  return useQuery("os-version-list", () => fetchOsVersionList())
}

export const addOsVersion: MutationFunction<
  IAddOsVersionResult,
  IAddOsVersionVariables
> = async params => {
  return await (
    await arriumAPI.post("/model-versions/os-version/add", params)
  ).data
}

function fetchFlexVersionList(): Promise<IFlexVersionListResult> {
  return arriumAPI
    .get("/model-versions/list?entityName=flexVersion")
    .then(response => response.data)
}

export function useFlexVersionList() {
  return useQuery("flex-version-list", () => fetchFlexVersionList())
}

export const addFlexVersion: MutationFunction<
  IAddFlexVersionResult,
  IAddFlexVersionVariables
> = async params => {
  return await (
    await arriumAPI.post("/model-versions/flex-version/add", params)
  ).data
}
