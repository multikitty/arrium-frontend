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
import maskPhoneNumber from "@/utils/maskPhoneNumber"

interface IProps {
  open: boolean
  handleClose: () => void
  handlePhoneNumberChange: () => void
  newPhoneNumber: string
}

const UpdatePhoneNumberModal = (props: IProps) => {
  const [otp, setOtp] = useState("")

  const handleOtpFieldChange = (otpValue: string) => setOtp(otpValue)
  const handleConfirm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    props.handlePhoneNumberChange()
    props.handleClose()
  }

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
          Enter a 4-digit code that we've sent you on{" "}
          {maskPhoneNumber(props.newPhoneNumber)} in SMS
        </StyledUpdatePhoneNumberModalSubTitle>
        <StyledUpdatePhoneNumberModalForm onSubmit={handleConfirm}>
          <Box display="flex" justifyContent="center" marginTop={rem("16px")}>
            <StyledOtpInput
              isInputNum
              shouldAutoFocus
              value={otp}
              onChange={handleOtpFieldChange}
              numInputs={4}
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
              disabled={otp.length !== 4}
              type="submit"
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
