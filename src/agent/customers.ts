import {
  ICustomersListResult,
  ICustomersListVariables,
} from "@/lib/interfaces/customers"
import { useQuery } from "react-query"
import { arriumAPI } from "./axios"

export function fetchCustomersList(
  params: ICustomersListVariables
): Promise<ICustomersListResult> {
  return arriumAPI.get("/user/list", { params }).then(response => response.data)
}

export function useCustomersList(params: ICustomersListVariables) {
  return useQuery(["customers-list", params], () => fetchCustomersList(params!))
}
