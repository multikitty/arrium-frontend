import { rem } from "polished"
import { Grid, InputBase, styled as muiStyled, TextField } from "@mui/material"
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
import theme from "@/muiTheme"

export const StyledCustomerDetailPage = styled(StyledFAQPage)``

export const StyledCustomerDetailPageHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: ${rem("16px")};
`

export const StyledCustomerDetailPageHeader = styled(StyledFAQPageHeader)`
  margin-bottom: ${rem("2px")};
`

export const StyledCustomerDetailPageSubHeader = styled.h6`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("14px")};
  line-height: ${rem("18px")};

  color: ${p => p.theme.palette.grey7};
`

export const StyledCustomerDetailPageContent = styled(StyledFAQPageContent)`
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
})<{ large?: boolean }>(({ theme, large, error }) => ({
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
  border: error
    ? `2px solid ${theme.palette.error.main}`
    : `1px solid ${sTheme.palette.grey3}`,
  borderRadius: rem("10px"),
  "&:focus-within": {
    borderColor: error ? theme.palette.error.dark : theme.palette.primary.main,
  },
}))

export const StyledAccountInformationTabDateField = styled(TextField)<{
  error: boolean
}>`
  width: 100%;
  border: ${p =>
    p.error
      ? `2px solid ${theme.palette.error.main}`
      : `1px solid ${theme.palette.grey[300]}`};
  padding: ${rem("14px")} ${rem("16px")};
  font-family: "Inter", "sans-serif";
  color: ${theme.palette.text.secondary};
  font-size: ${rem("16px")};
  line-height: ${rem("20px")};
  font-style: normal;
  font-weight: normal;
  width: 100%;
  border-radius: ${rem("10px")};
  transition: all 150ms ease-out;
  &:focus-within {
    border-color: ${p =>
      p.error ? theme.palette.error.dark : theme.palette.primary.main};
  }
`

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

  &:br-10 {
    border-radius: ${rem("10px")};
  }
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
