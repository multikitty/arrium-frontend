import { navigate as gatsbyNavigate } from "gatsby-link"
import { UserRolesType } from "@/types/common"
import { defaultRoutes, DEFAULT_COUNTRY, UserRoles } from "@/constants/common"
import { TabType } from "@/components/AddCustomerPage/AddCustomersPage.data"
import routes from "@/constants/routes"
import { localStorageUtils } from "@/utils"
import { COUNTRY_CODE } from "@/constants/localStorage"
import { IPageProps } from "@/lib/interfaces/common"

const useNavigate = (params: IPageProps) => {
  const navigate = (path: string, ...args: any[]) => {
    gatsbyNavigate(
      `/${
        params?.country_code ||
        localStorageUtils.get(COUNTRY_CODE) ||
        DEFAULT_COUNTRY
      }/en${path}`,
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
