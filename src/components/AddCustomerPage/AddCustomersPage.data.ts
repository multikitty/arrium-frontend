export const tabs = {
  accountInformation: "accountInformation",
  billing: "billing",
  configuration: "configuration",
  referral: "referral",
  locations: "locations",
} as const

export type Tabs = keyof typeof tabs
