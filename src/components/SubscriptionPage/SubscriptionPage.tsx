import React from "react"
import { observer } from "mobx-react-lite"
import {
  StyledSubscriptionPage,
  StyledSubscriptionPageHeader,
  StyledSubscriptionPageContent,
  StyledSubscriptionPageHeaderContainer,
} from "./SubscriptionPage.styled"
import { Box } from "@mui/material"

import { rem } from "polished"
import { StyledTabs, StyledTab } from "../commons/uiComponents"

import SubscriptionTab from "@/components/SubscriptionTab"
import PricingPlansTab from "@/components/PricingPlansTab"
import {
  SubscriptionPageTab,
  SUBSCRIPTION_PAGE_TABS,
} from "./SubscriptionPage.data"
import { IPageProps } from "@/lib/interfaces/common"

interface ISubscriptionPageProps extends IPageProps {}

const SubscriptionPage: React.FC<ISubscriptionPageProps> = ({
  country_code,
}) => {
  const [tab, setTab] = React.useState<SubscriptionPageTab>(
    SUBSCRIPTION_PAGE_TABS.subscription
  )

  const handleChange = (
    _: React.SyntheticEvent,
    newValue: SubscriptionPageTab
  ) => {
    setTab(newValue)
  }

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
            <StyledTab
              sx={{
                padding: `${rem("30px")} ${rem("32px")}`,
                textTransform: "capitalize",
              }}
              label="Pricing Plans"
              value={SUBSCRIPTION_PAGE_TABS.pricingPlans}
            />
          </StyledTabs>
        </Box>
        {/* Tab View */}
        {tab === SUBSCRIPTION_PAGE_TABS.subscription && (
          <SubscriptionTab country_code={country_code} />
        )}
        {tab === SUBSCRIPTION_PAGE_TABS.pricingPlans && <PricingPlansTab />}
      </StyledSubscriptionPageContent>
    </StyledSubscriptionPage>
  )
}

export default observer(SubscriptionPage)
