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

export const Plans = {
  basic: "basic",
  premium: "premium",
}

export const LabelledPlans = [
  { label: "Basic", value: Plans.basic },
  { label: "Premium", value: Plans.premium },
]

export const AdminPages = {
  customers: "customers",
  dashboard: "dashboard",
  messages: "messages",
  settings: "settings",
  referrals: "referrals",
  timezones: "timezones",
  plans: "plans",
} as const

export const DriverPages = {
  availability: "availability",
  automationSchedule: "automation-schedule",
  subscription: "subscription",
  faq: "faq",
  support: "support",
} as const

export const defaultRoutes = {
  [UserRoles.admin]: AdminPages.customers,
  [UserRoles.driver]: DriverPages.availability,
  [UserRoles.salesAgent]: AdminPages.dashboard,
} as const

export const daysInWeek = [
  { short: "Mon", long: "Monday" },
  { short: "Tue", long: "Tuesday" },
  { short: "Wed", long: "Wednesday" },
  { short: "Thu", long: "Thursday" },
  { short: "Fri", long: "Friday" },
  { short: "Sat", long: "Saturday" },
  { short: "Sun", long: "Sunday" },
]
