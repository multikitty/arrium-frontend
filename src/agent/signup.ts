import { MutationFunction } from "react-query"
import { arriumAPI } from "./axios"
import {
  AccountInfoResult,
  AccountInfoVariables,
  FlexInfoResult,
  FlexInfoVariables,
  OtpConfirmationResult,
  OtpConfirmationVariables,
  RegistrationUserResult,
  RegistrationUserVariables,
} from "@/lib/interfaces/signup"

export const registerUser: MutationFunction<
  RegistrationUserResult,
  RegistrationUserVariables
> = async registrationData => {
  return await (
    await arriumAPI.post("/signup/registration", registrationData)
  ).data
}

export const updateAccountInfo: MutationFunction<
  AccountInfoResult,
  AccountInfoVariables
> = async updatedAccountInfo => {
  return await (
    await arriumAPI.post("/signup/account-info", updatedAccountInfo)
  ).data
}

export const confirmOtp: MutationFunction<
  OtpConfirmationResult,
  OtpConfirmationVariables
> = async otp => {
  return await (
    await arriumAPI.post("/signup/otp-confirmation", otp)
  ).data
}

export const updateFlexInfo: MutationFunction<
  FlexInfoResult,
  FlexInfoVariables
> = async flexInfoData => {
  return await (
    await arriumAPI.post("/signup/update-amazon-flex-info", flexInfoData)
  ).data
}
