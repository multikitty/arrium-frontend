import { Box, IconButton } from "@mui/material"
import { rem } from "polished"
import React from "react"
import {
  StyledCustomerDetailPage,
  StyledCustomerDetailPageHeaderContainer,
  StyledCustomerDetailPageHeader,
  StyledCustomerDetailPageSubHeader,
  StyledCustomerDetailPageContent,
} from "./CustomerDetailPage.styled"
import BackNavigationIcon from "@mui/icons-material/ChevronLeft"
import theme from "../../theme"
import AccountInformationTab from "./AccountInformationTab"
import BillingTab from "./BillingTab"
import ConfigurationTab from "./ConfigurationTab"
import ReferralTab from "./ReferralTab"
import { navigate } from "gatsby-link"
import { StyledTab, StyledTabs } from "../commons/commonComponents"
import SaveChangesModal from "./SaveChangesModal"

const CustomerDetailPage = () => {
  const [tab, setTab] = React.useState("accountInformation")
  const [isSaveChangesModalOpen, setIsSaveChangesModalOpen] =
    React.useState(false)

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setTab(newValue)
  }

  const handleSaveChangesModalOpen = () => setIsSaveChangesModalOpen(true)
  const handleSaveChangesModalClose = () => setIsSaveChangesModalOpen(false)

  const handleRedirectToCustomersPage = () => navigate("/customers")

  const isAccountInfoTabOpen = tab === "accountInformation"
  const isBillingTabOpen = tab === "billing"
  const isConfigurationTabOpen = tab === "configuration"
  const isReferralTabOpen = tab === "referral"

  return (
    <StyledCustomerDetailPage>
      <SaveChangesModal
        open={isSaveChangesModalOpen}
        handleClose={handleSaveChangesModalClose}
        handleSave={() => {}}
      />
      <StyledCustomerDetailPageHeaderContainer>
        <IconButton
          sx={{ mr: rem("20px") }}
          onClick={handleRedirectToCustomersPage}
        >
          <BackNavigationIcon
            sx={{ fontSize: 32, color: theme.palette.grey6 }}
          />
        </IconButton>
        <Box display="flex" flexDirection="column">
          <StyledCustomerDetailPageHeader>
            Coraline Jones
          </StyledCustomerDetailPageHeader>
          <StyledCustomerDetailPageSubHeader>
            coraline@gmail.com
          </StyledCustomerDetailPageSubHeader>
        </Box>
      </StyledCustomerDetailPageHeaderContainer>
      <StyledCustomerDetailPageContent>
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
              label="Billing"
              value="billing"
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
        {isAccountInfoTabOpen && (
          <AccountInformationTab
            handleSave={handleSaveChangesModalOpen}
            handleCancel={handleRedirectToCustomersPage}
          />
        )}
        {isBillingTabOpen && <BillingTab />}
        {isConfigurationTabOpen && (
          <ConfigurationTab
            handleSave={handleSaveChangesModalOpen}
            handleCancel={handleRedirectToCustomersPage}
          />
        )}
        {isReferralTabOpen && (
          <ReferralTab
            handleSave={handleSaveChangesModalOpen}
            handleCancel={handleRedirectToCustomersPage}
          />
        )}
      </StyledCustomerDetailPageContent>
    </StyledCustomerDetailPage>
  )
}

export default CustomerDetailPage
