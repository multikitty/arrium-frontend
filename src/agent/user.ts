import {
  ICurrentUserResult,
  IUpdateProfileResult,
  IUpdateProfileVariables,
} from "@/lib/interfaces/user"
import { useQuery, MutationFunction } from "react-query"
import { arriumAPI } from "./axios"

export function fetchCurrentUserData(): Promise<ICurrentUserResult> {
  return arriumAPI.get("/user").then(response => response.data)
}

export function useCurrentUser() {
  return useQuery("current-user-data", () => fetchCurrentUserData())
}

export const updateProfile: MutationFunction<
  IUpdateProfileResult,
  IUpdateProfileVariables
> = async updateProfileData => {
  return await (
    await arriumAPI.post("/user/update-profile", updateProfileData)
  ).data
}
