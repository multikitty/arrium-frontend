import { UserRoles, AdminPages, DriverPages } from "@/types/common"

export const defaultRoutes = {
  [UserRoles.admin]: AdminPages.customers,
  [UserRoles.driver]: DriverPages.blockAvailability,
  [UserRoles.salesAgent]: AdminPages.dashboard,
} as const
