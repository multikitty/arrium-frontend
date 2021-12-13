import styled from "styled-components"
import { rem } from "polished"

export const StyledFAQPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - ${p => rem(p.theme.sizes.topbarHeight)});
  padding-bottom: ${rem("40px")};
  padding-right: ${rem("24px")};
`

export const StyledFAQPageHeader = styled.h3`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: ${rem("28px")};
  line-height: ${rem("32px")};
  margin-bottom: ${rem("32px")};

  color: ${p => p.theme.palette.blackText};
`

export const StyledFAQPageContent = styled.div`
  flex-grow: 1;
  border: 1px solid ${p => p.theme.palette.grey3};
  border-radius: ${rem("20px")};
`

export const StyledFAQPageContentAccordionSummaryText = styled.h4<{
  expanded?: boolean
}>`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: ${rem("16px")};
  line-height: ${rem("20px")};

  color: ${p =>
    p.expanded ? p.theme.palette.main : p.theme.palette.blackText};
`

export const StyledFAQPageContentAccordionDetailsText = styled.h4<{
  expanded?: boolean
}>`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("16px")};
  line-height: ${rem("24px")};

  color: ${p => p.theme.palette.blackText};
`
