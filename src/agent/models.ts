import { IPhoneModelListResult } from "@/lib/interfaces/models"
import { useQuery } from "react-query"
import { arriumAPI } from "./axios"

function fetchPhoneModelList(): Promise<IPhoneModelListResult> {
  return arriumAPI
    .get("/model-versions/list?entityName=phoneModel")
    .then(response => response.data)
}

export function usePhoneModelList() {
  return useQuery("phone-model-list", () => fetchPhoneModelList())
}
