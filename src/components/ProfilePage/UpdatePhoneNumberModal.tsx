import React, { useState } from "react"
import { Box, IconButton, Modal } from "@mui/material"
import { rem } from "polished"
import {
  StyledAddCountryModal as StyledUpdatePhoneNumberModal,
  StyledAddCountryModalCloseIconContainer as StyledUpdatePhoneNumberModalCloseIconContainer,
  StyledAddCountryModalForm as StyledUpdatePhoneNumberModalForm,
  StyledAddCountryModalTitle as StyledUpdatePhoneNumberModalTitle,
  StyledDeleteConfirmationModalSubTitle as StyledUpdatePhoneNumberModalSubTitle,
} from "../SettingsPage/SettingsPage.styled"
import CloseIcon from "@mui/icons-material/Close"
import { ContainedButton, LinkButton } from "../commons/Button"
import { StyledOtpInput } from "../OtpConfirmationSection/OtpConfirmationSection.styled"

interface IProps {
  open: boolean
  handleClose: () => void
  handlePhoneNumberChange: () => void
}

const UpdatePhoneNumberModal = (props: IProps) => {
  const [otp, setOtp] = useState("")

  const handleOtpFieldChange = (otpValue: string) => setOtp(otpValue)

  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <StyledUpdatePhoneNumberModal>
        <StyledUpdatePhoneNumberModalCloseIconContainer>
          <IconButton size="small" onClick={props.handleClose}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </StyledUpdatePhoneNumberModalCloseIconContainer>
        <StyledUpdatePhoneNumberModalTitle>
          Phone number change confirmation
        </StyledUpdatePhoneNumberModalTitle>
        <StyledUpdatePhoneNumberModalSubTitle updatePhoneNumber>
          Enter a 4-digit code that we've sent you on +44 *** *** 4567 in SMS
        </StyledUpdatePhoneNumberModalSubTitle>
        <StyledUpdatePhoneNumberModalForm>
          <Box display="flex" justifyContent="center" marginTop={rem("16px")}>
            <StyledOtpInput
              value={otp}
              onChange={handleOtpFieldChange}
              numInputs={4}
              isInputNum
              shouldAutoFocus
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            marginTop={rem("32px")}
          >
            <LinkButton sx={{ marginBottom: rem("44px") }} variant="text">
              Resend Code
            </LinkButton>
            <ContainedButton
              sx={{ width: "100%" }}
              onClick={props.handlePhoneNumberChange}
              disabled={otp.length !== 4}
            >
              Confirm
            </ContainedButton>
          </Box>
        </StyledUpdatePhoneNumberModalForm>
      </StyledUpdatePhoneNumberModal>
    </Modal>
  )
}

export default UpdatePhoneNumberModal
