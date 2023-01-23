import {
  FetchInvoicesByAdminResult,
  FetchInvoicesByAdminVariables,
  FetchInvoicesByDriverResult,
  FetchInvoicesByDriverVariables,
} from "@/lib/interfaces/stripe"
import { useQuery } from "react-query"
import { arriumAPI } from "./axios"

function fetchInvoicesByAdmin(
  params: FetchInvoicesByAdminVariables
): Promise<FetchInvoicesByAdminResult> {
  return arriumAPI
    .get("stripe/get-invoices-admin", { params })
    .then(response => response?.data)
}

export function useInvoicesByAdmin(params: FetchInvoicesByAdminVariables) {
  return useQuery(
    ["invoice-list--admin", params],
    () => fetchInvoicesByAdmin(params),
    { retry: 2 }
  )
}

function fetchInvoicesByDriver(
  params: FetchInvoicesByDriverVariables
): Promise<FetchInvoicesByDriverResult> {
  return arriumAPI
    .get("stripe/get-invoices", { params })
    .then(response => response?.data)
}

export function useInvoicesByDriver(params: FetchInvoicesByDriverVariables) {
  return useQuery<FetchInvoicesByDriverResult, FetchInvoicesByDriverVariables>(
    ["invoice-list--driver", params],
    () => fetchInvoicesByDriver(params),
    {
      retry: 2,
    }
  )
}
