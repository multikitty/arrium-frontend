import styled from "styled-components"
import { rem } from "polished"
import { devices } from "@/constants/device"

export const StyledFAQPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - ${p => rem(p.theme.sizes.topbarHeight)});
  padding-bottom: ${rem("40px")};
  padding-right: ${rem("24px")};

  @media ${devices.desktop.down} {
    padding-right: 0;
  }
`

export const StyledFAQPageHeader = styled.h3`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: ${rem("28px")};
  line-height: ${rem("32px")};
  margin-bottom: ${rem("32px")};
  color: ${p => p.theme.palette.blackText};

  @media ${devices.desktop.down} {
    padding-top: ${rem("24px")};
    padding-left: ${rem("21px")};
  }
`

export const StyledFAQPageContent = styled.div`
  flex-grow: 1;
  border: 1px solid ${p => p.theme.palette.grey3};
  border-radius: ${rem("20px")};

  @media ${devices.desktop.down} {
    border-radius: 0;
  }
`

export const StyledFAQPageContentAccordionSummaryText = styled.h4<{
  $expanded?: boolean
}>`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: ${rem("16px")};
  line-height: ${rem("20px")};

  color: ${p =>
    p.$expanded ? p.theme.palette.main : p.theme.palette.blackText};
`

export const StyledFAQPageContentAccordionDetailsText = styled.h4`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("16px")};
  line-height: ${rem("24px")};

  color: ${p => p.theme.palette.blackText};
`
