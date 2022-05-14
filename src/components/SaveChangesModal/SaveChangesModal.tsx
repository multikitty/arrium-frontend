import React from "react"
import { IconButton, Modal } from "@mui/material"
import { rem } from "polished"
import {
  StyledAddCountryModal as StyledSaveChangesModal,
  StyledAddCountryModalCloseIconContainer as StyledSaveChangesModalCloseIconContainer,
  StyledAddCountryModalFormActions as StyledSaveChangesModalFormActions,
  StyledAddCountryModalTitle as StyledSaveChangesModalTitle,
  StyledDeleteConfirmationModalSubTitle,
} from "../SettingsPage/SettingsPage.styled"
import CloseIcon from "@mui/icons-material/Close"
import { ContainedButton, OutlinedButton } from "../commons/Button"

interface IProps {
  open: boolean
  handleClose: () => void
  handleSave: () => void
}

const SaveChangesModal = (props: IProps) => {
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <StyledSaveChangesModal>
        <StyledSaveChangesModalCloseIconContainer>
          <IconButton size="small" onClick={props.handleClose}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </StyledSaveChangesModalCloseIconContainer>
        <StyledSaveChangesModalTitle deleteConfirmation>
          Save changes?
        </StyledSaveChangesModalTitle>
        <StyledDeleteConfirmationModalSubTitle saveChanges>
          Your unsaved changes will be lost. <br /> Do you want to save changes
          before leaving this page?
        </StyledDeleteConfirmationModalSubTitle>
        <StyledSaveChangesModalFormActions>
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
        </StyledSaveChangesModalFormActions>
      </StyledSaveChangesModal>
    </Modal>
  )
}

export default SaveChangesModal
