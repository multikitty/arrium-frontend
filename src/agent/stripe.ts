import {
  IFetchInvoicesByAdminResult,
  IFetchInvoicesByAdminVariables,
  IFetchInvoicesByDriverResult,
  IFetchInvoicesByDriverVariables,
} from "@/lib/interfaces/stripe"
import { useQuery } from "react-query"
import { arriumAPI } from "./axios"

function fetchInvoicesByAdmin(
  params: IFetchInvoicesByAdminVariables
): Promise<IFetchInvoicesByAdminResult> {
  return arriumAPI
    .get("stripe/get-invoices-admin", { params })
    .then(response => response?.data)
}

export function useInvoicesByAdmin(params: IFetchInvoicesByAdminVariables) {
  return useQuery(
    ["invoice-list--admin", params],
    () => fetchInvoicesByAdmin(params),
    { retry: 2 }
  )
}

function fetchInvoicesByDriver(
  params: IFetchInvoicesByDriverVariables
): Promise<IFetchInvoicesByDriverResult> {
  return arriumAPI
    .get("stripe/get-invoices", { params })
    .then(response => response?.data)
}

export function useInvoicesByDriver(params: IFetchInvoicesByDriverVariables) {
  return useQuery<
    IFetchInvoicesByDriverResult,
    IFetchInvoicesByDriverVariables
  >(["invoice-list--driver", params], () => fetchInvoicesByDriver(params), {
    retry: 2,
  })
}
