import React from "react"
import { Box, IconButton, MenuItem, Modal, Select } from "@mui/material"
import { rem } from "polished"
import {
  StyledAddCountryModal as StyledAddStationModal,
  StyledAddCountryModalCloseIconContainer as StyledAddStationModalCloseIconContainer,
  StyledAddCountryModalForm as StyledAddStationModalForm,
  StyledAddCountryModalFormActions as StyledAddStationModalFormActions,
  StyledAddCountryModalFormField as StyledAddStationModalFormField,
  StyledAddCountryModalTitle as StyledAddStationModalTitle,
} from "./SettingsPage.styled"
import CloseIcon from "@mui/icons-material/Close"
import { ContainedButton, OutlinedButton } from "../commons/Button"

interface IProps {
  open: boolean
  handleClose: () => void
  handleAdd: () => void
}

const AddStationModal = (props: IProps) => {
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <StyledAddStationModal>
        <StyledAddStationModalCloseIconContainer>
          <IconButton size="small" onClick={props.handleClose}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </StyledAddStationModalCloseIconContainer>
        <StyledAddStationModalTitle>Add new Station</StyledAddStationModalTitle>
        <StyledAddStationModalForm>
          <Box display="flex" mb={rem("16px")}>
            <Select
              defaultValue="none"
              input={<StyledAddStationModalFormField />}
            >
              <MenuItem disabled value="none">
                Choose country
              </MenuItem>
              <MenuItem value="Great Britain">Great Britain</MenuItem>
              <MenuItem value="Germany">Germany</MenuItem>
              <MenuItem value="Italy">Italy</MenuItem>
            </Select>
          </Box>
          <Box display="flex" mb={rem("16px")}>
            <Select
              defaultValue="none"
              input={<StyledAddStationModalFormField />}
            >
              <MenuItem disabled value="none">
                Choose region
              </MenuItem>
            </Select>
          </Box>
          <Box display="flex" mb={rem("16px")}>
            <StyledAddStationModalFormField placeholder={`Station name`} />
          </Box>
          <Box display="flex" mb={rem("16px")}>
            <StyledAddStationModalFormField placeholder={`Station code`} />
          </Box>
          <Box display="flex" mb={rem("16px")}>
            <Select
              defaultValue="none"
              input={<StyledAddStationModalFormField />}
            >
              <MenuItem disabled value="none">
                Station type
              </MenuItem>
            </Select>
          </Box>
          <Box display="flex" mb={rem("44px")}>
            <StyledAddStationModalFormField placeholder={`Station ID`} />
          </Box>
          <StyledAddStationModalFormActions>
            <ContainedButton sx={{ width: "100%", marginBottom: rem("16px") }}>
              Save and close
            </ContainedButton>
            <ContainedButton sx={{ width: "100%", marginBottom: rem("16px") }}>
              Save and create another
            </ContainedButton>
            <OutlinedButton
              grey
              sx={{ width: "100%" }}
              onClick={props.handleClose}
            >
              Cancel
            </OutlinedButton>
          </StyledAddStationModalFormActions>
        </StyledAddStationModalForm>
      </StyledAddStationModal>
    </Modal>
  )
}

export default AddStationModal
