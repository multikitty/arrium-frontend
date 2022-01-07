import React from "react"
import { Box, IconButton, Modal } from "@mui/material"
import { rem } from "polished"
import {
  StyledAddCountryModal,
  StyledAddCountryModalCloseIconContainer,
  StyledAddCountryModalForm,
  StyledAddCountryModalFormActions,
  StyledAddCountryModalFormField,
  StyledAddCountryModalTitle,
} from "./SettingsPage.styled"
import CloseIcon from "@mui/icons-material/Close"
import { ContainedButton, OutlinedButton } from "../commons/Button"

interface IProps {
  open: boolean
  handleClose: () => void
  handleAdd: () => void
}

const AddCountryModal = (props: IProps) => {
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <StyledAddCountryModal>
        <StyledAddCountryModalCloseIconContainer>
          <IconButton size="small" onClick={props.handleClose}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </StyledAddCountryModalCloseIconContainer>
        <StyledAddCountryModalTitle>Add new Country</StyledAddCountryModalTitle>
        <StyledAddCountryModalForm>
          <Box display="flex" mb={rem("44px")}>
            <StyledAddCountryModalFormField placeholder={`Country name`} />
          </Box>
          <StyledAddCountryModalFormActions>
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
          </StyledAddCountryModalFormActions>
        </StyledAddCountryModalForm>
      </StyledAddCountryModal>
    </Modal>
  )
}

export default AddCountryModal
