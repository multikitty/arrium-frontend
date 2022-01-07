import React from "react"
import { Box, IconButton, Modal } from "@mui/material"
import { rem } from "polished"
import {
  StyledAddCountryModal as StyledAddOSVersionModal,
  StyledAddCountryModalCloseIconContainer as StyledAddOSVersionModalCloseIconContainer,
  StyledAddCountryModalForm as StyledAddOSVersionModalForm,
  StyledAddCountryModalFormActions as StyledAddOSVersionModalFormActions,
  StyledAddCountryModalFormField as StyledAddOSVersionModalFormField,
  StyledAddCountryModalTitle as StyledAddOSVersionModalTitle,
} from "./SettingsPage.styled"
import CloseIcon from "@mui/icons-material/Close"
import { ContainedButton, OutlinedButton } from "../commons/Button"

interface IProps {
  open: boolean
  handleClose: () => void
  handleAdd: () => void
}

const AddOSVersionModal = (props: IProps) => {
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <StyledAddOSVersionModal>
        <StyledAddOSVersionModalCloseIconContainer>
          <IconButton size="small" onClick={props.handleClose}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </StyledAddOSVersionModalCloseIconContainer>
        <StyledAddOSVersionModalTitle>
          Add new OS Version
        </StyledAddOSVersionModalTitle>
        <StyledAddOSVersionModalForm>
          <Box display="flex" mb={rem("44px")}>
            <StyledAddOSVersionModalFormField placeholder={`OS Version`} />
          </Box>
          <StyledAddOSVersionModalFormActions>
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
          </StyledAddOSVersionModalFormActions>
        </StyledAddOSVersionModalForm>
      </StyledAddOSVersionModal>
    </Modal>
  )
}

export default AddOSVersionModal
