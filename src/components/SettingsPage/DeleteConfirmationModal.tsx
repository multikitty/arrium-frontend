import React from "react"
import { IconButton, Modal } from "@mui/material"
import { rem } from "polished"
import {
  StyledAddCountryModal as StyledDeleteConfirmationModal,
  StyledAddCountryModalCloseIconContainer as StyledDeleteConfirmationModalCloseIconContainer,
  StyledAddCountryModalFormActions as StyledDeleteConfirmationModalFormActions,
  StyledAddCountryModalTitle as StyledDeleteConfirmationModalTitle,
  StyledDeleteConfirmationModalSubTitle,
} from "./SettingsPage.styled"
import CloseIcon from "@mui/icons-material/Close"
import { ContainedButton, OutlinedButton } from "../commons/Button"
import pluralize from "pluralize"
import { ModalProps } from "./SettingsPage.types"

interface IProps extends ModalProps {
  type: string
  name: string
  handleDelete: () => void
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
          Delete {props.type}?
        </StyledDeleteConfirmationModalTitle>
        <StyledDeleteConfirmationModalSubTitle>
          Are you sure you want to delete <strong>{props.name}</strong> from
          your {pluralize(props.type)}?
        </StyledDeleteConfirmationModalSubTitle>
        <StyledDeleteConfirmationModalFormActions>
          <ContainedButton
            error
            autoFocus
            sx={{ width: "100%", marginBottom: rem("16px") }}
            onClick={props.handleDelete}
          >
            Delete
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
