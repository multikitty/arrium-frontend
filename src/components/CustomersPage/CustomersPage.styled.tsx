import { rem } from "polished"
import styled from "styled-components"
import {
  StyledFAQPage,
  StyledFAQPageHeader,
  StyledFAQPageContent,
} from "../FAQPage/FAQPage.styled"
import { styled as muiStyled } from "@mui/material/styles"
import InputBase from "@mui/material/InputBase"
import sTheme from "@/theme"

export const StyledCustomersPage = styled(StyledFAQPage)``

export const StyledCustomersPageHeader = styled(StyledFAQPageHeader)``

export const StyledCustomersPageContent = styled(StyledFAQPageContent)``

export const StyledCustomersPageContentUpperSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${rem("24px")} ${rem("32px")};
`

export const StyledCustomersPageContentUpperSectionSearchField = muiStyled(
  InputBase
)(({ theme }) => ({
  "& .MuiInputBase-input": {
    position: "relative",
    color: sTheme.palette.blackText,
    fontSize: rem("14px"),
    lineHeight: rem("16px"),
    fontStyle: "normal",
    fontWeight: "normal",
    width: "100%",
    maxWidth: 300,
    padding: `${rem("8px")} ${rem("12px")}`,
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    fontFamily: ["Inter", "sans-serif"].join(","),
  },
  borderRadius: rem("6px"),
  border: `1px solid ${sTheme.palette.grey3}`,
  "&:focus-within": {
    borderColor: sTheme.palette.grey5,
  },
}))

export const StyledCustomersPageContentUpperSectionRecordCount = styled.div`
  display: flex;
`

export const StyledCustomersPageContentUpperSectionRecordCountTitle = styled.h6`
  margin-right: ${rem("4px")};
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("16px")};
  line-height: ${rem("20px")};

  color: ${p => p.theme.palette.grey7};
`

export const StyledCustomersPageContentUpperSectionRecordCountText = styled.h6`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: ${rem("16px")};
  line-height: ${rem("20px")};

  color: ${p => p.theme.palette.blackText};
`
