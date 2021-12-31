import { rem } from "polished"
import styled, { css } from "styled-components"
import { devices } from "../../constants/device"
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

  @media ${devices.web.down} {
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

  @media ${devices.web.down} {
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
  @media ${devices.web.down} {
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

  @media ${devices.web.down} {
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
`

export const StyledSubscriptionPageInvoicesHeader = styled.h4`
  padding: ${rem("24px")} ${rem("32px")};
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: ${rem("20px")};
  line-height: ${rem("32px")};

  color: ${p => p.theme.palette.grey7};
`
