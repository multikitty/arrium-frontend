import { rem } from "polished"
import { Modal, styled as muiStyled } from "@mui/material"
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

export const StyledSelectCountryModal = styled(StyledAddCountryModal)`
  width: 90%;
  max-width: ${rem("628px")};
`

export const StyledSelectCountryModalBrandLogoContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: ${rem("40px")};
  margin-bottom: ${rem("40px")};
`

export const StyledSelectCountryModalBrandLogo = styled(
  StyledFooterSectionBrandLogo
)``

export const StyledSelectCountryModalTitle = styled(StyledAddCountryModalTitle)`
  margin-bottom: ${rem("8px")};
  margin-top: 0;
`

export const StyledSelectCountryModalSubTitle = styled.p`
  font-family: Inter;
  font-size: ${rem("16px")};
  font-weight: 400;
  line-height: ${rem("24px")};
  letter-spacing: 0;
  text-align: center;
  color: #0a0a0a;
  max-width: 520px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: ${rem("54px")};
`

export const StyledSelectCountryModalFormActions = styled(
  StyledAddCountryModalFormActions
)`
  max-width: ${rem("410px")};
  margin: 0 auto;
`
