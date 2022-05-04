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
import { Paper } from "@mui/material"
import { StyledAccountInformatiomTabContentField } from "../CustomerDetailPage/CustomerDetailPage.styled"

export const StyledReferralsPage = styled(StyledFAQPage)``

export const StyledReferralsPageHeader = styled(StyledFAQPageHeader)``

export const StyledReferralsPageContent = styled(StyledFAQPageContent)``

export const StyledReferralsPageContentUpperSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${rem("24px")} ${rem("32px")};
`

export const StyledReferralsPageContentUpperSectionSearchField = muiStyled(
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

export const StyledReferralsPageContentUpperSectionRecordCount = styled.div`
  display: flex;
`

export const StyledReferralsPageContentUpperSectionRecordCountTitle = styled.h6`
  margin-right: ${rem("4px")};
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("16px")};
  line-height: ${rem("20px")};

  color: ${p => p.theme.palette.grey7};
`

export const StyledReferralsPageContentUpperSectionRecordCountText = styled.h6`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: ${rem("16px")};
  line-height: ${rem("20px")};

  color: ${p => p.theme.palette.blackText};
`

export const StyledCreateReferralModal = styled(Paper).attrs({ elevation: 1 })`
  border-radius: ${rem("20px")};
  padding: ${rem("16px")};
  width: 100%;
  max-width: ${rem("420px")};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const StyledCreateReferralModalCloseIconContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: ${rem("6px")};
`

export const StyledCreateReferralModalTitle = styled.h3`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("28px")};
  line-height: ${rem("32px")};
  margin-bottom: ${rem("16px")};
  text-align: center;

  color: ${p => p.theme.palette.blackText};
`

export const StyledCreateReferralModalForm = styled.form`
  padding: ${rem("24px")};
  padding-bottom: ${rem("28px")};
`

export const StyledCreateReferralModalFormField = styled(
  StyledAccountInformatiomTabContentField
)``

export const StyledCreateReferralModalFormAction = styled.div`
  margin-bottom: ${rem("24px")};
`
