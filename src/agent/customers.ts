import {
  ICustomerAccountInfoResult,
  ICustomersListResult,
  ICustomersListVariables,
  ICustomerAccountInfoVariables,
  ICustomerConfigInfoVariables,
  ICustomerConfigInfoResult,
  IUpdateUserAccountInfoResult,
  IUpdateUserAccountInfoVariables,
} from "@/lib/interfaces/customers"
import { MutationFunction, useQuery } from "react-query"
import { arriumAPI } from "./axios"

export function fetchCustomersList(
  params: ICustomersListVariables
): Promise<ICustomersListResult> {
  return arriumAPI.get("/user/list", { params }).then(response => response.data)
}

export function useCustomersList(params: ICustomersListVariables) {
  return useQuery(["customers-list", params], () => fetchCustomersList(params!))
}

export function fetchCustomerAccountInfo(
  params: ICustomerAccountInfoVariables
): Promise<ICustomerAccountInfoResult> {
  return arriumAPI.get("/user/get", { params }).then(response => response.data)
}

export function useCustomerAccountInfo(params: ICustomerAccountInfoVariables) {
  return useQuery(
    ["customer-account-info", params],
    () => fetchCustomerAccountInfo(params!),
    {
      enabled: Boolean(params.pk && params.sk),
    }
  )
}

export function fetchCustomerConfigInfo(
  params: ICustomerConfigInfoVariables
): Promise<ICustomerConfigInfoResult> {
  return arriumAPI
    .get("/user/flex-details/" + params.pk)
    .then(response => response.data)
}

export function useCustomerConfigInfo(params: ICustomerConfigInfoVariables) {
  return useQuery(
    ["customer-config-info", params],
    () => fetchCustomerConfigInfo(params!),
    {
      enabled: Boolean(params.pk),
    }
  )
}

export const updateUserAccountInfo: MutationFunction<
  IUpdateUserAccountInfoResult,
  IUpdateUserAccountInfoVariables
> = async params => {
  return await (
    await arriumAPI.put("/user/update-account-info", params)
  ).data
}
