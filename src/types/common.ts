export const UserRoles = {
  driver: "driver",
  admin: "admin",
  salesAgent: "salesAgent",
} as const

export type UserRolesType = keyof typeof UserRoles

export const LabelledUserRoles = [
  {
    label: "Driver",
    value: UserRoles.driver,
  },
  {
    label: "System Admin",
    value: UserRoles.admin,
  },
  {
    label: "Sales Agent",
    value: UserRoles.salesAgent,
  },
]

export const DriverPages = {
  availability: "availability",
  subscription: "subscription",
  faq: "faq",
  support: "support",
} as const

export const AdminPages = {
  customers: "customers",
  dashboard: "dashboard",
  messages: "messages",
  settings: "settings",
  referrals: "referrals",
  timezones: "timezones",
  plans: "plans",
} as const
