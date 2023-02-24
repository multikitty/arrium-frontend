import { MutationFunction, useQuery } from "react-query"
import { arriumAPI } from "@/agent/axios"
import {
  CreateReferralCodeResult,
  CreateReferralCodeVariables,
  ReferralListByCreatorResult,
  ReferralListByCreatorVariables,
} from "@/lib/interfaces/referrals"

export const createReferralCode: MutationFunction<
  CreateReferralCodeResult,
  CreateReferralCodeVariables
> = async params => {
  return await (
    await arriumAPI.post("/referral", params)
  ).data
}

export function fetchReferralsByCreator(
  params: ReferralListByCreatorVariables
): Promise<ReferralListByCreatorResult> {
  return arriumAPI
    .get(`/referral/by-creator?userpk=${params.userpk}`)
    .then(response => response.data)
}

export function useReferralsByCreator(
  params: ReferralListByCreatorVariables,
  disabled: boolean | undefined = false
) {
  return useQuery(
    ["referral-list-by-creator", params],
    () => fetchReferralsByCreator({ userpk: params.userpk }),
    { enabled: !disabled }
  )
}
