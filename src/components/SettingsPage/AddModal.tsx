import React from "react"
import { Box, IconButton, MenuItem, Modal, Select } from "@mui/material"
import { rem } from "polished"
import {
  StyledAddModal,
  StyledAddModalCloseIconContainer,
  StyledAddModalForm,
  StyledAddModalFormAction,
  StyledAddModalFormField,
  StyledAddModalTitle,
} from "./SettingsPage.styled"
import CloseIcon from "@mui/icons-material/Close"
import { ContainedButton } from "../commons/Button"

interface IProps {
  open: boolean
  handleClose: () => void
  // handleAdd
}

const AddModal = (props: IProps) => {
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <StyledAddModal>
        <StyledAddModalCloseIconContainer>
          <IconButton size="small" onClick={props.handleClose}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </StyledAddModalCloseIconContainer>
        <StyledAddModalTitle>Create new referral codes</StyledAddModalTitle>
        <StyledAddModalForm>
          <Box display="flex" mb={rem("16px")}>
            <Select defaultValue="none" input={<StyledAddModalFormField />}>
              <MenuItem disabled value="none">
                Choose region
              </MenuItem>
            </Select>
          </Box>
          <Box display="flex" mb={rem("16px")}>
            <Select defaultValue="none" input={<StyledAddModalFormField />}>
              <MenuItem disabled value="none">
                Choose station
              </MenuItem>
            </Select>
          </Box>
          <Box display="flex" mb={rem("16px")}>
            <StyledAddModalFormField placeholder="Number of referrals" />
          </Box>
          <Box display="flex" mb={rem("44px")}>
            <Select defaultValue="none" input={<StyledAddModalFormField />}>
              <MenuItem disabled value="none">
                Assign to
              </MenuItem>
            </Select>
          </Box>
          <StyledAddModalFormAction>
            <ContainedButton sx={{ width: "100%" }}>Save</ContainedButton>
          </StyledAddModalFormAction>
        </StyledAddModalForm>
      </StyledAddModal>
    </Modal>
  )
}

export default AddModal
