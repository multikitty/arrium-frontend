import { TabType } from "@/components/AddCustomerPage/AddCustomersPage.data"
import { UserRolesType } from "@/types/common"
import { navigate } from "gatsby-link"

export const navigateToAddCustomerPage = (role: UserRolesType, tab: TabType) =>
  navigate(`/customers/add?role=${role}&tab=${tab}`)

const navigateWithQuery = {
  navigateToAddCustomerPage,
}

export default navigateWithQuery
