import React from "react"
import { navigate } from "gatsby"
import { Box, IconButton } from "@mui/material"
import BackNavigationIcon from "@mui/icons-material/ChevronLeft"
import { rem } from "polished"
import {
  StyledCustomerDetailPage,
  StyledCustomerDetailPageHeaderContainer,
  StyledCustomerDetailPageHeader,
  StyledCustomerDetailPageSubHeader,
  StyledCustomerDetailPageContent,
} from "./CustomerDetailPage.styled"
import theme from "@/theme"
import AccountInformationTab from "./AccountInformationTab"
import BillingTab from "./BillingTab"
import ConfigurationTab from "./ConfigurationTab"
import ReferralTab from "./ReferralTab"
import { StyledTab, StyledTabs } from "../commons/commonComponents"
import SaveChangesModal from "./SaveChangesModal"
// import Message from "@/components/Message"
import { useStore } from "@/store"
import { observer } from "mobx-react-lite"

const CustomerDetailPage = () => {
  const { messageStore } = useStore()
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

  console.log("messageStore", messageStore)

  return (
    <StyledCustomerDetailPage>
      <SaveChangesModal
        open={isSaveChangesModalOpen}
        handleClose={handleSaveChangesModalClose}
        handleSave={() => {}}
      />
      <StyledCustomerDetailPageHeaderContainer>
        <Box display="flex">
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
        </Box>
        {/* <Message
          text={messageStore.message}
          variant={messageStore.variant}
          visible={messageStore.open}
          setVisible={(isOpen: boolean) => (messageStore.setOpen = isOpen)}
        /> */}
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

export default observer(CustomerDetailPage)
