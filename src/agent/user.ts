import { ICurrentUserResult } from "@/lib/interfaces/user"
import { useQuery } from "react-query"
import { arriumAPI } from "./axios"

export function fetchCurrentUserData(): Promise<ICurrentUserResult> {
  return arriumAPI.get("/user").then(response => response.data)
}

export function useCurrentUser() {
  return useQuery("current-user-data", () => fetchCurrentUserData())
}
