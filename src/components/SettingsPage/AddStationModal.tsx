import React, { useState } from "react"
import { Box, IconButton, MenuItem, Modal, Select } from "@mui/material"
import { rem } from "polished"
import {
  StyledAddCountryModal as StyledAddStationModal,
  StyledAddCountryModalCloseIconContainer as StyledAddStationModalCloseIconContainer,
  StyledAddCountryModalForm as StyledAddStationModalForm,
  StyledAddCountryModalFormActions as StyledAddStationModalFormActions,
  StyledAddCountryModalFormField as StyledAddStationModalFormField,
  StyledAddCountryModalFormHelperText as StyledAddStationModalFormHelperText,
  StyledAddCountryModalTitle as StyledAddStationModalTitle,
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
  stations: SettingsItem[]
}

const AddStationModal = (props: IProps) => {
  const [station, setStation] = useState("")

  const handleStationField:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = e => setStation(e.target.value)

  const stationError = !!props.stations.find(item => item.name === station)

  const countrySelectItemJSX = props.countries.map(country => (
    <MenuItem key={country.id} value={country.name}>
      {country.name}
    </MenuItem>
  ))

  const regionSelectItemJSX = props.regions.map(region => (
    <MenuItem key={region.id} value={region.name}>
      {region.name}
    </MenuItem>
  ))

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
              autoFocus
              defaultValue="none"
              input={<StyledAddStationModalFormField />}
            >
              <MenuItem disabled value="none">
                Choose country
              </MenuItem>
              {countrySelectItemJSX}
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
              {regionSelectItemJSX}
            </Select>
          </Box>
          <Box display="flex" flexDirection="column" mb={rem("16px")}>
            <StyledAddStationModalFormField
              placeholder={`Station name`}
              value={station}
              onChange={handleStationField}
              error={stationError}
            />
            {stationError && (
              <StyledAddStationModalFormHelperText>
                Station name already exists
              </StyledAddStationModalFormHelperText>
            )}
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
            <ContainedButton
              sx={{ width: "100%", marginBottom: rem("16px") }}
              disabled={!station || stationError}
            >
              Save and close
            </ContainedButton>
            <ContainedButton
              sx={{ width: "100%", marginBottom: rem("16px") }}
              disabled={!station || stationError}
            >
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
