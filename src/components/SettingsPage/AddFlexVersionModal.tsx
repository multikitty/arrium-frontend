import React from "react"
import { Box, IconButton, Modal } from "@mui/material"
import { rem } from "polished"
import {
  StyledAddCountryModal as StyledAddFlexVersionModal,
  StyledAddCountryModalCloseIconContainer as StyledAddFlexVersionModalCloseIconContainer,
  StyledAddCountryModalForm as StyledAddFlexVersionModalForm,
  StyledAddCountryModalFormActions as StyledAddFlexVersionModalFormActions,
  StyledAddCountryModalFormField as StyledAddFlexVersionModalFormField,
  StyledAddCountryModalTitle as StyledAddFlexVersionModalTitle,
} from "./SettingsPage.styled"
import CloseIcon from "@mui/icons-material/Close"
import { ContainedButton, OutlinedButton } from "../commons/Button"

interface IProps {
  open: boolean
  handleClose: () => void
  handleAdd: () => void
}

const AddFlexVersionModal = (props: IProps) => {
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <StyledAddFlexVersionModal>
        <StyledAddFlexVersionModalCloseIconContainer>
          <IconButton size="small" onClick={props.handleClose}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </StyledAddFlexVersionModalCloseIconContainer>
        <StyledAddFlexVersionModalTitle>
          Add new Amazon Flex Version
        </StyledAddFlexVersionModalTitle>
        <StyledAddFlexVersionModalForm>
          <Box display="flex" mb={rem("44px")}>
            <StyledAddFlexVersionModalFormField
              placeholder={`Amazon Flex Version`}
            />
          </Box>
          <StyledAddFlexVersionModalFormActions>
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
          </StyledAddFlexVersionModalFormActions>
        </StyledAddFlexVersionModalForm>
      </StyledAddFlexVersionModal>
    </Modal>
  )
}

export default AddFlexVersionModal
