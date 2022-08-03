import { navigate as gatsbyNavigate } from "gatsby-link"
import { UserRolesType } from "@/types/common"
import { defaultRoutes, UserRoles } from "@/constants/common"
import { TabType } from "@/components/AddCustomerPage/AddCustomersPage.data"
import routes from "@/constants/routes"
import { localStorageUtils } from "@/utils"

export type ParamType = {
  country_code: string
  lang: string
}

const useNavigate = (params: ParamType) => {
  const navigate = (path: string, ...args: any[]) => {
    gatsbyNavigate(
      `/${
        params?.country_code ||
        localStorageUtils.getLocalStorage("country") ||
        "uk"
      }/${params?.lang || "en"}${path}`,
      ...args
    )
  }

  const navigateToDefault = (role: UserRolesType = UserRoles.driver) =>
    navigate(`/${defaultRoutes[role]}`)

  const navigateToAddCustomerPage = (
    role: UserRolesType,
    tab: TabType = "accountInformation"
  ) => navigate(`/customers/add?role=${role}&tab=${tab}`)

  const navigateToSignup = (formStage: number) =>
    navigate(`${routes.signup}?step=${formStage}`)

  const navigateWithQuery = {
    navigateToAddCustomerPage,
    navigateToSignup,
  }

  return {
    navigate,
    navigateToDefault,
    navigateWithQuery,
  }
}

export default useNavigate
