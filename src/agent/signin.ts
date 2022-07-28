import {
  ISigninUserResult,
  ISigninUserVariables,
} from "@/lib/interfaces/signin"
import { MutationFunction } from "react-query"
import { arriumAPI } from "./axios"

export const signinUser: MutationFunction<
  ISigninUserResult,
  ISigninUserVariables
> = async signinData => {
  return await (
    await arriumAPI.post("/signin", signinData)
  ).data
}
