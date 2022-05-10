export const UserRoles = {
  driver: "driver",
  admin: "admin",
  salesAgent: "salesAgent",
} as const

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
  blockAvailability: "blockAvailability",
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

export const defaultRoutes = {
  [UserRoles.admin]: AdminPages.customers,
  [UserRoles.driver]: DriverPages.blockAvailability,
  [UserRoles.salesAgent]: AdminPages.dashboard,
} as const
