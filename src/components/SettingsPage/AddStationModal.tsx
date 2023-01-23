import React from "react"
import {
  Box,
  IconButton,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import { rem } from "polished"
import CloseIcon from "@mui/icons-material/Close"
import { capitalCase } from "change-case"

import {
  StyledAddCountryModal as StyledAddStationModal,
  StyledAddCountryModalCloseIconContainer as StyledAddStationModalCloseIconContainer,
  StyledAddCountryModalForm as StyledAddStationModalForm,
  StyledAddCountryModalFormActions as StyledAddStationModalFormActions,
  StyledAddCountryModalFormField as StyledAddStationModalFormField,
  StyledAddCountryModalTitle as StyledAddStationModalTitle,
} from "./SettingsPage.styled"
import {
  AddStationVariables,
  CountryListDataItem,
  RegionListDataItem,
} from "@/lib/interfaces/locations"
import { StationTypeListDataItem } from "@/lib/interfaces/stationTypes"
import { useStationTypeList } from "@/agent/stationTypes"
import { ModalProps } from "./SettingsPage.types"
import { ContainedButton, OutlinedButton } from "../commons/Button"
import { StyledFieldLabel } from "../commons/uiComponents"
import { StationFieldName } from "./LocationsTab"

interface AddStationModalProps extends ModalProps {
  handleAdd: (variables: AddStationVariables) => void
  handleNext: () => void
  handleClearFields: () => void
  countries: CountryListDataItem[]
  regions: RegionListDataItem[]
  stationData: Required<AddStationVariables>
  handleStationField: (name: StationFieldName, value: string) => void
}

const AddStationModal = (props: AddStationModalProps) => {
  const { data: stationTypeList } = useStationTypeList()

  const handleStationField: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    props.handleStationField("stationName", e.target.value)
  }

  const handleStationCodeField: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    props.handleStationField("stationCode", e.target.value)
  }

  const handleStationIdField: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    props.handleStationField("stationId", e.target.value)
  }

  const countrySelectItemJSX = props.countries.map(country => (
    <MenuItem key={country.sk} value={country.countryCode}>
      {capitalCase(country.country)}
    </MenuItem>
  ))

  const handleCountryFieldChange = (
    e: SelectChangeEvent<CountryListDataItem["country"]>
  ) => {
    const selectedCountry = e.target.value
    props.handleStationField("countryCode", selectedCountry)
  }

  const regionSelectItemJSX = props.regions.map(region => (
    <MenuItem key={region.sk} value={region.regionName}>
      {region.regionName}
    </MenuItem>
  ))

  const handleRegionFieldChange = (
    e: SelectChangeEvent<RegionListDataItem["regionName"]>
  ) => {
    const selectedRegion = e.target.value
    const regionToSet = props.regions.find(r => r.regionName === selectedRegion)
    props.handleStationField("regionName", regionToSet!.regionName)
    props.handleStationField("regionId", regionToSet!.regionID)
    props.handleStationField("regionCode", regionToSet!.regionCode)
  }

  const stationTypeSelectItemJSX = (stationTypeList?.data?.Items || []).map(
    stationType => (
      <MenuItem key={stationType.sk} value={stationType.stationType}>
        {stationType.stationType}
      </MenuItem>
    )
  )

  const handleStationTypeFieldChange = (
    e: SelectChangeEvent<StationTypeListDataItem["stationType"]>
  ) => {
    if (!stationTypeList?.data?.Items?.length) return
    const selectedStationType = e.target.value
    props.handleStationField("stationType", selectedStationType)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (
      !props.stationData.countryCode ||
      !props.stationData.regionCode ||
      !props.stationData.stationName ||
      !props.stationData.stationType
    )
      return
    props.handleNext()
  }

  const handleSaveAndClose = async () => {
    if (
      !props.stationData.countryCode ||
      !props.stationData.regionCode ||
      !props.stationData.stationName ||
      !props.stationData.stationType
    )
      return
    await props.handleAdd({
      countryCode: props.stationData.countryCode,
      regionCode: props.stationData.regionCode,
      regionId: props.stationData.regionId,
      regionName: props.stationData.regionName,
      stationCode: props.stationData.stationCode,
      stationId: props.stationData.stationId,
      stationName: props.stationData.stationName,
      stationType: props.stationData.stationType,
    })
    handleClose()
  }

  const handleClose = () => {
    props.handleClearFields()
    props.handleClose()
  }

  const isSubmitDisabled =
    !props.stationData.stationName ||
    !props.stationData.countryCode ||
    !props.stationData.regionName ||
    !props.stationData.stationType

  return (
    <Modal sx={{ overflow: "scroll" }} open={props.open} onClose={handleClose}>
      <StyledAddStationModal>
        <StyledAddStationModalCloseIconContainer>
          <IconButton size="small" onClick={handleClose}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </StyledAddStationModalCloseIconContainer>
        <StyledAddStationModalTitle>Add new Station</StyledAddStationModalTitle>
        <StyledAddStationModalForm onSubmit={onSubmit}>
          <Box display="flex" flexDirection="column" mb={rem("16px")}>
            <StyledFieldLabel $isHidden={!props.stationData.countryCode}>
              Country
            </StyledFieldLabel>
            <Select
              displayEmpty
              autoFocus
              value={props.stationData.countryCode}
              onChange={handleCountryFieldChange}
              input={<StyledAddStationModalFormField />}
            >
              <MenuItem disabled value="">
                Choose country
              </MenuItem>
              {countrySelectItemJSX}
            </Select>
          </Box>
          <Box display="flex" flexDirection="column" mb={rem("16px")}>
            <StyledFieldLabel $isHidden={!props.stationData.regionName}>
              Region
            </StyledFieldLabel>
            <Select
              displayEmpty
              value={props.stationData.regionName}
              onChange={handleRegionFieldChange}
              input={<StyledAddStationModalFormField />}
            >
              <MenuItem disabled value="">
                Choose region
              </MenuItem>
              {regionSelectItemJSX}
            </Select>
          </Box>
          <Box display="flex" flexDirection="column" mb={rem("16px")}>
            <StyledFieldLabel $isHidden={!props.stationData.stationName}>
              Station name
            </StyledFieldLabel>
            <StyledAddStationModalFormField
              placeholder={`Station name`}
              value={props.stationData.stationName}
              onChange={handleStationField}
            />
          </Box>
          <Box display="flex" flexDirection="column" mb={rem("16px")}>
            <StyledFieldLabel $isHidden={!props.stationData.stationCode}>
              Station code
            </StyledFieldLabel>
            <StyledAddStationModalFormField
              placeholder={`Station code`}
              value={props.stationData.stationCode}
              onChange={handleStationCodeField}
            />
          </Box>
          <Box display="flex" flexDirection="column" mb={rem("16px")}>
            <StyledFieldLabel $isHidden={!props.stationData.stationId}>
              Station ID
            </StyledFieldLabel>
            <StyledAddStationModalFormField
              placeholder={`Station ID`}
              value={props.stationData.stationId}
              onChange={handleStationIdField}
            />
          </Box>
          <Box display="flex" flexDirection="column" mb={rem("44px")}>
            <StyledFieldLabel $isHidden={!props.stationData.stationType}>
              Station type
            </StyledFieldLabel>
            <Select
              displayEmpty
              value={props.stationData.stationType}
              onChange={handleStationTypeFieldChange}
              input={<StyledAddStationModalFormField />}
            >
              <MenuItem disabled value="">
                Station type
              </MenuItem>
              {stationTypeSelectItemJSX}
            </Select>
          </Box>
          <StyledAddStationModalFormActions>
            <ContainedButton
              sx={{ width: "100%", marginBottom: rem("16px") }}
              disabled={isSubmitDisabled}
              type="submit"
            >
              Next
            </ContainedButton>
            <ContainedButton
              sx={{ width: "100%", marginBottom: rem("16px") }}
              disabled={isSubmitDisabled}
              onClick={handleSaveAndClose}
            >
              Save and Close
            </ContainedButton>
            <OutlinedButton grey sx={{ width: "100%" }} onClick={handleClose}>
              Cancel
            </OutlinedButton>
          </StyledAddStationModalFormActions>
        </StyledAddStationModalForm>
      </StyledAddStationModal>
    </Modal>
  )
}

export default AddStationModal
