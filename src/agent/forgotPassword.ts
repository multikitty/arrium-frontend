import {
  ForgotPasswordResult,
  ForgotPasswordVariables,
} from "@/lib/interfaces/forgotPassword"
import { MutationFunction } from "react-query"
import { arriumAPI } from "./axios"

export const forgotPassword: MutationFunction<
  ForgotPasswordResult,
  ForgotPasswordVariables
> = async params => {
  return await (
    await arriumAPI.post("/forgot-password", params)
  ).data
}
