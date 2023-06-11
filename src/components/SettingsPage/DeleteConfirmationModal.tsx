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

interface DeleteConfirmationModalProps extends ModalProps {
  type: string
  name: string
  boldName?: boolean
  handleDelete: () => void
}

const DeleteConfirmationModal = (props: DeleteConfirmationModalProps) => {
  const isNameBold = props.boldName ?? true

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      sx={{ display: "flex", alignItems: "center" }}
    >
      <StyledDeleteConfirmationModal
        sx={{ borderRadius: "20px", paddingBottom: "80px" }}
      >
        <StyledDeleteConfirmationModalCloseIconContainer>
          <IconButton size="small" onClick={props.handleClose}>
            <CloseIcon sx={{ fontSize: 24 }} />
          </IconButton>
        </StyledDeleteConfirmationModalCloseIconContainer>
        <StyledDeleteConfirmationModalTitle deleteConfirmation selectCountry>
          Delete {props.type}?
        </StyledDeleteConfirmationModalTitle>
        <StyledDeleteConfirmationModalSubTitle>
          <span>Are you sure you want to delete</span>
          {isNameBold ? (
            <strong> {props.name} </strong>
          ) : (
            <span> {props.name} </span>
          )}
          <span>from your {pluralize(props.type)}?</span>
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
