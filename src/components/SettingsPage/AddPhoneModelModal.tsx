import React from "react"
import { Box, IconButton, Modal } from "@mui/material"
import { rem } from "polished"
import {
  StyledAddCountryModal as StyledAddPhoneModelModal,
  StyledAddCountryModalCloseIconContainer as StyledAddPhoneModelModalCloseIconContainer,
  StyledAddCountryModalForm as StyledAddPhoneModelModalForm,
  StyledAddCountryModalFormActions as StyledAddPhoneModelModalFormActions,
  StyledAddCountryModalFormField as StyledAddPhoneModelModalFormField,
  StyledAddCountryModalTitle as StyledAddPhoneModelModalTitle,
} from "./SettingsPage.styled"
import CloseIcon from "@mui/icons-material/Close"
import { ContainedButton, OutlinedButton } from "../commons/Button"

interface IProps {
  open: boolean
  handleClose: () => void
  handleAdd: () => void
}

const AddPhoneModelModal = (props: IProps) => {
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <StyledAddPhoneModelModal>
        <StyledAddPhoneModelModalCloseIconContainer>
          <IconButton size="small" onClick={props.handleClose}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </StyledAddPhoneModelModalCloseIconContainer>
        <StyledAddPhoneModelModalTitle>
          Add new Phone Model
        </StyledAddPhoneModelModalTitle>
        <StyledAddPhoneModelModalForm>
          <Box display="flex" mb={rem("16px")}>
            <StyledAddPhoneModelModalFormField
              placeholder={`Phone Model name`}
            />
          </Box>
          <Box display="flex" mb={rem("44px")}>
            <StyledAddPhoneModelModalFormField placeholder={`Phone Model ID`} />
          </Box>
          <StyledAddPhoneModelModalFormActions>
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
          </StyledAddPhoneModelModalFormActions>
        </StyledAddPhoneModelModalForm>
      </StyledAddPhoneModelModal>
    </Modal>
  )
}

export default AddPhoneModelModal
