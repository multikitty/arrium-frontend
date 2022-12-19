export const FEATURE_SPEED_BUTTON = "FEATURE_SPEED_BUTTON"
export const FEATURE_PAY_WITH_CRYPTO_BUTTON = "FEATURE_PAY_WITH_CRYPTO_BUTTON"
export const FEATURE_SUBSCRIPTION_SUMMARY = "FEATURE_SUBSCRIPTION_SUMMARY"

const FEATURE_FLAGS = {
  FEATURE_SPEED_BUTTON,
  FEATURE_PAY_WITH_CRYPTO_BUTTON,
  FEATURE_SUBSCRIPTION_SUMMARY,
} as const

export type FEATURE_FLAG = keyof typeof FEATURE_FLAGS

export default FEATURE_FLAGS
