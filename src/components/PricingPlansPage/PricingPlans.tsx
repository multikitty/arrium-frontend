import React from "react"
import { Box } from "@mui/material"
import {
  StyledBasicPlanIncludeText,
  StyledBenefitsActiveText,
  StyledChoosePlanText,
  StyledPlanDescText,
  StyledPlanDoorVehiclesBoldText,
  StyledPlanDoorVehiclesLightText,
  StyledPlanDurationDescText,
  StyledPlanDurationText,
  StyledPlanNameText,
  StyledPlanPriceText,
  StyledPopularForText,
  StyledPricingPlansHeader,
  StyledPricingPlansPage,
  StyledPricingPlansPageContent,
  StyledPricingPlansPageHeaderContainer,
} from "./PricingPlansPage.styled"

import CloseIcon from "@mui/icons-material/Close"
import CheckIcon from "@mui/icons-material/Check"
import theme from "@/theme"
import { rem } from "polished"
import { StyledButton, StyledButtonText } from "../commons/uiComponents"
import BenefitsTextComponent from "./BenefitsTextComponent"

interface IProps {
  planData: {
    id: Number
    popularity: string
    planType: string
    planName: string
    planDescription: string
    planPrice: string
    planDuration: string
    planDurationDescription: string
    activePlanDoorVehicles: string
    inActivePlanDoorVehicles: string
    benefitsData: Array<boolean | string>
    basicPlansBenefits: Array<boolean | string>
  }
}

export default function PricingPlans(props: IProps) {
  const [cardThemeColor, setCardThemeColor] = React.useState("")
  const [cardThemeBackgroundColor, setCardThemeBackgroundColor] =
    React.useState("")
  const [cardThemeButtonColor, setCardThemeButtonColor] = React.useState("")

  React.useEffect(() => {
    setCardThemeColor(
      props?.planData?.id === 0
        ? theme.palette.common.black
        : props?.planData?.id === 1
        ? theme.palette.common.violet
        : theme.palette.common.green
    )
    setCardThemeBackgroundColor(
      props?.planData?.id === 0
        ? theme.palette.main1
        : props?.planData?.id === 1
        ? theme.palette.grey1
        : theme.palette.green1
    )
    setCardThemeButtonColor(
      props?.planData?.id === 0
        ? theme.palette.main
        : props?.planData?.id === 1
        ? theme.palette.common.violet
        : props?.planData?.id === 2
        ? theme.palette.common.green
        : theme.palette.main
    )
  }, [props])

  return (
    <>
      <Box sx={{ px: 4, pt: 4 }}>
        <StyledPopularForText>
          {props?.planData?.popularity !== "" ? (
            <Box sx={{ color: cardThemeButtonColor }}>
              {props?.planData?.popularity}
            </Box>
          ) : (
            <>&nbsp;</>
          )}
        </StyledPopularForText>
        <StyledPlanNameText>
          {props?.planData?.planType}
          <br />
          {props?.planData?.planName}
        </StyledPlanNameText>
        <StyledPlanDescText>
          {props?.planData?.planDescription}
        </StyledPlanDescText>
        <StyledPlanPriceText>
          <Box
            sx={{
              color:
                props?.planData?.planType === "Premium Plan"
                  ? cardThemeColor
                  : null,
            }}
          >
            {props?.planData?.planPrice}
          </Box>
        </StyledPlanPriceText>
        <StyledPlanDurationText>
          {props?.planData?.planDuration}
        </StyledPlanDurationText>
        <StyledPlanDurationDescText>
          {props?.planData?.planDurationDescription}
        </StyledPlanDurationDescText>

        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          marginBottom="40px"
        >
          <StyledButton
            variant="contained"
            // color="primary"
            disableElevation
            $marginTop={rem("32px")}
            type="submit"
            sx={{
              width: "100%",
              backgroundColor: cardThemeButtonColor,
              "&:hover": {
                backgroundColor:
                  props?.planData?.id === 1
                    ? theme.palette.common.violet
                    : props?.planData?.id === 2
                    ? theme.palette.common.green
                    : null,
              },
            }}
          >
            <StyledButtonText>
              <Box sx={{ width: "auto", maxWidth: "md" }}>Select</Box>
            </StyledButtonText>
          </StyledButton>
        </Box>

        {props?.planData?.benefitsData.map((benefit, key) => (
          <BenefitsTextComponent
            iconColor={cardThemeButtonColor}
            status={benefit.status}
            benefits={benefit.benefits}
            key={key}
          />
        ))}
      </Box>
      <Box
        sx={{
          px: 4,
          pt: 4,
          pb: 3,
          backgroundColor: cardThemeBackgroundColor,
          borderRadius: "0px 0px 20px 20px",
          borderTop: `1px solid ${
            props?.planData?.id === 1
              ? theme.palette.grey3
              : theme.palette.green1
          }`,
        }}
      >
        <StyledBasicPlanIncludeText>
          {props?.planData?.planType} includes:
        </StyledBasicPlanIncludeText>
        {props?.planData?.basicPlansBenefits.map((basicBenefit, key) => (
          <BenefitsTextComponent
            iconColor={cardThemeButtonColor}
            status={basicBenefit.status}
            benefits={basicBenefit.benefits}
            key={key}
          />
        ))}
      </Box>
    </>
  )
}
