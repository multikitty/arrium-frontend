import { Grid } from "@mui/material"
import { rem } from "polished"
import styled from "styled-components"
import { devices } from "../../constants/device"

export const StyledBenefitsSection = styled.div`
  background: #ffffff;
  padding: ${rem("80px")} 0;
  max-width: ${p => p.theme.sizes.container};
  width: 100%;
  margin: 0 auto;
  margin-bottom: ${rem("12px")};
  @media (max-width: ${p => p.theme.sizes.container}) {
    padding: ${rem("80px")} ${rem("16px")};
  }
`

export const StyledBenefitsSectionHeader = styled.h3`
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: ${rem("48px")};
  line-height: ${rem("58px")};
  color: #0a0a0a;
  margin-bottom: ${rem("40px")};
  text-align: center;
`

export const StyledBenefitsSectionCardContainer = styled(Grid).attrs({
  item: true,
  xs: 12,
  sm: 6,
  md: 4,
})``

export const StyledBenefitsSectionCard = styled.div`
  padding: ${rem("24px")};
  border-radius: ${rem("12px")};
  border: 1px solid #f9faff;
  background-color: #f9faff;
  width: 100%;
  height: 100%;
  transition: all 150ms ease-out;

  &:hover {
    border: 1px solid ${p => p.theme.palette.common.orange};
    background-color: ${p => p.theme.palette.common.white};
  }

  @media ${devices.web.down} {
    padding: ${rem("16px")};
  }
`

export const StyledBenefitsSectionCardIcon = styled.div`
  width: ${rem("40px")};
  height: ${rem("40px")};
  margin-bottom: ${rem("32px")};

  @media ${devices.web.down} {
    margin-bottom: ${rem("24px")};
  }
`

export const StyledBenefitsSectionCardTitle = styled.h5`
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: ${rem("20px")};
  line-height: 100%;
  color: ${p => p.theme.palette.common.black};
  margin-bottom: ${rem("12px")};
`

export const StyledBenefitsSectionCardText = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("16px")};
  line-height: ${rem("22px")};
  color: ${p => p.theme.palette.common.black};
  margin-bottom: ${rem("48px")};

  @media ${devices.web.down} {
    margin-bottom: ${rem("24px")};
  }
`
