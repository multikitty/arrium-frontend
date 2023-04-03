import { SigninUserResult, SigninUserVariables } from "@/lib/interfaces/signin"
import { MutationFunction } from "react-query"
import { arriumAPIWithoutTokenValidation } from "./axios"

export const signinUser: MutationFunction<
  SigninUserResult,
  SigninUserVariables
> = async signinData => {
  return await (
    await arriumAPIWithoutTokenValidation.post("/signin", signinData)
  ).data
}
