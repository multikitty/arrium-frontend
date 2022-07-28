import React from "react"
import { useParams } from "@reach/router"
import { Box, IconButton } from "@mui/material"
import BackNavigationIcon from "@mui/icons-material/ChevronLeft"
import { rem } from "polished"
import { observer } from "mobx-react-lite"

import theme from "@/theme"
import SaveChangesModal from "@/components/SaveChangesModal"
import {
  StyledCustomerDetailPage,
  StyledCustomerDetailPageHeaderContainer,
  StyledCustomerDetailPageHeader,
  StyledCustomerDetailPageSubHeader,
  StyledCustomerDetailPageContent,
} from "./CustomerDetailPage.styled"
import AccountInformationTab from "./AccountInformationTab"
import BillingTab from "./BillingTab"
import ConfigurationTab from "./ConfigurationTab"
import ReferralTab from "./ReferralTab"
import { StyledTab, StyledTabs } from "../commons/uiComponents"
import routes from "@/constants/routes"
import { useSnackbar } from "notistack"
import useNavigate, { ParamType } from "@/hooks/useNavigate"

const CustomerDetailPage = () => {
  const params = useParams()
  const { navigate } = useNavigate(params as ParamType)
  const { enqueueSnackbar } = useSnackbar()
  const [tab, setTab] = React.useState("accountInformation")
  const [isSaveChangesModalOpen, setIsSaveChangesModalOpen] =
    React.useState(false)

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setTab(newValue)
  }

  const handleSaveChangesModalOpen = () => {
    setIsSaveChangesModalOpen(true)
  }
  const handleSaveChangesModalClose = () => {
    setIsSaveChangesModalOpen(false)
  }

  const handleNavigateToCustomersPage = () => {
    navigate(routes.customers)
  }

  const handleSave = () => {
    enqueueSnackbar("Customer Details Updated Successfully", {
      variant: "success",
    })
    handleNavigateToCustomersPage()
  }

  const isAccountInfoTabOpen = tab === "accountInformation"
  const isBillingTabOpen = tab === "billing"
  const isConfigurationTabOpen = tab === "configuration"
  const isReferralTabOpen = tab === "referral"

  return (
    <StyledCustomerDetailPage>
      <SaveChangesModal
        noSubHeader
        open={isSaveChangesModalOpen}
        handleClose={handleSaveChangesModalClose}
        handleSave={handleSave}
      />
      <StyledCustomerDetailPageHeaderContainer>
        <Box display="flex">
          <IconButton
            sx={{ mr: rem("20px") }}
            onClick={handleNavigateToCustomersPage}
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
            handleSave={handleSave}
            handleCancel={handleSaveChangesModalOpen}
          />
        )}
        {isBillingTabOpen && <BillingTab />}
        {isConfigurationTabOpen && (
          <ConfigurationTab
            handleSave={handleSave}
            handleCancel={handleSaveChangesModalOpen}
          />
        )}
        {isReferralTabOpen && (
          <ReferralTab
            handleSave={handleSave}
            handleCancel={handleSaveChangesModalOpen}
          />
        )}
      </StyledCustomerDetailPageContent>
    </StyledCustomerDetailPage>
  )
}

export default observer(CustomerDetailPage)
