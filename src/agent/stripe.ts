import {
  IFetchInvoicesByAdminResult,
  IFetchInvoicesByAdminVariables,
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
    ["invoice-list--admin", params.pk, params.sk],
    () => fetchInvoicesByAdmin(params),
    { retry: 2 }
  )
}
