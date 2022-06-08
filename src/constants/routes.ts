const routes = {
  home: "/",
  403: "/403",
  404: "/404",
  automationSchedule: "/automation-schedule",
  availability: "/availability",
  customers: "/customers",
  customersAdd: "/customers/add",
  customersDetail(id: string) {
    return "/customers/detail/" + id
  },
  dashboard: "/dashboard",
  faq: "/faq",
  forgotPassword: "/forgot-password",
  messages: "/messages",
  plans: "/plans",
  profile: "/profile",
  referrals: "/referrals",
  resetPassword: "/reset-password",
  settings: "/settings",
  signin: "/signin",
  signup: "/signup",
  subscription: "/subscription",
  support: "/support",
  timezones: "/timezones",
}

export default routes
