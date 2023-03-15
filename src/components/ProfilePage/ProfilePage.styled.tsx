import styled from "styled-components"
import {
  StyledFAQPage,
  StyledFAQPageHeader,
  StyledFAQPageContent,
} from "../FAQPage/FAQPage.styled"
import { rem } from "polished"
import { styled as muiStyled } from "@mui/material/styles"
import { InputBase } from "@mui/material"
import sTheme from "@/theme"

export const StyledProfilePage = styled(StyledFAQPage)``

export const StyledProfilePageHeader = styled(StyledFAQPageHeader)``

export const StyledProfilePageContent = styled(StyledFAQPageContent)``

export const StyledProfileTabContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: ${rem("40px")} ${rem("20px")};
`

export const StyledProfileTabContentBody = styled.div`
  width: 100%;
  max-width: ${rem("460px")};
  margin: 0 auto;
`

export const StyledProfileTabContentFieldLabel = styled.h5`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: ${rem("16px")};
  line-height: ${rem("20px")};
  margin-left: 2px;

  color: ${p => p.theme.palette.grey5};
`

export const StyledProfileTabContentField = muiStyled(InputBase)(
  ({ theme }) => ({
    width: "100%",
    "& .MuiInputBase-input": {
      position: "relative",
      color: sTheme.palette.blackText,

      fontSize: rem("16px"),
      lineHeight: rem("20px"),
      fontStyle: "normal",
      fontWeight: "normal",
      width: "100%",
      padding: rem("8px"),
      paddingBottom: rem("14px"),
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      fontFamily: ["Inter", "sans-serif"].join(","),
    },
    borderBottom: `1px solid ${sTheme.palette.grey3}`,
    "&:focus-within, &:hover": {
      borderBottomColor: theme.palette.primary.main,
    },
  })
)

export const StyledProfileTabContentFieldInputTextCapitalize = muiStyled(InputBase)(
  ({ theme }) => ({
    width: "100%",
    "& .MuiInputBase-input": {
      position: "relative",
      color: sTheme.palette.blackText,
      textTransform: 'capitalize',
      fontSize: rem("16px"),
      lineHeight: rem("20px"),
      fontStyle: "normal",
      fontWeight: "normal",
      width: "100%",
      padding: rem("8px"),
      paddingBottom: rem("14px"),
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      fontFamily: ["Inter", "sans-serif"].join(","),
    },
    borderBottom: `1px solid ${sTheme.palette.grey3}`,
    "&:focus-within, &:hover": {
      borderBottomColor: theme.palette.primary.main,
    },
  })
)

export const StyledProfileTabContentFieldHelperText = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("10px")};
  line-height: ${rem("16px")};
  margin-left: ${rem("16px")};

  color: #a60000;
`

export const StyledProfileTabContentActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const StyledFlexAccountTabContent = styled(StyledProfileTabContent)``

export const StyledFlexAccountTabContentFieldHelperText = styled(
  StyledProfileTabContentFieldHelperText
)``

export const StyledFlexAccountTabContentActionButtons = styled(
  StyledProfileTabContentActionButtons
)``

export const StyledFlexAccountTabContentBody = styled(
  StyledProfileTabContentBody
)``

export const StyledFlexAccountTabContentFieldLabel = styled(
  StyledProfileTabContentFieldLabel
)``
