import { MutationFunction } from "react-query"
import { arriumAPI, arriumAPIWithoutTokenValidation } from "./axios"
import {
  AccountInfoResult,
  AccountInfoVariables,
  FlexInfoResult,
  FlexInfoVariables,
  OtpConfirmationResult,
  OtpConfirmationVariables,
  RegistrationUserResult,
  RegistrationUserVariables,
  ResendOtpResult,
} from "@/lib/interfaces/signup"

export const registerUser: MutationFunction<
  RegistrationUserResult,
  RegistrationUserVariables
> = async registrationData => {
  return await (
    await arriumAPIWithoutTokenValidation.post(
      "/signup/registration",
      registrationData
    )
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

export const updatePhoneNumber: MutationFunction<
  AccountInfoResult,
  AccountInfoVariables
> = async updatedAccountInfo => {
  console.log("updatedAccountInfo", updatedAccountInfo)
  return await (
    await arriumAPI.post("/user/update-phone-number", updatedAccountInfo)
  ).data
}

export const resendOtp: MutationFunction<ResendOtpResult> = async () => {
  return await (
    await arriumAPI.post("/user/send-otp")
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
