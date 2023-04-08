import { FAQResult, FAQVariables } from "@/lib/interfaces/faq"
import { MutationFunction } from "react-query"
import { arriumAPI } from "./axios"
export const faqInfo: MutationFunction<FAQResult, FAQVariables> =
  async faqInfoPayload => {
    return await (
      await arriumAPI.get(`zendesk/getFaq?language=${faqInfoPayload.language}`)
    ).data
  }
