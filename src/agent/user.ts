import {
  CurrentUserResult,
  RequestEmailVerifyResult,
  RequestEmailVerifyVariables,
  UpdateFlexInfoVariables,
  UpdatePricingPlanStatusResult,
  UpdatePricingPlanStatusVariables,
  UpdateProfileResult,
  UpdateProfileVariables,
  UserByRoleResult,
  UserByRoleVariables,
  VerifyEmailResult,
  VerifyEmailVariables,
} from "@/lib/interfaces/user"
import { useQuery, MutationFunction } from "react-query"
import { arriumAPI, arriumAPIWithoutTokenValidation } from "@/agent/axios"
import { FlexInfoResult, FlexInfoVariables } from "@/lib/interfaces/signup"

export function fetchCurrentUserData(): Promise<CurrentUserResult> {
  return arriumAPI.get("/user").then(response => response.data)
}

export function useCurrentUser() {
  return useQuery("current-user-data", () => fetchCurrentUserData(), {
    staleTime: 10000,
  })
}

export function fetchUserByRole(
  params: UserByRoleVariables
): Promise<UserByRoleResult> {
  return arriumAPI
    .get(`/user/list-by-role?role=${params.role}`)
    .then(response => response.data)
}

export function useUserByRole(
  params: UserByRoleVariables,
  disabled: boolean | undefined = false
) {
  return useQuery(
    ["user-by-role", params],
    () => fetchUserByRole({ role: params.role }),
    { enabled: !disabled }
  )
}

export const updateProfile: MutationFunction<
  UpdateProfileResult,
  UpdateProfileVariables
> = async updateProfileData => {
  return await (
    await arriumAPI.post("/user/update-profile", updateProfileData)
  ).data
}

export const updateFlexInfo: MutationFunction<
  FlexInfoResult,
  FlexInfoVariables
> = async updateProfileData => {
  return await (
    await arriumAPI.put("/user/update-flex-info", updateProfileData)
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

export const verifyEmail: MutationFunction<
  VerifyEmailResult,
  VerifyEmailVariables
> = async params => {
  return await (
    await arriumAPIWithoutTokenValidation.post("/user/verify-email", {
      verficationToken: params.verficationToken,
    })
  ).data
}

export const updatePricingPlanStatus: MutationFunction<
  UpdatePricingPlanStatusResult,
  UpdatePricingPlanStatusVariables
> = async params => {
  return await (
    await arriumAPI.put("/user/pricing-plan", params)
  ).data
}
