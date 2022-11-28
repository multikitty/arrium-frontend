import { rem } from "polished"
import { Grid, InputBase, styled as muiStyled } from "@mui/material"
import styled from "styled-components"
import {
  StyledFAQPage,
  StyledFAQPageContent,
  StyledFAQPageHeader,
} from "../FAQPage/FAQPage.styled"
import {
  StyledProfileTabContentFieldHelperText,
  StyledProfileTabContentFieldLabel,
} from "../ProfilePage/ProfilePage.styled"
import sTheme from "@/theme"

export const StyledAddCustomerPage = styled(StyledFAQPage)``

export const StyledAddCustomerPageHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${rem("12px")};
`

export const StyledAddCustomerPageHeader = styled(StyledFAQPageHeader)`
  margin-bottom: ${rem("2px")};
`

export const StyledAddCustomerPageSubHeader = styled.h6`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("14px")};
  line-height: ${rem("18px")};

  color: ${p => p.theme.palette.grey7};
`

export const StyledAddCustomerPageContent = styled(StyledFAQPageContent)`
  display: flex;
  flex-direction: column;
`

export const StyledAccountInformationTab = styled.div`
  padding: ${rem("32px")};
  padding-top: ${rem("40px")};
  height: 100%;
`

export const StyledAccountInformationTabForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

export const StyledAccountInformationTabFormLabel = styled(
  StyledProfileTabContentFieldLabel
)`
  margin-bottom: ${rem("8px")};
`

export const StyledAccountInformatiomTabContentField = muiStyled(InputBase, {
  shouldForwardProp: prop => prop !== "large",
})<{ large?: boolean }>(({ theme, large }) => ({
  width: "100%",
  "& .MuiInputBase-input": {
    padding: large
      ? `${rem("20px")} ${rem("16px")}`
      : `${rem("14px")} ${rem("16px")}`,
    position: "relative",
    color: sTheme.palette.blackText,
    fontSize: rem("16px"),
    lineHeight: rem("20px"),
    fontStyle: "normal",
    fontWeight: "normal",
    width: "100%",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    fontFamily: ["Inter", "sans-serif"].join(","),
  },
  border: `1px solid ${sTheme.palette.grey3}`,
  borderRadius: rem("10px"),
  "&:focus-within": {
    borderColor: theme.palette.primary.main,
  },
}))

export const StyledAccountInformationTabFormHelperText = styled(
  StyledProfileTabContentFieldHelperText
)``

export const StyledAccountInformationTabFormActions = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const StyledBillingTab = styled.div`
  height: 100%;
`

export const StyledBillingTabUpperContainer = styled(Grid).attrs({
  container: true,
  spacing: 2,
})`
  padding: ${rem("32px")};
  padding-top: ${rem("40px")};
  margin-bottom: ${rem("40px")};
`

export const StyledBillingTabUpperContainerItem = styled.div`
  display: flex;
  flex-direction: column;
`

export const StyledBillingTabUpperContainerItemTitle = styled(
  StyledAccountInformationTabFormLabel
)``

export const StyledBillingTabUpperContainerItemText = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("16px")};
  line-height: ${rem("20px")};

  color: ${p => p.theme.palette.blackText};
`

export const StyledConfigurationTab = styled.div`
  padding: ${rem("24px")};
  padding-top: ${rem("40px")};
  height: 100%;
`

export const StyledConfigurationTabForm = styled(
  StyledAccountInformationTabForm
)``

export const StyledConfigurationTabFormItem = styled(
  StyledBillingTabUpperContainerItem
)`
  margin-bottom: ${rem("24px")};
`

export const StyledConfigurationTabFormLabel = styled(
  StyledAccountInformationTabFormLabel
)`
  margin-bottom: ${rem("8px")};
`

export const StyledConfigurationTabFormField = styled(
  StyledAccountInformatiomTabContentField
)``

export const StyledConfigurationTabFormHelperText = styled(
  StyledAccountInformationTabFormHelperText
)``

export const StyledConfigurationTabFormActions = styled(
  StyledAccountInformationTabFormActions
)``

export const StyledReferralTab = styled.div`
  padding: ${rem("24px")};
  padding-top: ${rem("40px")};
  height: 100%;
`

export const StyledReferralTabForm = styled(StyledConfigurationTabForm)``

export const StyledReferralTabFormItem = styled(StyledConfigurationTabFormItem)`
  margin-bottom: ${rem("24px")};
`

export const StyledReferralTabFormItemTitle = styled(
  StyledBillingTabUpperContainerItemTitle
)``

export const StyledReferralTabFormItemText = styled(
  StyledBillingTabUpperContainerItemText
)``

export const StyledReferralTabFormLabel = styled(
  StyledConfigurationTabFormLabel
)`
  margin-bottom: ${rem("8px")};
`

export const StyledReferralTabFormField = styled(
  StyledConfigurationTabFormField
)``

export const StyledReferralTabFormHelperText = styled(
  StyledConfigurationTabFormHelperText
)``

export const StyledReferralTabFormActions = styled(
  StyledConfigurationTabFormActions
)``
