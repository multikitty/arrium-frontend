import React from "react"
import { Box, IconButton, Modal } from "@mui/material"
import { rem } from "polished"
import {
  StyledAddCountryModal as StyledAddBlockTypeModal,
  StyledAddCountryModalCloseIconContainer as StyledAddBlockTypeModalCloseIconContainer,
  StyledAddCountryModalForm as StyledAddBlockTypeModalForm,
  StyledAddCountryModalFormActions as StyledAddBlockTypeModalFormActions,
  StyledAddCountryModalFormField as StyledAddBlockTypeModalFormField,
  StyledAddCountryModalTitle as StyledAddBlockTypeModalTitle,
} from "./SettingsPage.styled"
import CloseIcon from "@mui/icons-material/Close"
import { ContainedButton, OutlinedButton } from "../commons/Button"

interface IProps {
  open: boolean
  handleClose: () => void
  handleAdd: () => void
}

const AddBlockTypeModal = (props: IProps) => {
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <StyledAddBlockTypeModal>
        <StyledAddBlockTypeModalCloseIconContainer>
          <IconButton size="small" onClick={props.handleClose}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </StyledAddBlockTypeModalCloseIconContainer>
        <StyledAddBlockTypeModalTitle>
          Add new Block Type
        </StyledAddBlockTypeModalTitle>
        <StyledAddBlockTypeModalForm>
          <Box display="flex" mb={rem("44px")}>
            <StyledAddBlockTypeModalFormField placeholder={`Block Type`} />
          </Box>
          <StyledAddBlockTypeModalFormActions>
            <ContainedButton sx={{ width: "100%", marginBottom: rem("16px") }}>
              Save
            </ContainedButton>
            <OutlinedButton
              grey
              sx={{ width: "100%" }}
              onClick={props.handleClose}
            >
              Cancel
            </OutlinedButton>
          </StyledAddBlockTypeModalFormActions>
        </StyledAddBlockTypeModalForm>
      </StyledAddBlockTypeModal>
    </Modal>
  )
}

export default AddBlockTypeModal
