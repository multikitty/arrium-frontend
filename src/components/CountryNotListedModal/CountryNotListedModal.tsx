import React from "react"
import { Modal } from "@mui/material"
import { rem } from "polished"
import {
  StyledAddCountryModal as StyledCountryNotListedModal,
  StyledAddCountryModalFormActions as StyledCountryNotListedModalFormActions,
  StyledAddCountryModalTitle as StyledCountryNotListedModalTitle,
  StyledDeleteConfirmationModalSubTitle,
} from "../SettingsPage/SettingsPage.styled"
import { ContainedButton } from "../commons/Button"
import { Link } from "react-scroll"

interface IProps {
  open: boolean
  handleContinue: () => void
}

const CountryNotListedModal = (props: IProps) => {
  return (
    <Modal open={props.open}>
      <StyledCountryNotListedModal countryNotListed>
        <StyledCountryNotListedModalTitle deleteConfirmation selectCountry>
          We're rolling out Arrium globally so if you're waiting for us, we'll
          be with you shortly.
        </StyledCountryNotListedModalTitle>
        <StyledDeleteConfirmationModalSubTitle>
          In the meantime, send us a message to let us know where you are from,
          and we'll let you know how soon we'll be launching in your location.
        </StyledDeleteConfirmationModalSubTitle>
        <StyledCountryNotListedModalFormActions>
          <ContainedButton
            sx={{
              width: "90%",
              margin: "0 auto",
              marginBottom: rem("16px"),
            }}
            onClick={props.handleContinue}
          >
            {/* <Link
              delay={300}
              offset={-50}
              to="contact-us-section"
              spy={true}
              smooth={true}
            > */}
            Continue
            {/* </Link> */}
          </ContainedButton>
        </StyledCountryNotListedModalFormActions>
      </StyledCountryNotListedModal>
    </Modal>
  )
}

export default CountryNotListedModal
