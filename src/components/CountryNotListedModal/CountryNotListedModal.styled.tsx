import { Modal, styled as muiStyled } from "@mui/material"
import { rem } from "polished"
import styled from "styled-components"
import { StyledFooterSectionBrandLogo } from "../FooterSection/FooterSection.styled"
import {
  StyledAddCountryModal,
  StyledAddCountryModalFormActions,
  StyledAddCountryModalTitle,
} from "../SettingsPage/SettingsPage.styled"

export const StyledModal = muiStyled(Modal)({
  "& .css-1ps6pg7-MuiPaper-root": {
    borderRadius: rem("20px"),
  },
})

export const StyledCountryNotListedModal = styled(StyledAddCountryModal)`
  width: 90%;
  max-width: ${rem("628px")};
`

export const StyledCountryNotListedModalBrandLogoContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: ${rem("40px")};
  margin-bottom: ${rem("40px")};
`

export const StyledCountryNotListedModalBrandLogo = styled(
  StyledFooterSectionBrandLogo
)``

export const StyledCountryNotListedModalTitle = styled(
  StyledAddCountryModalTitle
)`
  margin-bottom: ${rem("8px")};
  margin-top: 0;
`

export const StyledCountryNotListedModalSubTitle = styled.p`
  font-family: Inter;
  font-size: ${rem("16px")};
  font-weight: 400;
  line-height: ${rem("24px")};
  letter-spacing: 0;
  text-align: center;
  color: #0a0a0a;
  max-width: 520px;
  margin: 0 auto;
`

export const StyledCountryNotListedModalIllustrationContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: ${rem("17px")};
  margin-bottom: ${rem("33px")};
`

export const StyledCountryNotListedModalIllustration = styled.img`
  height: ${rem("115px")};
  width: ${rem("132px")};
`

export const StyledCountryNotListedModalFormActions = styled(
  StyledAddCountryModalFormActions
)`
  max-width: ${rem("410px")};
  margin: 0 auto;
`
