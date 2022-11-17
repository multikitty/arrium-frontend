import React from 'react'
import { observer } from "mobx-react-lite"
import {
  StyledChoosePlanText, StyledPricingPlansHeader,
  StyledPricingPlansPage, StyledPricingPlansPageContent, StyledPricingPlansPageHeaderContainer
} from './PricingPlansPage.styled'
import { Box, Grid } from '@mui/material'

import { rem } from 'polished'
import { StyledTabs, StyledTab } from '../commons/uiComponents';
import theme from '@/theme'
import PricingPlans from './PricingPlans'

import SwitchButton from './SwitchButton'
import SubscriptionPage from '../SubscriptionPage'


function PricingPlansPage() {

  const [tab, setTab] = React.useState("subscription")
  const [planType, setPlanType] = React.useState("basic")

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setTab(newValue)
  }



  const PricingPlansCardData = [
    {
    id: 0,
    popularity: "",
    planType: "Basic Plan",
    planName: "Logistics Only",
    planDescription: "Deliver Amazon packages ordered by customers on the Amazon website",
    planPrice: "£25",
    planDuration: "per month",
    planDurationDescription: "Less than 2 hours of driving @£13 per hour, for 1 month access",
    benefitsData: [
      {
        status: true,
        benefits: "Accepts Logistics blocks"
      },
      {
        status: false,
        benefits: "Accepts Groceries blocks"
      },
      {
        status: true,
        benefits: "Email confirmation",
      },
      {
        status: true,
        benefits: "SMS confirmation"
      }
    ],
    basicPlansBenefits: [
      {
        status: true,
        benefits: "Setting your availability for each location"
      },
      {
        status: true,
        benefits: "Setting a separate “Time to Arrive” for each location"
      },
      {
        status: true,
        benefits: "Setting a ‘minimum hourly rate’ and/or ‘minimum pay’"
      },
      {
        status: false,
        benefits: "Setting different availability, for each day of the week"
      },
      {
        status: false,
        benefits: "Setting an automation schedule of days and times when Arrium should auto-start "
      }
    ]

  },
  {
    id: 1,
    popularity: "",
    planType: "Basic Plan",
    planName: "Groceries Only",
    planDescription: "Deliver Amazon Fresh or supermarket groceries via Amazon Flex",
    planPrice: "£35",
    planDuration: "per month",
    planDurationDescription: "Less than 3 hours of driving @£13 per hour, for 1 month access",
    benefitsData: [
      {
        status: false,
        benefits: "Accepts Logistics blocks"
      },
      {
        status: true,
        benefits: "Accepts Groceries blocks"
      },
      {
        status: true,
        benefits: "Email confirmation",
      },
      {
        status: true,
        benefits: "SMS confirmation"
      }
    ],
    basicPlansBenefits: [
      {
        status: true,
        benefits: "Setting your availability for each location"
      },
      {
        status: true,
        benefits: "Setting a separate “Time to Arrive” for each location"
      },
      {
        status: true,
        benefits: "Setting a ‘minimum hourly rate’ and/or ‘minimum pay’"
      },
      {
        status: false,
        benefits: "Setting different availability, for each day of the week"
      },
      {
        status: false,
        benefits: "Setting an automation schedule of days and times when Arrium should auto-start "
      }
    ]

  },
  {
    id: 2,
    popularity: "",
    planType: "Basic Plan",
    planName: "All Areas",
    planDescription: "Deliver Amazon packages during the day and groceries in the evening",
    planPrice: "£45",
    planDuration: "per month",
    planDurationDescription: "Less than 3.5 hours of driving @£13 per hour, for 1 month access",
    benefitsData: [
      {
        status: true,
        benefits: "Accepts Logistics blocks"
      },
      {
        status: true,
        benefits: "Accepts Groceries blocks"
      },
      {
        status: true,
        benefits: "Email confirmation",
      },
      {
        status: true,
        benefits: "SMS confirmation"
      }
    ],
    basicPlansBenefits: [
      {
        status: true,
        benefits: "Setting your availability for each location"
      },
      {
        status: true,
        benefits: "Setting a separate “Time to Arrive” for each location"
      },
      {
        status: true,
        benefits: "Setting a ‘minimum hourly rate’ and/or ‘minimum pay’"
      },
      {
        status: false,
        benefits: "Setting different availability, for each day of the week"
      },
      {
        status: false,
        benefits: "Setting an automation schedule of days and times when Arrium should auto-start "
      }
    ]

  }
  ]

  const PricingPremiumPlansCardData = [
    {
    id: 0,
    popularity: "MOST POPULAR",
    planType: "Premium Plan",
    planName: "Logistics Only",
    planDescription: "Deliver Amazon packages ordered by customers on the Amazon website",
    planPrice: "£30",
    planDuration: "per month",
    planDurationDescription: "Less than 2 hours of driving @£13 per hour, for 1 month access",
    benefitsData: [
      {
        status: true,
        benefits: "Accepts Logistics blocks"
      },
      {
        status: false,
        benefits: "Accepts Groceries blocks"
      },
      {
        status: true,
        benefits: "Email confirmation",
      },
      {
        status: true,
        benefits: "SMS confirmation"
      }
    ],
    basicPlansBenefits: [
      {
        status: true,
        benefits: "Setting your availability for each location"
      },
      {
        status: true,
        benefits: "Setting a separate “Time to Arrive” for each location"
      },
      {
        status: true,
        benefits: "Setting a ‘minimum hourly rate’ and/or ‘minimum pay’"
      },
      {
        status: true,
        benefits: "Setting different availability, for each day of the week"
      },
      {
        status: true,
        benefits: "Setting an automation schedule of days and times when Arrium should auto-start "
      }
    ]

  },
  {
    id: 1,
    popularity: "MOST POPULAR",
    planType: "Premium Plan",
    planName: "Groceries Only",
    planDescription: "Deliver Amazon Fresh or supermarket groceries via Amazon Flex",
    planPrice: "£40",
    planDuration: "per month",
    planDurationDescription: "Less than 3 hours of driving @£13 per hour, for 1 month access",
    benefitsData: [
      {
        status: false,
        benefits: "Accepts Logistics blocks"
      },
      {
        status: true,
        benefits: "Accepts Groceries blocks"
      },
      {
        status: true,
        benefits: "Email confirmation",
      },
      {
        status: true,
        benefits: "SMS confirmation"
      }
    ],
    basicPlansBenefits: [
      {
        status: true,
        benefits: "Setting your availability for each location"
      },
      {
        status: true,
        benefits: "Setting a separate “Time to Arrive” for each location"
      },
      {
        status: true,
        benefits: "Setting a ‘minimum hourly rate’ and/or ‘minimum pay’"
      },
      {
        status: true,
        benefits: "Setting different availability, for each day of the week"
      },
      {
        status: true,
        benefits: "Setting an automation schedule of days and times when Arrium should auto-start "
      }
    ]

  },
  {
    id: 2,
    popularity: "MOST POPULAR",
    planType: "Premium Plan",
    planName: "All Areas",
    planDescription: "Deliver Amazon packages during the day and groceries in the evening",
    planPrice: "£50",
    planDuration: "per month",
    planDurationDescription: "Less than 3.5 hours of driving @£13 per hour, for 1 month access",
    benefitsData: [
      {
        status: true,
        benefits: "Accepts Logistics blocks"
      },
      {
        status: true,
        benefits: "Accepts Groceries blocks"
      },
      {
        status: true,
        benefits: "Email confirmation",
      },
      {
        status: true,
        benefits: "SMS confirmation"
      }
    ],
    basicPlansBenefits: [
      {
        status: true,
        benefits: "Setting your availability for each location"
      },
      {
        status: true,
        benefits: "Setting a separate “Time to Arrive” for each location"
      },
      {
        status: true,
        benefits: "Setting a ‘minimum hourly rate’ and/or ‘minimum pay’"
      },
      {
        status: true,
        benefits: "Setting different availability, for each day of the week"
      },
      {
        status: true,
        benefits: "Setting an automation schedule of days and times when Arrium should auto-start "
      }
    ]

  }
  ]

  return (
    <>

      <StyledPricingPlansPage>
        <StyledPricingPlansPageHeaderContainer>
          <StyledPricingPlansHeader>Subscription</StyledPricingPlansHeader>
        </StyledPricingPlansPageHeaderContainer>
        <StyledPricingPlansPageContent>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
                value="subscription"
              />
              <StyledTab
                sx={{
                  padding: `${rem("30px")} ${rem("32px")}`,
                  textTransform: "capitalize",
                }}
                label="Pricing Plans"
                value="pricingPlans"
              />
            </StyledTabs>
          </Box>

          {tab === "pricingPlans" && 
          <Box display="flex" flexDirection="column" p={rem("20px")}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={rem("20px")}
            >
              <StyledChoosePlanText>Choose your plan type</StyledChoosePlanText>
              <Box>
                <SwitchButton planType={planType} setPlanType={setPlanType} />
              </Box>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <Grid container>
                {planType === "basic" ?
                  (
                    PricingPlansCardData && PricingPlansCardData.map((plan, key) => (
                      <Grid item xs={12} md={6} lg={4} sx={{ px: 1, mb: 3 }} key={key}>
                        <Box sx={{ border: `1px solid ${plan.id === 0 ? theme.palette.grey3 : plan.id === 1 ? theme.palette.common.violet : theme.palette.common.green}`, borderRadius: rem("20px") }}>
                          <PricingPlans planData={plan} />
                        </Box>
                      </Grid>
                    ))
                  )
                  : (
                    PricingPremiumPlansCardData && PricingPremiumPlansCardData.map((plan, key) => (
                      <Grid item xs={12} md={6} lg={4} sx={{ px: 1, mb: 3 }} key={key}>
                        <Box sx={{ border: `1px solid ${plan.id === 0 ? theme.palette.grey3 : plan.id === 1 ? theme.palette.common.violet : theme.palette.common.green}`, borderRadius: rem("20px") }}>
                          <PricingPlans planData={plan} />
                        </Box>
                      </Grid>
                    ))

                  )}
              </Grid>
            </Box>
          </Box>}

          {tab === "subscription" && <SubscriptionPage />}
          
        </StyledPricingPlansPageContent>
      </StyledPricingPlansPage>

    </>
  )
}


export default observer(PricingPlansPage)