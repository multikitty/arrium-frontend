import { UserRoles, AdminPages, DriverPages } from "@/types/common"

export const defaultRoutes = Object.freeze({
  [UserRoles.admin]: AdminPages.customers,
  [UserRoles.driver]: DriverPages.blockAvailability,
})
