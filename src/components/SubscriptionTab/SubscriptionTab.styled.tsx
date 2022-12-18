import { rem } from "polished"
import styled, { css } from "styled-components"
import { styled as muiStyled } from "@mui/material/styles"
import theme from "@/theme"
import { devices } from "@/constants/device"
import { StyledFAQPage, StyledFAQPageContent } from "../FAQPage/FAQPage.styled"
import { Button } from "@mui/material"

export const StyledSubscriptionTab = styled(StyledFAQPage)`
  padding-right: 0;
`

export const StyledSubscriptionTabDetailsContainer = styled(
  StyledFAQPageContent
)`
  display: flex;
  flex-grow: 0;
  padding: ${rem("32px")};
  margin-bottom: ${rem("16px")};

  @media ${devices.desktop.down} {
    flex-direction: column;
    border-radius: ${rem("20px")};
    margin: ${rem("16px")};
    margin-bottom: ${rem("48px")};
  }
`

export const StyledSubscriptionTabDetailsNextPaymentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: ${rem("70px")};

  @media ${devices.desktop.down} {
    margin-right: 0;
    margin-bottom: ${rem("24px")};
  }
`

export const StyledSubscriptionTabDetailsNextPaymentSectionTitle = styled.h5`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("20px")};
  line-height: ${rem("28px")};
  letter-spacing: 0.01em;
  margin-bottom: ${rem("8px")};

  color: ${p => p.theme.palette.blackText};
`

export const StyledSubscriptionTabDetailsNextPaymentSectionText = styled.h4`
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: ${rem("32px")};
  line-height: ${rem("36px")};
  letter-spacing: 0.01em;

  color: ${p => p.theme.palette.blackText};
`

export const StyledSubscriptionTabDetailsPriceSection = styled(
  StyledSubscriptionTabDetailsNextPaymentSection
)`
  @media ${devices.desktop.down} {
    margin-right: 0;
    margin-bottom: ${rem("40px")};
  }
`

export const StyledSubscriptionTabDetailsPriceSectionTitle = styled(
  StyledSubscriptionTabDetailsNextPaymentSectionTitle
)``

export const StyledSubscriptionTabDetailsPriceSectionText = styled(
  StyledSubscriptionTabDetailsNextPaymentSectionText
)``

export const StyledSubscriptionTabDetailsActionsSection = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media ${devices.desktop.down} {
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
  }
`

export const StyledSubscriptionTabInvoicesContainer = styled(
  StyledSubscriptionTabDetailsContainer
)<{ billingTab?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 0;

  ${p =>
    p.billingTab &&
    css`
      border-width: 0;
      border-radius: 0 0 ${rem("20px")} ${rem("20px")};
    `}

  @media ${devices.desktop.down} {
    margin: 0;
    border-width: 0;
    border-radius: 0;
  }
`

export const StyledSubscriptionTabInvoicesHeader = styled.h4`
  padding: ${rem("24px")} ${rem("32px")};
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: ${rem("20px")};
  line-height: ${rem("32px")};

  color: ${p => p.theme.palette.grey7};

  @media ${devices.desktop.down} {
    padding: ${rem("16px")} ${rem("20px")};
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);
  }
`

export const StyledSubscriptionTabInvoice = styled.div`
  display: flex;
  flex-direction: column;
`

export const StyledSubscriptionTabInvoiceHeader = styled.div<{
  searchTable?: boolean
}>`
  display: flex;
  flex-direction: column;
  padding: ${rem("20px")};
  padding-top: ${rem("14px")};
  background-color: ${p => p.theme.palette.grey1};
  ${p =>
    p.searchTable &&
    css`
      border-bottom: 1px solid ${p => p.theme.palette.grey3};
    `};

  @media ${devices.desktop.down} {
    padding: ${rem("12px")} ${rem("18px")};
  }
`

export const StyledSubscriptionTabInvoiceHeaderTitle = styled.h5<{
  isSubHeaderBelow?: boolean
}>`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: ${rem("16px")};
  line-height: ${rem("20px")};
  margin-bottom: ${p => (p.isSubHeaderBelow ? 0 : rem("6px"))};

  color: ${p => p.theme.palette.grey6};
`

export const StyledSubscriptionTabInvoiceHeaderText = styled.p<{
  noMarginBottom?: boolean
}>`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("16px")};
  line-height: ${rem("20px")};
  margin-bottom: ${p => (p.noMarginBottom ? 0 : rem("6px"))};

  color: ${p => p.theme.palette.blackText};
`
export const StyledSubscriptionTabInvoiceItemsContainer = styled.div<{
  searchTable?: boolean
}>`
  padding: ${rem("22px")} ${rem("20px")} ${rem("24px")};
  ${p =>
    p.searchTable &&
    css`
      border-bottom: 1px solid ${p => p.theme.palette.grey3};
    `};
`

export const StyledSubscriptionTabInvoiceItem = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: ${rem("6px")};
  padding: ${rem("6px")} 0;
`

export const StyledSubscriptionTabInvoiceItemLabel = styled(
  StyledSubscriptionTabInvoiceHeaderTitle
)`
  flex-basis: 50%;

  span {
    color: ${p => p.theme.palette.main};
  }
`

export const StyledSubscriptionTabInvoiceItemValue = styled(
  StyledSubscriptionTabInvoiceHeaderText
)<{ bold?: boolean }>`
  flex-basis: 50%;
  font-weight: ${p => (p.bold ? 600 : "normal")};
`

export const StyledSubscriptionTabInvoiceTableContainedButton = muiStyled(
  Button
)(() => ({
  boxShadow: "none",
  textTransform: "none",
  whiteSpace: "nowrap",
  borderRadius: rem("6px"),
  padding: `${"6px"} ${"16px"} ${"6px"} ${"16px"}`,
  fontSize: rem("16px"),
  lineHeight: rem("20px"),
  maxWidth: "156px",
  backgroundColor: theme.palette.main,
  minWidth: "64px",
  border: "1px solid",
  borderColor: theme.palette.main,
  fontFamily: ["Inter", "sans-serif"].join(","),
  color: theme.palette.common.white,

  "&:disabled": {
    borderColor: theme.palette.grey3,
    color: theme.palette.common.white,
  },

  "&:hover": {
    boxShadow: "none",
    backgroundColor: theme.palette.mainHover,
    borderColor: theme.palette.main,
  },

  "&:active": {
    boxShadow: "none",
    backgroundColor: theme.palette.main,
    borderColor: theme.palette.mainHover,
  },

  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
}))

export const StyledSubscriptionTabInvoiceTableOutlinedButton = muiStyled(
  Button
)(() => ({
  boxShadow: "none",
  textTransform: "none",
  borderRadius: rem("6px"),
  padding: `${"6px"} ${"16px"} ${"6px"} ${"16px"}`,
  fontSize: rem("16px"),
  lineHeight: rem("20px"),
  maxWidth: "156px",
  border: "1px solid",
  backgroundColor: theme.palette.common.white,
  borderColor: theme.palette.grey3,
  whiteSpace: "nowrap",
  color: theme.palette.grey7,
  fontFamily: ["Inter", "sans-serif"].join(","),
  "&:hover": {
    boxShadow: "none",
    borderColor: theme.palette.mainHover,
  },

  "&:active": {
    boxShadow: "none",
    borderColor: theme.palette.mainHover,
  },

  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },

  "& > a": {
    color: `${theme.palette.grey7}`,
    textDecoration: "none",
  },
}))
