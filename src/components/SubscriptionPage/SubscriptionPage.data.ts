export const SUBSCRIPTION_PAGE_TABS = {
  subscription: "subscription",
  pricingPlans: "pricingPlans",
} as const

export type SubscriptionPageTab = keyof typeof SUBSCRIPTION_PAGE_TABS
