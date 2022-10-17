import React from "react"
import { Box, IconButton } from "@mui/material"
import { rem } from "polished"
import { useLocation } from "@reach/router"
import {
  StyledAddCustomerPage,
  StyledAddCustomerPageHeaderContainer,
  StyledAddCustomerPageHeader,
  StyledAddCustomerPageContent,
} from "./AddCustomerPage.styled"
import BackNavigationIcon from "@mui/icons-material/ChevronLeft"
import theme from "@/theme"
import AccountInformationTab from "./AccountInformationTab"
import ConfigurationTab from "./ConfigurationTab"
import ReferralTab from "./ReferralTab"
import { StyledTab, StyledTabs } from "../commons/uiComponents"
import queryString from "query-string"
import { LabelledUserRoles, UserRoles } from "@/constants/common"
import { UserRolesType } from "@/types/common"
import { TabType, tabs } from "./AddCustomersPage.data"
import LocationsTab from "./LocationsTab"
import routes from "@/constants/routes"
import BillingTab from "./BillingTab"
import useNavigate from "@/hooks/useNavigate"
import { IPageProps } from "@/lib/interfaces/common"

interface IAddCustomersPageProps extends IPageProps {}

const AddCustomerPage: React.FC<IAddCustomersPageProps> = ({
  country_code,
  lang,
}) => {
  const {
    navigate,
    navigateWithQuery: { navigateToAddCustomerPage },
  } = useNavigate({ country_code, lang })
  const location = useLocation()
  const [tab, setTab] = React.useState<TabType>(tabs.accountInformation)
  const [role, setRole] = React.useState<UserRolesType>(UserRoles.driver)

  const handleChange = (_: React.SyntheticEvent, newValue: TabType) => {
    setTab(newValue)
    navigateToAddCustomerPage(role, newValue)
  }

  React.useEffect(() => {
    if (!location.search) return
    const parsedQuery = queryString.parse(location.search)
    if (!parsedQuery.role) return
    setRole(parsedQuery.role as UserRolesType)
    if (!parsedQuery.tab) return
    setTab(parsedQuery.tab as TabType)
  }, [location])

  const isAccountInfoTabOpen = tab === tabs.accountInformation
  const isBillingTabOpen = tab === tabs.billing
  const isConfigurationTabOpen = tab === tabs.configuration
  const isReferralTabOpen = tab === tabs.referral
  const isLocationsTabOpen = tab === tabs.locations

  return (
    <StyledAddCustomerPage>
      <StyledAddCustomerPageHeaderContainer>
        <IconButton
          sx={{ mr: rem("20px") }}
          onClick={() => navigate(routes.customers)}
        >
          <BackNavigationIcon
            sx={{ fontSize: 32, color: theme.palette.grey6 }}
          />
        </IconButton>
        <StyledAddCustomerPageHeader>
          Add {LabelledUserRoles.find(r => r.value === role)?.label}
        </StyledAddCustomerPageHeader>
      </StyledAddCustomerPageHeaderContainer>
      <StyledAddCustomerPageContent>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <StyledTabs
            value={tab}
            onChange={handleChange}
            aria-label="profile tabs"
          >
            <StyledTab
              sx={{
                padding: `${rem("30px")} ${rem("32px")}`,
                textTransform: "capitalize",
              }}
              label="Account Information"
              value={tabs.accountInformation}
            />
            {role === UserRoles.salesAgent && (
              <StyledTab
                sx={{
                  padding: `${rem("30px")} ${rem("32px")}`,
                  textTransform: "capitalize",
                }}
                label="Locations"
                value={tabs.locations}
              />
            )}
            {role !== UserRoles.salesAgent && (
              <StyledTab
                sx={{
                  padding: `${rem("30px")} ${rem("32px")}`,
                  textTransform: "capitalize",
                }}
                label="Billing"
                value={tabs.billing}
              />
            )}
            {role !== UserRoles.salesAgent && (
              <StyledTab
                sx={{
                  padding: `${rem("30px")} ${rem("32px")}`,
                  textTransform: "capitalize",
                }}
                label="Configuration"
                value={tabs.configuration}
              />
            )}
            {role !== UserRoles.salesAgent && (
              <StyledTab
                sx={{
                  padding: `${rem("30px")} ${rem("32px")}`,
                  textTransform: "capitalize",
                }}
                label="Referral"
                value={tabs.referral}
              />
            )}
          </StyledTabs>
        </Box>
        {isAccountInfoTabOpen && (
          <AccountInformationTab
            tab={tab}
            role={role}
            setRole={setRole}
            country_code={country_code}
            lang={lang}
          />
        )}
        {isBillingTabOpen && <BillingTab />}
        {isConfigurationTabOpen && <ConfigurationTab />}
        {isReferralTabOpen && <ReferralTab />}
        {isLocationsTabOpen && (
          <LocationsTab country_code={country_code} lang={lang} />
        )}
      </StyledAddCustomerPageContent>
    </StyledAddCustomerPage>
  )
}

export default AddCustomerPage
