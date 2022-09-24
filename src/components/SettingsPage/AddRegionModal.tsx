import React, { useState } from "react"
import {
  Box,
  IconButton,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
} from "@mui/material"
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
import {
  IAddRegionVariables,
  ICountryListDataItem,
} from "@/lib/interfaces/locations"

interface IProps {
  open: boolean
  handleClose: () => void
  handleAdd: (variables: IAddRegionVariables) => void
  countries: ICountryListDataItem[]
}

const AddRegionModal = (props: IProps) => {
  const [region, setRegion] = useState("")
  const [regionCode, setRegionCode] = useState("")
  const [regionID, setRegionID] = useState("")
  const [country, setCountry] = useState<ICountryListDataItem | "">("")

  const handleRegionField:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = e => setRegion(e.target.value)

  const handleRegionCodeField:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = e => setRegionCode(e.target.value)

  const handleRegionIDField:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = e => setRegionID(e.target.value)

  const handleCountryFieldChange = (
    e: SelectChangeEvent<ICountryListDataItem["country"]>
  ) => {
    const selectedCountry = e.target.value
    const countryToSet = props.countries.find(
      c => c.country === selectedCountry
    )
    setCountry(countryToSet!)
  }

  const countrySelectItemJSX = props.countries.map(country => (
    <MenuItem key={country.sk} value={country.country}>
      {country.country}
    </MenuItem>
  ))

  const isSaveDisabled = !country || !region || !regionCode || !regionID
  const handleSave = () => {
    if (isSaveDisabled) return
    props.handleAdd({
      countryCode: country.countryCode,
      regionCode,
      regionId: regionID,
      regionName: region,
    })
  }

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
              displayEmpty
              autoFocus
              value={country ? country.country : ""}
              onChange={handleCountryFieldChange}
              input={<StyledAddRegionModalFormField />}
            >
              <MenuItem disabled value="">
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
            />
          </Box>
          <Box display="flex" flexDirection="column" mb={rem("16px")}>
            <StyledAddRegionModalFormField
              placeholder={`Region code`}
              value={regionCode}
              onChange={handleRegionCodeField}
            />
          </Box>
          <Box display="flex" mb={rem("44px")}>
            <StyledAddRegionModalFormField
              placeholder={`Region ID`}
              value={regionID}
              onChange={handleRegionIDField}
            />
          </Box>
          <StyledAddRegionModalFormActions>
            <ContainedButton
              sx={{ width: "100%", marginBottom: rem("16px") }}
              disabled={isSaveDisabled}
              onClick={handleSave}
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
