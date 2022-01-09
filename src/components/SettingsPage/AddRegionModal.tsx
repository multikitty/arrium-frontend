import React, { useState } from "react"
import { Box, IconButton, MenuItem, Modal, Select } from "@mui/material"
import { rem } from "polished"
import {
  StyledAddCountryModal as StyledAddRegionModal,
  StyledAddCountryModalCloseIconContainer as StyledAddRegionModalCloseIconContainer,
  StyledAddCountryModalForm as StyledAddRegionModalForm,
  StyledAddCountryModalFormActions as StyledAddRegionModalFormActions,
  StyledAddCountryModalFormField as StyledAddRegionModalFormField,
  StyledAddCountryModalFormHelperText as StyledAddRegionModalFormHelperText,
  StyledAddCountryModalTitle as StyledAddRegionModalTitle,
} from "./SettingsPage.styled"
import CloseIcon from "@mui/icons-material/Close"
import { ContainedButton, OutlinedButton } from "../commons/Button"
import { SettingsItem } from "./LocationsTab"

interface IProps {
  open: boolean
  handleClose: () => void
  handleAdd: (name: string) => void
  countries: SettingsItem[]
  regions: SettingsItem[]
}

const AddRegionModal = (props: IProps) => {
  const [region, setRegion] = useState("")

  const handleRegionField:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = e => setRegion(e.target.value)

  const regionError = !!props.regions.find(item => item.name === region)

  const countrySelectItemJSX = props.countries.map(country => (
    <MenuItem key={country.id} value={country.name}>
      {country.name}
    </MenuItem>
  ))

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
              autoFocus
              defaultValue="none"
              input={<StyledAddRegionModalFormField />}
            >
              <MenuItem disabled value="none">
                Choose Country
              </MenuItem>
              {countrySelectItemJSX}
            </Select>
          </Box>
          <Box display="flex" flexDirection="column" mb={rem("16px")}>
            <StyledAddRegionModalFormField
              placeholder={`Region name`}
              value={region}
              onChange={handleRegionField}
              error={regionError}
            />
            {regionError && (
              <StyledAddRegionModalFormHelperText>
                Region name already exists
              </StyledAddRegionModalFormHelperText>
            )}
          </Box>
          <Box display="flex" mb={rem("44px")}>
            <StyledAddRegionModalFormField placeholder={`Region ID`} />
          </Box>
          <StyledAddRegionModalFormActions>
            <ContainedButton
              sx={{ width: "100%", marginBottom: rem("16px") }}
              disabled={!region || regionError}
            >
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
