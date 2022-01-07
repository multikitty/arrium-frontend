import React from "react"
import { Box, IconButton, MenuItem, Modal, Select } from "@mui/material"
import { rem } from "polished"
import {
  StyledAddCountryModal as StyledAddRegionModal,
  StyledAddCountryModalCloseIconContainer as StyledAddRegionModalCloseIconContainer,
  StyledAddCountryModalForm as StyledAddRegionModalForm,
  StyledAddCountryModalFormActions as StyledAddRegionModalFormActions,
  StyledAddCountryModalFormField as StyledAddRegionModalFormField,
  StyledAddCountryModalTitle as StyledAddRegionModalTitle,
} from "./SettingsPage.styled"
import CloseIcon from "@mui/icons-material/Close"
import { ContainedButton, OutlinedButton } from "../commons/Button"

interface IProps {
  open: boolean
  handleClose: () => void
  handleAdd: () => void
}

const AddRegionModal = (props: IProps) => {
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <StyledAddRegionModal>
        <StyledAddRegionModalCloseIconContainer>
          <IconButton size="small" onClick={props.handleClose}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </StyledAddRegionModalCloseIconContainer>
        <StyledAddRegionModalTitle>Add new Region</StyledAddRegionModalTitle>
        <StyledAddRegionModalForm>
          <Box display="flex" mb={rem("16px")}>
            <Select
              defaultValue="Great Britain"
              input={<StyledAddRegionModalFormField />}
            >
              <MenuItem value="Great Britain">Great Britain</MenuItem>
              <MenuItem value="Germany">Germany</MenuItem>
              <MenuItem value="Italy">Italy</MenuItem>
            </Select>
          </Box>
          <Box display="flex" mb={rem("16px")}>
            <StyledAddRegionModalFormField placeholder={`London`} />
          </Box>
          <Box display="flex" mb={rem("44px")}>
            <StyledAddRegionModalFormField placeholder={`LND123`} />
          </Box>
          <StyledAddRegionModalFormActions>
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
          </StyledAddRegionModalFormActions>
        </StyledAddRegionModalForm>
      </StyledAddRegionModal>
    </Modal>
  )
}

export default AddRegionModal
