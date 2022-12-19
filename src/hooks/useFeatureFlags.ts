import { graphql, useStaticQuery } from "gatsby"
import { FEATURE_FLAG } from "@/constants/featureFlags"

type QueryResult = {
  readonly site: {
    readonly siteMetadata: {
      readonly featureFlags: Record<FEATURE_FLAG, boolean>
    }
  }
}

const useFeatureFlags = () => {
  const {
    site: {
      siteMetadata: { featureFlags },
    },
  } = useStaticQuery<QueryResult>(
    graphql`
      query {
        site {
          siteMetadata {
            featureFlags {
              FEATURE_SPEED_BUTTON
              FEATURE_PAY_WITH_CRYPTO_BUTTON
              FEATURE_SUBSCRIPTION_SUMMARY
            }
          }
        }
      }
    `
  )

  return featureFlags
}

export default useFeatureFlags
