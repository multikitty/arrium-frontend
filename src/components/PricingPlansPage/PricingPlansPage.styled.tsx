import { rem } from "polished"
import styled, { css } from "styled-components"
import { StyledFAQPage, StyledFAQPageContent, StyledFAQPageHeader } from "../FAQPage/FAQPage.styled"


export const StyledPricingPlansPage = styled(StyledFAQPage)``


export const StyledPricingPlansPageHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: ${rem("32px")};
`

export const StyledPricingPlansHeader = styled(StyledFAQPageHeader)`
flex-grow: 1;
margin-bottom: 0;
`
export const StyledPricingPlansPageContent = styled(StyledFAQPageContent)``

export const commonStyledFontStyle = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 400;
  font-size: ${rem("16px")};
`


export const StyledChoosePlanText = styled(commonStyledFontStyle)`
  font-size: ${rem("28px")};
  line-height: ${rem("32px")};
  color: ${p => p.theme.palette.grey7};
`

export const StyledPopularForText = styled(commonStyledFontStyle)`
font-weight: 600;
font-size: ${rem("12px")};
line-height: ${rem("20px")};
text-align: center
`

export const StyledPlanNameText = styled(commonStyledFontStyle)`
font-weight: 700;
font-size: ${rem("24px")};
line-height: ${rem("28px")};
color: ${p => p.theme.palette.blackText};
padding: 16px 0;
text-align: center;
`


export const StyledPlanDescText = styled(commonStyledFontStyle)`
line-height: ${rem("24px")};
// color: ${p => p.theme.palette.blackText};
padding-bottom: 24px;
`

export const StyledPlanPriceText = styled(commonStyledFontStyle)`
font-weight: 700;
font-size: ${rem("42px")};
line-height: ${rem("50px")};
color: ${p => p.theme.palette.blackText};
`

export const StyledPlanDurationText = styled(commonStyledFontStyle)`
line-height: ${rem("20px")};
color: ${p => p.theme.palette.grey6};
padding-bottom:24px;
`

export const StyledPlanDurationDescText = styled(commonStyledFontStyle)`
line-height: ${rem("24px")};
color: ${p => p.theme.palette.grey6};
`

export const StyledBenefitsActiveText = styled(commonStyledFontStyle)`
line-height: ${rem("24px")};
color: ${p => p.theme.palette.blackText};
margin-left:14px;
`
export const StyledBenefitsInactiveText = styled(commonStyledFontStyle)`
line-height: ${rem("24px")};
color: ${p => p.theme.palette.grey5};
margin-left:14px;
`

export const StyledBasicPlanIncludeText = styled(commonStyledFontStyle)`
font-weight: 600;
color: ${p => p.theme.palette.blackText};
padding-bottom: 16px;
`