import {
  CustomerAccountInfoResult,
  CustomersListResult,
  CustomersListVariables,
  CustomerAccountInfoVariables,
  CustomerConfigInfoVariables,
  CustomerConfigInfoResult,
  UpdateUserAccountInfoResult,
  UpdateUserAccountInfoVariables,
  UpdateConfigurationDetailsResult,
  UpdateConfigurationDetailsVariables,
} from "@/lib/interfaces/customers"
import { MutationFunction, useQuery } from "react-query"
import { arriumAPI } from "./axios"

function fetchCustomersList(
  params: CustomersListVariables
): Promise<CustomersListResult> {
  return arriumAPI.get("/user/list", { params }).then(response => response.data)
}

export function useCustomersList(params: CustomersListVariables) {
  return useQuery(["customers-list", params], () => fetchCustomersList(params!))
}

export function fetchCustomerAccountInfo(
  params: CustomerAccountInfoVariables
): Promise<CustomerAccountInfoResult> {
  return arriumAPI.get("/user/get", { params }).then(response => response.data)
}

export function useCustomerAccountInfo(params: CustomerAccountInfoVariables) {
  return useQuery(
    ["customer-account-info", params],
    () => fetchCustomerAccountInfo(params!),
    {
      enabled: Boolean(params.pk && params.sk),
    }
  )
}

export function fetchCustomerConfigInfo(
  params: CustomerConfigInfoVariables
): Promise<CustomerConfigInfoResult> {
  return arriumAPI
    .get("/user/flex-details/" + params.pk)
    .then(response => response.data)
}

export function useCustomerConfigInfo(params: CustomerConfigInfoVariables) {
  return useQuery(
    ["customer-config-info", params],
    () => fetchCustomerConfigInfo(params!),
    {
      enabled: Boolean(params.pk),
    }
  )
}

export const updateUserAccountInfo: MutationFunction<
  UpdateUserAccountInfoResult,
  UpdateUserAccountInfoVariables
> = async params => {
  return await (
    await arriumAPI.put("/user/update-account-info", params)
  ).data
}

export const updateConfigurationDetails: MutationFunction<
  UpdateConfigurationDetailsResult,
  UpdateConfigurationDetailsVariables
> = async params => {
  return await (
    await arriumAPI.put("/user/flex-details/update", params)
  ).data
}
