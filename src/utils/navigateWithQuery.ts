import { TabType } from "@/components/AddCustomerPage/AddCustomersPage.data"
import routes from "@/constants/routes"
import { UserRolesType } from "@/types/common"
import { navigate } from "gatsby-link"

export const navigateToAddCustomerPage = (
  role: UserRolesType,
  tab: TabType = "accountInformation"
) => navigate(`/customers/add?role=${role}&tab=${tab}`)

export const navigateToSignup = (formStage: number) =>
  navigate(`${routes.signup}?step=${formStage}`)

const navigateWithQuery = {
  navigateToAddCustomerPage,
  navigateToSignup,
}

export default navigateWithQuery
