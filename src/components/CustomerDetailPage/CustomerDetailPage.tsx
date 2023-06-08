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
// import { useSnackbar } from "notistack"
import useNavigate from "@/hooks/useNavigate"
import { useCustomerAccountInfo } from "@/agent/customers"
import { tabs, TabType } from "../AddCustomerPage/AddCustomersPage.data"
import LoadingScreen from "../LoadingScreen"
import { PageProps } from "@/lib/interfaces/common"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastNotification} from '@/components/ToastNotification/ToastNotification';


export interface CustomerDetailPageProps extends PageProps {
  pk: string
  sk: string
}

const CustomerDetailPage: React.FC<CustomerDetailPageProps> = ({
  pk,
  sk,
  ...params
}) => {
  const { navigate } = useNavigate(params)
  // const { enqueueSnackbar } = useSnackbar()
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
    toast.success("Customer Details Updated Successfully")
    handleNavigateToCustomersPage()
  }

  const isAccountInfoTabOpen = tab === tabs.accountInformation
  const isBillingTabOpen = tab === tabs.billing
  const isConfigurationTabOpen = tab === tabs.configuration
  const isReferralTabOpen = tab === tabs.referral

  if (isLoading) return <LoadingScreen />

  return (
    <StyledCustomerDetailPage>
      <ToastNotification/>
      <SaveChangesModal
        noSubHeader
        open={isSaveChangesModalOpen}
        handleClose={handleSaveChangesModalClose}
        handleSave={handleSave}
        handleNavigateToCustomersPage={handleNavigateToCustomersPage}
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
        <Box>
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
        {isAccountInfoTabOpen && customerData?.data && (
          <AccountInformationTab
            handleSave={handleSave}
            handleCancel={handleSaveChangesModalOpen}
            handleNavigateToCustomersPage={handleNavigateToCustomersPage}
            {...customerData.data}
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
            sk={sk}
            zendeskUserId={customerData?.data?.zendeskUserID?.toString() || ""}
            refetchCustomerData={refetch}
            handleNavigateToCustomersPage={handleNavigateToCustomersPage}
          />
        )}
        {isReferralTabOpen && (
          <ReferralTab
            handleSave={handleSave}
            handleCancel={handleSaveChangesModalOpen}
            refCode={customerData?.data?.refCode}
            handleNavigateToCustomersPage={handleNavigateToCustomersPage}
          />
        )}
      </StyledCustomerDetailPageContent>
    </StyledCustomerDetailPage>
  )
}

export default observer(CustomerDetailPage)
