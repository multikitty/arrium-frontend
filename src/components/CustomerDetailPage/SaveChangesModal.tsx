import React from "react"
import { IconButton, Modal } from "@mui/material"
import { rem } from "polished"
import {
  StyledAddCountryModal as StyledDeleteConfirmationModal,
  StyledAddCountryModalCloseIconContainer as StyledDeleteConfirmationModalCloseIconContainer,
  StyledAddCountryModalFormActions as StyledDeleteConfirmationModalFormActions,
  StyledAddCountryModalTitle as StyledDeleteConfirmationModalTitle,
  StyledDeleteConfirmationModalSubTitle,
} from "../SettingsPage/SettingsPage.styled"
import CloseIcon from "@mui/icons-material/Close"
import { ContainedButton, OutlinedButton } from "../commons/Button"

interface IProps {
  open: boolean
  handleClose: () => void
  handleSave: () => void
}

const DeleteConfirmationModal = (props: IProps) => {
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <StyledDeleteConfirmationModal>
        <StyledDeleteConfirmationModalCloseIconContainer>
          <IconButton size="small" onClick={props.handleClose}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </StyledDeleteConfirmationModalCloseIconContainer>
        <StyledDeleteConfirmationModalTitle deleteConfirmation>
          Save changes?
        </StyledDeleteConfirmationModalTitle>
        <StyledDeleteConfirmationModalSubTitle saveChanges>
          Your unsaved changes will be lost. <br /> Do you want to save changes
          before leaving this page?
        </StyledDeleteConfirmationModalSubTitle>
        <StyledDeleteConfirmationModalFormActions>
          <ContainedButton
            sx={{ width: "100%", marginBottom: rem("16px") }}
            onClick={props.handleSave}
          >
            Save
          </ContainedButton>
          <OutlinedButton
            grey
            sx={{ width: "100%" }}
            onClick={props.handleClose}
          >
            Cancel
          </OutlinedButton>
        </StyledDeleteConfirmationModalFormActions>
      </StyledDeleteConfirmationModal>
    </Modal>
  )
}

export default DeleteConfirmationModal
