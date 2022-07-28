import { MutationFunction } from "react-query"
import { arriumAPI } from "./axios"
import {
  IAccountInfoResult,
  IAccountInfoVariables,
  IFlexInfoResult,
  IFlexInfoVariables,
  IOtpConfirmationResult,
  IOtpConfirmationVariables,
  IRegistrationUserResult,
  IRegistrationUserVariables,
} from "@/lib/interfaces/signup"

export const registerUser: MutationFunction<
  IRegistrationUserResult,
  IRegistrationUserVariables
> = async registrationData => {
  return await (
    await arriumAPI.post("/signup/registration", registrationData)
  ).data
}

export const updateAccountInfo: MutationFunction<
  IAccountInfoResult,
  IAccountInfoVariables
> = async updatedAccountInfo => {
  return await (
    await arriumAPI.post("/signup/account-info", updatedAccountInfo)
  ).data
}

export const confirmOtp: MutationFunction<
  IOtpConfirmationResult,
  IOtpConfirmationVariables
> = async otp => {
  return await (
    await arriumAPI.post("/signup/otp-confirmation", otp)
  ).data
}

export const updateFlexInfo: MutationFunction<
  IFlexInfoResult,
  IFlexInfoVariables
> = async flexInfoData => {
  return await (
    await arriumAPI.post("/signup/update-amazon-flex-info", flexInfoData)
  ).data
}
