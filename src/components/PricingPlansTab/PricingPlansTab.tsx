import React from "react"
import { observer } from "mobx-react-lite"
import {
  StyledPricingPlansTab,
  StyledPricingPlansTabChoosePlanText,
} from "./PricingPlansTab.styled"
import { Box, Grid, useMediaQuery } from "@mui/material"

import { rem } from "polished"
import PricingPlansColumn from "./PricingPlansColumn"

import SwitchButton from "./SwitchButton"
import {
  PlanType,
  PLAN_TYPES,
  PRICING_PLANS_DATA,
} from "./PricingPlansTab.data"
import { devices } from "@/constants/device"
import Sticky from "react-sticky-el"
import theme from "@/theme"

const PricingPlansPage = () => {
  const isMobile = useMediaQuery(devices.desktop.down)
  const [planType, setPlanType] = React.useState<PlanType>(PLAN_TYPES.basic)
  const [isSticky, setIsSticky] = React.useState(false)

  const handleFixedToggle = (fixed: boolean) => {
    setIsSticky(fixed)
  }

  console.log("isSticky", isSticky)

  return (
    <StyledPricingPlansTab>
      {!isMobile && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={rem("20px")}
        >
          <StyledPricingPlansTabChoosePlanText>
            Choose your plan type
          </StyledPricingPlansTabChoosePlanText>
          <Box>
            <SwitchButton planType={planType} setPlanType={setPlanType} />
          </Box>
        </Box>
      )}
      <Sticky
        onFixedToggle={handleFixedToggle}
        stickyStyle={{
          left: 0,
          right: 0,
          width: "calc(100vw - 16px)",
          zIndex: 9,
        }}
      >
        <Box
          sx={{
            display: isMobile ? "flex" : "none",
            position: isSticky ? "fixed" : undefined,
            top: isSticky ? "74px" : undefined,
            left: isSticky ? "8px" : undefined,
            right: isSticky ? "8px" : undefined,
            borderRadius: isSticky ? "12px" : undefined,
            width: isSticky ? "100%" : undefined,
            backgroundColor: isSticky ? theme.palette.common.white : undefined,
            boxShadow: isSticky
              ? "0px 2px 40px rgba(5, 23, 51, 0.1)"
              : undefined,
            padding: isSticky ? "8px 12px" : undefined,
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "nowrap",
            mb: isSticky ? undefined : rem("20px"),
          }}
        >
          <StyledPricingPlansTabChoosePlanText>
            Plan type
          </StyledPricingPlansTabChoosePlanText>
          <Box>
            <SwitchButton planType={planType} setPlanType={setPlanType} />
          </Box>
        </Box>
      </Sticky>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {PRICING_PLANS_DATA[planType].map((plan, key) => (
            <PricingPlansColumn
              planData={plan}
              gridProps={{ key }}
              isBasicPlans={planType === "basic"}
            />
          ))}
        </Grid>
      </Box>
    </StyledPricingPlansTab>
  )
}

export default observer(PricingPlansPage)
