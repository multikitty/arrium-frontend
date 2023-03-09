import {
  ForgotPasswordResult,
  ForgotPasswordUpdatePasswordResult,
  ForgotPasswordUpdatePasswordVariables,
  ForgotPasswordVariables,
  ForgotPasswordVerifyTokenResult,
  ForgotPasswordVerifyTokenVariables,
} from "@/lib/interfaces/forgotPassword"
import { MutationFunction } from "react-query"
import { arriumAPIWithoutTokenValidation } from "@/agent/axios"

export const forgotPassword: MutationFunction<
  ForgotPasswordResult,
  ForgotPasswordVariables
> = async params => {
  return await (
    await arriumAPIWithoutTokenValidation.post("/forgot-password", params)
  ).data
}

export const forgotPasswordVerifyToken: MutationFunction<
  ForgotPasswordVerifyTokenResult,
  ForgotPasswordVerifyTokenVariables
> = async data => {
  return await (
    await arriumAPIWithoutTokenValidation.post(
      "/forgot-password/verify-token",
      data
    )
  ).data
}

export const forgotPasswordUpdatePassword: MutationFunction<
  ForgotPasswordUpdatePasswordResult,
  ForgotPasswordUpdatePasswordVariables
> = async data => {
  return await (
    await arriumAPIWithoutTokenValidation.post(
      "/forgot-password/update-password",
      data
    )
  ).data
}
