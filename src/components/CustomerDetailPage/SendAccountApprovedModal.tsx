import React from "react"
import { IconButton, Modal } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

import {
  StyledAddCountryModalCloseIconContainer as StyledSendAccountApprovedEmailCloseIconContainer,
  StyledAddCountryModalFormActions as StyledSendAccountApprovedEmailFormActions,
  StyledAddCountryModalTitle as StyledSendAccountApprovedEmailTitle,
  StyledDeleteConfirmationModalSubTitle,
} from "@/components/SettingsPage/SettingsPage.styled"
import { ContainedButton, OutlinedButton } from "@/components/commons/Button"
import { StyledCreateReferralModal as StyledSendAccountApprovedEmailModal } from "../ReferralsPage/ReferralsPage.styled"

interface SendAccountApprovedEmailModalProps {
  open: boolean
  handleClose: () => void
  handleSendAccountApprovedEmail: () => void
}

const SendAccountApprovedEmailModal = (
  props: SendAccountApprovedEmailModalProps
) => {
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <StyledSendAccountApprovedEmailModal>
        <StyledSendAccountApprovedEmailCloseIconContainer>
          <IconButton size="small" onClick={props.handleClose}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </StyledSendAccountApprovedEmailCloseIconContainer>
        <StyledSendAccountApprovedEmailTitle deleteConfirmation>
          Send Account approved email
        </StyledSendAccountApprovedEmailTitle>
        <StyledDeleteConfirmationModalSubTitle>
          <strong>"The account approved"</strong> email will trigger to the
          customer. Are you sure you want to send this email?
        </StyledDeleteConfirmationModalSubTitle>
        <StyledSendAccountApprovedEmailFormActions>
          <ContainedButton
            autoFocus
            sx={{ width: "100%", marginBottom: "16px" }}
            onClick={props.handleSendAccountApprovedEmail}
          >
            Yes
          </ContainedButton>
          <OutlinedButton
            grey
            sx={{ width: "100%" }}
            onClick={props.handleClose}
          >
            Cancel
          </OutlinedButton>
        </StyledSendAccountApprovedEmailFormActions>
      </StyledSendAccountApprovedEmailModal>
    </Modal>
  )
}

export default SendAccountApprovedEmailModal
