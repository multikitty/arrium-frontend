import {
  IForgotPasswordResult,
  IForgotPasswordVariables,
} from "@/lib/interfaces/forgotPassword"
import { MutationFunction } from "react-query"
import { arriumAPI } from "./axios"

export const forgotPassword: MutationFunction<
  IForgotPasswordResult,
  IForgotPasswordVariables
> = async params => {
  return await (
    await arriumAPI.post("/forgot-password", params)
  ).data
}
