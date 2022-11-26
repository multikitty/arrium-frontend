import React from "react"
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
import useNavigate from "@/hooks/useNavigate"
import { useCustomerAccountInfo } from "@/agent/customers"
import { tabs, TabType } from "../AddCustomerPage/AddCustomersPage.data"
import LoadingScreen from "../LoadingScreen"
import { IPageProps } from "@/lib/interfaces/common"

export interface ICustomerDetailPageProps extends IPageProps {
  pk: string
  sk: string
}

const CustomerDetailPage: React.FC<ICustomerDetailPageProps> = ({
  pk,
  sk,
  ...params
}) => {
  const { navigate } = useNavigate(params)
  const { enqueueSnackbar } = useSnackbar()
  const [tab, setTab] = React.useState<TabType>(tabs.accountInformation)
  const [isSaveChangesModalOpen, setIsSaveChangesModalOpen] =
    React.useState(false)
  const {
    data: customerData,
    isLoading,
    refetch,
  } = useCustomerAccountInfo({
    pk,
    sk,
  })

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setTab(newValue as TabType)
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

  const isAccountInfoTabOpen = tab === tabs.accountInformation
  const isBillingTabOpen = tab === tabs.billing
  const isConfigurationTabOpen = tab === tabs.configuration
  const isReferralTabOpen = tab === tabs.referral

  if (isLoading) return <LoadingScreen />

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
              {customerData?.data?.firstname} {customerData?.data?.lastname}
            </StyledCustomerDetailPageHeader>
            <StyledCustomerDetailPageSubHeader>
              {customerData?.data?.email}
            </StyledCustomerDetailPageSubHeader>
          </Box>
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
              value={tabs.accountInformation}
            />
            <StyledTab
              sx={{
                padding: `${rem("30px")} ${rem("32px")}`,
                textTransform: "capitalize",
              }}
              label="Billing"
              value={tabs.billing}
            />
            <StyledTab
              sx={{
                padding: `${rem("30px")} ${rem("32px")}`,
                textTransform: "capitalize",
              }}
              label="Configuration"
              value={tabs.configuration}
            />
            <StyledTab
              sx={{
                padding: `${rem("30px")} ${rem("32px")}`,
                textTransform: "capitalize",
              }}
              label="Referral"
              value={tabs.referral}
            />
          </StyledTabs>
        </Box>
        {isAccountInfoTabOpen && (
          <AccountInformationTab
            handleSave={handleSave}
            handleCancel={handleSaveChangesModalOpen}
            customerID={customerData?.data?.customerID || ""}
            dialCode={customerData?.data?.dialCode || ""}
            phoneNumber={customerData?.data?.phoneNumber || ""}
            tzName={customerData?.data?.tzName || ""}
            startDate={customerData?.data?.startDate || null}
            endDate={customerData?.data?.endDate || null}
            firstname={customerData?.data?.firstname || ""}
            email={customerData?.data?.email || ""}
            lastname={customerData?.data?.lastname || ""}
            role={customerData?.data?.role || ""}
            emailVerified={customerData?.data?.emailVerified || false}
            accountStatus={customerData?.data?.accountStatus || ""}
            sk={sk}
            pk={pk}
            refetchCustomerData={refetch}
            isLoading={isLoading}
          />
        )}
        {isBillingTabOpen && <BillingTab sk={sk} pk={pk} />}
        {isConfigurationTabOpen && (
          <ConfigurationTab
            handleSave={handleSave}
            handleCancel={handleSaveChangesModalOpen}
            pk={pk}
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
