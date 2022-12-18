import { devices } from "@/constants/device"
import { rem } from "polished"
import styled from "styled-components"
import { StyledFAQPage, StyledFAQPageHeader } from "../FAQPage/FAQPage.styled"

export const StyledSubscriptionPage = styled(StyledFAQPage)``

export const StyledSubscriptionPageHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: ${rem("32px")};
`

export const StyledSubscriptionPageHeader = styled(StyledFAQPageHeader)`
  flex-grow: 1;
  margin-bottom: 0;
`
export const StyledSubscriptionPageContent = styled.div`
  padding-right: ${rem("24px")};

  @media ${devices.web.down} {
    padding-right: 0;
  }
`
