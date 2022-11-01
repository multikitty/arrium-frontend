import React from "react"
import { IconButton, Modal } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { rem } from "polished"

import {
  StyledAddCountryModal as StyledDeleteConfirmationModal,
  StyledAddCountryModalCloseIconContainer as StyledDeleteConfirmationModalCloseIconContainer,
  StyledAddCountryModalFormActions as StyledDeleteConfirmationModalFormActions,
  StyledAddCountryModalTitle as StyledDeleteConfirmationModalTitle,
  StyledDeleteConfirmationModalSubTitle,
} from "@/components/SettingsPage/SettingsPage.styled"
import { ContainedButton, OutlinedButton } from "@/components/commons/Button"

interface IProps {
  open: boolean
  handleClose: () => void
  handleCloseAccount: () => void
}

const CloseAccountModal = (props: IProps) => {
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <StyledDeleteConfirmationModal>
        <StyledDeleteConfirmationModalCloseIconContainer>
          <IconButton size="small" onClick={props.handleClose}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </StyledDeleteConfirmationModalCloseIconContainer>
        <StyledDeleteConfirmationModalTitle deleteConfirmation>
          Close Account
        </StyledDeleteConfirmationModalTitle>
        <StyledDeleteConfirmationModalSubTitle>
          Your account will be closed immediately and you will no longer have
          access to Arrium.
          <br />
          <br />
          You will not be able to re-register with Arrium within 3 months of
          account closure.
          <br />
          <br />
          Would you like to proceed with closing your account?
        </StyledDeleteConfirmationModalSubTitle>
        <StyledDeleteConfirmationModalFormActions>
          <ContainedButton
            error
            autoFocus
            sx={{ width: "100%", marginBottom: rem("16px") }}
            onClick={props.handleCloseAccount}
          >
            Yes, close my account
          </ContainedButton>
          <OutlinedButton
            grey
            sx={{ width: "100%" }}
            onClick={props.handleClose}
          >
            No, keep my account
          </OutlinedButton>
        </StyledDeleteConfirmationModalFormActions>
      </StyledDeleteConfirmationModal>
    </Modal>
  )
}

export default CloseAccountModal
