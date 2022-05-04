import { rem } from "polished"
import styled, { css } from "styled-components"
import { devices } from "@/constants/device"
import {
  StyledFAQPage,
  StyledFAQPageHeader,
  StyledFAQPageContent,
} from "../FAQPage/FAQPage.styled"

export const StyledSubscriptionPage = styled(StyledFAQPage)``

export const StyledSubscriptionPageHeader = styled(StyledFAQPageHeader)``

export const StyledSubscriptionPageDetailsContainer = styled(
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

export const StyledSubscriptionPageDetailsNextPaymentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: ${rem("70px")};

  @media ${devices.desktop.down} {
    margin-right: 0;
    margin-bottom: ${rem("24px")};
  }
`

export const StyledSubscriptionPageDetailsNextPaymentSectionTitle = styled.h5`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("20px")};
  line-height: ${rem("28px")};
  letter-spacing: 0.01em;
  margin-bottom: ${rem("8px")};

  color: ${p => p.theme.palette.blackText};
`

export const StyledSubscriptionPageDetailsNextPaymentSectionText = styled.h4`
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: ${rem("32px")};
  line-height: ${rem("36px")};
  letter-spacing: 0.01em;

  color: ${p => p.theme.palette.blackText};
`

export const StyledSubscriptionPageDetailsPriceSection = styled(
  StyledSubscriptionPageDetailsNextPaymentSection
)`
  @media ${devices.desktop.down} {
    margin-right: 0;
    margin-bottom: ${rem("40px")};
  }
`

export const StyledSubscriptionPageDetailsPriceSectionTitle = styled(
  StyledSubscriptionPageDetailsNextPaymentSectionTitle
)``

export const StyledSubscriptionPageDetailsPriceSectionText = styled(
  StyledSubscriptionPageDetailsNextPaymentSectionText
)``

export const StyledSubscriptionPageDetailsActionsSection = styled.div`
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

export const StyledSubscriptionPageInvoicesContainer = styled(
  StyledSubscriptionPageDetailsContainer
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

export const StyledSubscriptionPageInvoicesHeader = styled.h4`
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

export const StyledSubscriptionPageInvoice = styled.div`
  display: flex;
  flex-direction: column;
`

export const StyledSubscriptionPageInvoiceHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${rem("20px")};
  padding-top: ${rem("14px")};
  background-color: ${p => p.theme.palette.grey1};
`

export const StyledSubscriptionPageInvoiceHeaderTitle = styled.h5`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: ${rem("16px")};
  line-height: ${rem("20px")};
  margin-bottom: ${rem("6px")};

  color: ${p => p.theme.palette.grey6};
`

export const StyledSubscriptionPageInvoiceHeaderText = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("16px")};
  line-height: ${rem("20px")};
  margin-bottom: ${rem("6px")};

  color: ${p => p.theme.palette.blackText};
`
export const StyledSubscriptionPageInvoiceItemsContainer = styled.div`
  padding: ${rem("22px")} ${rem("20px")} ${rem("24px")};
`

export const StyledSubscriptionPageInvoiceItem = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: ${rem("6px")};
  padding: ${rem("6px")} 0;
`

export const StyledSubscriptionPageInvoiceItemLabel = styled(
  StyledSubscriptionPageInvoiceHeaderTitle
)`
  flex-basis: 50%;
`

export const StyledSubscriptionPageInvoiceItemValue = styled(
  StyledSubscriptionPageInvoiceHeaderText
)<{ bold?: boolean }>`
  flex-basis: 50%;
  font-weight: ${p => (p.bold ? 600 : "normal")};
`
