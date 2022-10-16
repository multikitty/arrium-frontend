import React from "react"
import { rem } from "polished"
import {
  StyledCountryNotListedModal,
  StyledCountryNotListedModalFormActions,
  StyledCountryNotListedModalTitle,
  StyledCountryNotListedModalSubTitle,
  StyledCountryNotListedModalBrandLogoContainer,
  StyledCountryNotListedModalBrandLogo,
  StyledCountryNotListedModalIllustrationContainer,
  StyledCountryNotListedModalIllustration,
  StyledModal,
} from "./CountryNotListedModal.styled"
import { ContainedButton } from "../commons/Button"
import brandLogo from "@/assets/icons/arrium_logo.svg"
import selectYourCountryImage from "@/assets/icons/landing-select_your_country.svg"

interface IProps {
  open: boolean
  handleContinue: () => void
}

const CountryNotListedModal = (props: IProps) => {
  return (
    <StyledModal open={props.open}>
      <StyledCountryNotListedModal countryNotListed>
        <StyledCountryNotListedModalBrandLogoContainer>
          <StyledCountryNotListedModalBrandLogo src={brandLogo} />
        </StyledCountryNotListedModalBrandLogoContainer>
        <StyledCountryNotListedModalTitle deleteConfirmation selectCountry>
          Sit Tight! We're Coming Soon!
        </StyledCountryNotListedModalTitle>
        <StyledCountryNotListedModalSubTitle>
          Our team is working tirelessly to bring our services to your location.
        </StyledCountryNotListedModalSubTitle>
        <StyledCountryNotListedModalIllustrationContainer>
          <StyledCountryNotListedModalIllustration
            src={selectYourCountryImage}
          />
        </StyledCountryNotListedModalIllustrationContainer>
        <StyledCountryNotListedModalFormActions>
          <ContainedButton
            sx={{
              width: "90%",
              margin: "0 auto",
              marginBottom: rem("16px"),
            }}
            onClick={props.handleContinue}
          >
            Ok
          </ContainedButton>
        </StyledCountryNotListedModalFormActions>
      </StyledCountryNotListedModal>
    </StyledModal>
  )
}

export default CountryNotListedModal
