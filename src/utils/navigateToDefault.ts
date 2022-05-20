import { defaultRoutes, UserRoles } from "@/constants/common"
import { UserRolesType } from "@/types/common"
import { navigate } from "gatsby"

const navigateToDefault = (role: UserRolesType = UserRoles.driver) =>
  navigate(`/${defaultRoutes[role]}`)

export default navigateToDefault
