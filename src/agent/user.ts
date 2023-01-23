import {
  CurrentUserResult,
  RequestEmailVerifyResult,
  RequestEmailVerifyVariables,
  UpdateProfileResult,
  UpdateProfileVariables,
} from "@/lib/interfaces/user"
import { useQuery, MutationFunction } from "react-query"
import { arriumAPI } from "./axios"

export function fetchCurrentUserData(): Promise<CurrentUserResult> {
  return arriumAPI.get("/user").then(response => response.data)
}

export function useCurrentUser() {
  return useQuery("current-user-data", () => fetchCurrentUserData())
}

export const updateProfile: MutationFunction<
  UpdateProfileResult,
  UpdateProfileVariables
> = async updateProfileData => {
  return await (
    await arriumAPI.post("/user/update-profile", updateProfileData)
  ).data
}

export const requestEmailVerify: MutationFunction<
  RequestEmailVerifyResult,
  RequestEmailVerifyVariables
> = async params => {
  return await (
    await arriumAPI.post("/user/request-verify-email", { email: params.email })
  ).data
}
