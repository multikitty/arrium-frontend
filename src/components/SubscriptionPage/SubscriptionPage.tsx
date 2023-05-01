import React from "react"
import { observer } from "mobx-react-lite"
import {
  StyledSubscriptionPage,
  StyledSubscriptionPageHeader,
  StyledSubscriptionPageContent,
  StyledSubscriptionPageHeaderContainer,
} from "./SubscriptionPage.styled"

import { rem } from "polished"
import { StyledTabs, StyledTab } from "@/components/commons/uiComponents"

import SubscriptionTab from "@/components/SubscriptionTab"
import PricingPlansTab from "@/components/PricingPlansTab"
import {
  SubscriptionPageTab,
  SUBSCRIPTION_PAGE_TABS,
} from "./SubscriptionPage.data"
import { PageProps } from "@/lib/interfaces/common"
import { Box } from "@mui/material"
import { useCurrentUser } from "@/agent/user"
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen"
import {
  StyledNoSearchResultsText as StyledNoInvoicesText,
  StyledNoSearchResultsTitle as StyledNoInvoicesTitle,
} from "../AvailabilityPage/AvailabilityPage.styled"
interface ISubscriptionPageProps extends PageProps { }

const NoInvoices = () => (
  <Box
    display="flex"
    flexDirection="column"
    my={6}
    width="100%"
    justifyContent="center"
    alignItems="center"
  >
    <StyledNoInvoicesTitle>No invoices to show</StyledNoInvoicesTitle>
    <StyledNoInvoicesText>
      There is no billing data, so far.
    </StyledNoInvoicesText>
  </Box>
)

const SubscriptionPage: React.FC<ISubscriptionPageProps> = ({
  country_code,
}) => {
  const [tab, setTab] = React.useState<SubscriptionPageTab>(
    SUBSCRIPTION_PAGE_TABS.subscription
  )
  const { data: currentUserData, isLoading } = useCurrentUser()

  const handleChange = (
    _: React.SyntheticEvent,
    newValue: SubscriptionPageTab
  ) => {
    setTab(newValue)
  }

  if (isLoading) return <LoadingScreen />
  console.log("currentUserData", currentUserData)
  return (
    <StyledSubscriptionPage>
      <StyledSubscriptionPageHeaderContainer>
        <StyledSubscriptionPageHeader>
          Subscription
        </StyledSubscriptionPageHeader>
      </StyledSubscriptionPageHeaderContainer>
      <StyledSubscriptionPageContent>
        {/* Tabs */}
        <Box
          sx={{
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.04)",
            borderRadius: "20px 20px 0px 0px",
            marginBottom: "16px",
          }}
        >
          <StyledTabs
            value={tab}
            onChange={handleChange}
            aria-label="pricing plans tabs"
          >
            <StyledTab
              sx={{
                padding: `${rem("30px")} ${rem("32px")}`,
                textTransform: "capitalize",
              }}
              label="Subscription"
              value={SUBSCRIPTION_PAGE_TABS.subscription}
            />
            {currentUserData?.data?.pricingPlan && (
              <StyledTab
                sx={{
                  padding: `${rem("30px")} ${rem("32px")}`,
                  textTransform: "capitalize",
                }}
                label="Pricing Plans"
                value={SUBSCRIPTION_PAGE_TABS.pricingPlans}
              />
            )}
          </StyledTabs>
        </Box>
        {/* Tab View */}
        {!currentUserData?.data?.pricingPlan && <NoInvoices />}
        {tab === SUBSCRIPTION_PAGE_TABS.subscription && (
          <SubscriptionTab country_code={country_code} />
        )}
        {tab === SUBSCRIPTION_PAGE_TABS.pricingPlans && <PricingPlansTab />}
      </StyledSubscriptionPageContent>
    </StyledSubscriptionPage>
  )
}

export default observer(SubscriptionPage)
