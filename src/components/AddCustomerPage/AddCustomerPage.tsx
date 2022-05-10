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
import { navigate } from "gatsby"
import { StyledTab, StyledTabs } from "../commons/commonComponents"
import queryString, { ParsedQuery } from "query-string"
import { UserRoles } from "@/types/common"

const AddCustomerPage = () => {
  const location = useLocation()
  const [tab, setTab] = React.useState("accountInformation")
  const [role, setRole] = React.useState<keyof typeof UserRoles>(
    UserRoles.driver
  )
  const [queryParams, setQueryParams] =
    React.useState<ParsedQuery<string> | null>(null)

  console.log("queryParams", queryParams)

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setTab(newValue)
  }

  React.useEffect(() => {
    if (!location.search) return
    const parsedQuery = queryString.parse(location.search)
    setQueryParams(parsedQuery)
    if (!parsedQuery.role) return
    setRole(parsedQuery.role as keyof typeof UserRoles)
  }, [location])

  const isAccountInfoTabOpen = tab === "accountInformation"
  const isConfigurationTabOpen = tab === "configuration"
  const isReferralTabOpen = tab === "referral"

  return (
    <StyledAddCustomerPage>
      <StyledAddCustomerPageHeaderContainer>
        <IconButton
          sx={{ mr: rem("20px") }}
          onClick={() => navigate("/customers")}
        >
          <BackNavigationIcon
            sx={{ fontSize: 32, color: theme.palette.grey6 }}
          />
        </IconButton>
        <Box display="flex" flexDirection="column">
          <StyledAddCustomerPageHeader>
            Add Customer
          </StyledAddCustomerPageHeader>
        </Box>
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
              value="accountInformation"
            />
            <StyledTab
              sx={{
                padding: `${rem("30px")} ${rem("32px")}`,
                textTransform: "capitalize",
              }}
              label="Configuration"
              value="configuration"
            />
            <StyledTab
              sx={{
                padding: `${rem("30px")} ${rem("32px")}`,
                textTransform: "capitalize",
              }}
              label="Referral"
              value="referral"
            />
          </StyledTabs>
        </Box>
        {isAccountInfoTabOpen && <AccountInformationTab role={role} />}
        {isConfigurationTabOpen && <ConfigurationTab />}
        {isReferralTabOpen && <ReferralTab />}
      </StyledAddCustomerPageContent>
    </StyledAddCustomerPage>
  )
}

export default AddCustomerPage
