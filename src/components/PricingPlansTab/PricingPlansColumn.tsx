import React from "react"
import { Box, GridProps } from "@mui/material"
import {
  StyledPricingPlansColumn,
  StyledPricingPlansColumnBasicPlanIncludeText,
  StyledPricingPlansColumnPlanDescText,
  StyledPricingPlansColumnPlanDurationDescText,
  StyledPricingPlansColumnPlanDurationText,
  StyledPricingPlansColumnPlanNameText,
  StyledPricingPlansColumnPlanPriceText,
  StyledPricingPlansColumnPopularForText,
} from "./PricingPlansTab.styled"

import theme from "@/theme"
import { rem } from "polished"
import {
  StyledButton as StyledPricingPlansColumnButton,
  StyledButtonText as StyledPricingPlansColumnButtonText,
} from "../commons/uiComponents"
import BenefitsTextComponent from "./BenefitsTextComponent"

export type BenefitsData = Readonly<{
  readonly status: boolean
  readonly benefits: string
}>

interface IProps {
  readonly planData: Readonly<{
    id: Number
    popularity: string
    planType: string
    planName: string
    planDescription: string
    planPrice: string
    planDuration: string
    planDurationDescription: string
    benefitsData: ReadonlyArray<BenefitsData>
    basicPlansBenefits: ReadonlyArray<BenefitsData>
  }> | null
  readonly isBasicPlans: boolean
  readonly gridProps?: GridProps
}

export default function PricingPlansColumn({
  planData,
  isBasicPlans,
  gridProps = {},
}: IProps) {
  const [cardThemeColor, setCardThemeColor] = React.useState(
    theme.palette.common.green
  )
  const [cardThemeBackgroundColor, setCardThemeBackgroundColor] =
    React.useState(theme.palette.green1)
  const [cardThemeButtonColor, setCardThemeButtonColor] = React.useState(
    theme.palette.main
  )

  React.useEffect(() => {
    if (planData === null) return
    setCardThemeColor(
      planData.id === 0
        ? theme.palette.main
        : planData.id === 1
        ? theme.palette.common.violet
        : theme.palette.common.green
    )
    setCardThemeBackgroundColor(
      planData.id === 0
        ? theme.palette.main1
        : planData.id === 1
        ? theme.palette.grey1
        : theme.palette.green1
    )
    setCardThemeButtonColor(
      planData.id === 0
        ? theme.palette.main
        : planData.id === 1
        ? theme.palette.common.violet
        : planData.id === 2
        ? theme.palette.common.green
        : theme.palette.main
    )
  }, [planData])

  if (planData === null) return null

  return (
    <StyledPricingPlansColumn
      item
      xs={12}
      md={6}
      lg={4}
      sx={{
        px: 1,
        mb: 3,
      }}
      {...gridProps}
    >
      <Box
        sx={{
          border: `1px solid ${
            isBasicPlans ? theme.palette.grey4 : cardThemeColor
          }`,
          borderRadius: rem("12px"),
        }}
      >
        <Box sx={{ px: 4, pt: 4 }}>
          <StyledPricingPlansColumnPopularForText>
            {planData?.popularity !== "" ? (
              <Box sx={{ color: cardThemeButtonColor }}>
                {planData?.popularity}
              </Box>
            ) : (
              <>&nbsp;</>
            )}
          </StyledPricingPlansColumnPopularForText>
          <StyledPricingPlansColumnPlanNameText>
            {planData?.planType}
            <br />
            {planData?.planName}
          </StyledPricingPlansColumnPlanNameText>
          <StyledPricingPlansColumnPlanDescText>
            {planData?.planDescription}
          </StyledPricingPlansColumnPlanDescText>
          <StyledPricingPlansColumnPlanPriceText>
            <Box
              sx={{
                color: isBasicPlans ? null : cardThemeColor,
              }}
            >
              {planData?.planPrice}
            </Box>
          </StyledPricingPlansColumnPlanPriceText>
          <StyledPricingPlansColumnPlanDurationText>
            {planData?.planDuration}
          </StyledPricingPlansColumnPlanDurationText>
          <StyledPricingPlansColumnPlanDurationDescText>
            {planData?.planDurationDescription}
          </StyledPricingPlansColumnPlanDurationDescText>
          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            marginBottom="40px"
          >
            <StyledPricingPlansColumnButton
              variant="contained"
              disableElevation
              $marginTop={rem("32px")}
              type="submit"
              sx={{
                width: "100%",
                backgroundColor: cardThemeButtonColor,
                "&:hover": {
                  backgroundColor:
                    planData?.id === 1
                      ? theme.palette.common.violet
                      : planData?.id === 2
                      ? theme.palette.common.green
                      : null,
                },
              }}
            >
              <StyledPricingPlansColumnButtonText>
                <Box sx={{ width: "auto", maxWidth: "md" }}>Select</Box>
              </StyledPricingPlansColumnButtonText>
            </StyledPricingPlansColumnButton>
          </Box>
          {planData?.benefitsData.map((benefit, key) => (
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
            borderRadius: `0 0 ${rem("12px")} ${rem("12px")}`,
            borderTop: `1px solid ${
              planData?.id === 1 ? theme.palette.grey3 : theme.palette.green1
            }`,
          }}
        >
          <StyledPricingPlansColumnBasicPlanIncludeText>
            {planData?.planType} includes:
          </StyledPricingPlansColumnBasicPlanIncludeText>
          {planData?.basicPlansBenefits.map((basicBenefit, key) => (
            <BenefitsTextComponent
              iconColor={cardThemeButtonColor}
              status={basicBenefit.status}
              benefits={basicBenefit.benefits}
              key={key}
            />
          ))}
        </Box>
      </Box>
    </StyledPricingPlansColumn>
  )
}
