import React, { useState } from "react"
import {
  Box,
  IconButton,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { capitalCase } from "change-case"
import { rem } from "polished"

import {
  StyledAddCountryModal as StyledAddRegionModal,
  StyledAddCountryModalCloseIconContainer as StyledAddRegionModalCloseIconContainer,
  StyledAddCountryModalForm as StyledAddRegionModalForm,
  StyledAddCountryModalFormActions as StyledAddRegionModalFormActions,
  StyledAddCountryModalFormField as StyledAddRegionModalFormField,
  StyledAddCountryModalTitle as StyledAddRegionModalTitle,
} from "./SettingsPage.styled"
import {
  IAddRegionVariables,
  ICountryListDataItem,
} from "@/lib/interfaces/locations"
import { ModalProps } from "./SettingsPage.types"
import { ContainedButton, OutlinedButton } from "@/components/commons/Button"
import { StyledFieldLabel } from "@/components/commons/uiComponents"

interface IProps extends ModalProps {
  handleAdd: (variables: IAddRegionVariables) => void
  countries: ICountryListDataItem[]
}

const AddRegionModal = (props: IProps) => {
  const [region, setRegion] = useState("")
  const [regionCode, setRegionCode] = useState("")
  const [regionID, setRegionID] = useState("")
  const [country, setCountry] = useState<ICountryListDataItem | "">("")

  const handleRegionField: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    setRegion(e.target.value)
  }

  const handleRegionCodeField: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    setRegionCode(e.target.value)
  }

  const handleRegionIDField: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    setRegionID(e.target.value)
  }

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
      {capitalCase(country.country)}
    </MenuItem>
  ))

  const isSaveDisabled = !country || !region || !regionCode || !regionID
  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSaveDisabled) return
    props.handleAdd({
      countryCode: country.countryCode.toUpperCase(),
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
        <StyledAddRegionModalForm onSubmit={handleSave}>
          <Box display="flex" flexDirection="column" mb={rem("16px")}>
            <StyledFieldLabel $isHidden={!country}>Country</StyledFieldLabel>
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
            <StyledFieldLabel $isHidden={!region}>Region</StyledFieldLabel>
            <StyledAddRegionModalFormField
              placeholder={`Region name`}
              value={region}
              onChange={handleRegionField}
            />
          </Box>
          <Box display="flex" flexDirection="column" mb={rem("16px")}>
            <StyledFieldLabel $isHidden={!regionCode}>
              Region code
            </StyledFieldLabel>
            <StyledAddRegionModalFormField
              placeholder={`Region code`}
              value={regionCode}
              onChange={handleRegionCodeField}
            />
          </Box>
          <Box display="flex" flexDirection="column" mb={rem("44px")}>
            <StyledFieldLabel $isHidden={!regionID}>Region ID</StyledFieldLabel>
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
              type="submit"
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
