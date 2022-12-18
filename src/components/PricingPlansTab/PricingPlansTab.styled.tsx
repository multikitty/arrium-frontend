import { devices } from "@/constants/device"
import { Box, Grid } from "@mui/material"
import { rem } from "polished"
import styled from "styled-components"

export const StyledPricingPlansTab = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: ${rem("20px")};
`

export const commonStyledFontStyle = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 400;
  font-size: ${rem("16px")};
`

export const StyledPricingPlansTabChoosePlanText = styled(
  commonStyledFontStyle
)`
  font-size: ${rem("28px")};
  line-height: ${rem("32px")};
  color: ${p => p.theme.palette.grey7};

  @media ${devices.desktop.down} {
    font-size: ${rem("20px")};
    line-height: ${rem("24px")};
  }
`

export const StyledPricingPlansColumn = styled(Grid)``

export const StyledPricingPlansColumnPopularForText = styled(
  commonStyledFontStyle
)`
  font-weight: 600;
  font-size: ${rem("12px")};
  line-height: ${rem("20px")};
  text-align: center;
`

export const StyledPricingPlansColumnPlanNameText = styled(
  commonStyledFontStyle
)`
  font-weight: 700;
  font-size: ${rem("24px")};
  line-height: ${rem("28px")};
  color: ${p => p.theme.palette.blackText};
  padding: 16px 0;
  text-align: center;
`

export const StyledPricingPlansColumnPlanDescText = styled(
  commonStyledFontStyle
)`
  line-height: ${rem("24px")};
  // color: ${p => p.theme.palette.blackText};
  padding-bottom: 24px;
`

export const StyledPricingPlansColumnPlanPriceText = styled(
  commonStyledFontStyle
)`
  font-weight: 700;
  font-size: ${rem("42px")};
  line-height: ${rem("50px")};
  color: ${p => p.theme.palette.blackText};
`

export const StyledPricingPlansColumnPlanDurationText = styled(
  commonStyledFontStyle
)`
  line-height: ${rem("20px")};
  color: ${p => p.theme.palette.grey6};
  padding-bottom: 24px;
`

export const StyledPricingPlansColumnPlanDurationDescText = styled(
  commonStyledFontStyle
)`
  line-height: ${rem("24px")};
  color: ${p => p.theme.palette.grey6};
`

export const StyledPricingPlansColumnBenefitsActiveText = styled(
  commonStyledFontStyle
)`
  line-height: ${rem("24px")};
  color: ${p => p.theme.palette.blackText};
  margin-left: 14px;
`
export const StyledPricingPlansColumnBenefitsInactiveText = styled(
  commonStyledFontStyle
)`
  line-height: ${rem("24px")};
  color: ${p => p.theme.palette.grey5};
  margin-left: 14px;
`

export const StyledPricingPlansColumnBasicPlanIncludeText = styled(
  commonStyledFontStyle
)`
  font-weight: 600;
  color: ${p => p.theme.palette.blackText};
  padding-bottom: 16px;
`
