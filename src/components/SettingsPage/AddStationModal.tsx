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
  IAddStationVariables,
  ICountryListDataItem,
  IRegionListDataItem,
} from "@/lib/interfaces/locations"
import { IStationTypeListDataItem } from "@/lib/interfaces/stationTypes"
import { useStationTypeList } from "@/agent/stationTypes"
import { ModalProps } from "./SettingsPage.types"
import { ContainedButton, OutlinedButton } from "../commons/Button"
import { StyledFieldLabel } from "../commons/uiComponents"

interface IProps extends ModalProps {
  handleAdd: (variables: IAddStationVariables) => void
  countries: ICountryListDataItem[]
  regions: IRegionListDataItem[]
}

const AddStationModal = (props: IProps) => {
  const [station, setStation] = useState("")
  const [stationCode, setStationCode] = useState("")
  const [stationId, setStationId] = useState("")
  const [country, setCountry] = useState<ICountryListDataItem | "">("")
  const [region, setRegion] = useState<IRegionListDataItem | "">("")
  const [stationType, setStationType] = useState<IStationTypeListDataItem | "">(
    ""
  )
  const { data: stationTypeList } = useStationTypeList()

  const handleStationField: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    setStation(e.target.value)
  }

  const handleStationCodeField: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    setStationCode(e.target.value)
  }

  const handleStationIdField: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    setStationId(e.target.value)
  }

  const countrySelectItemJSX = props.countries.map(country => (
    <MenuItem key={country.sk} value={country.country}>
      {capitalCase(country.country)}
    </MenuItem>
  ))

  const handleCountryFieldChange = (
    e: SelectChangeEvent<ICountryListDataItem["country"]>
  ) => {
    const selectedCountry = e.target.value
    const countryToSet = props.countries.find(
      c => c.country === selectedCountry
    )
    setCountry(countryToSet!)
  }

  const regionSelectItemJSX = props.regions.map(region => (
    <MenuItem key={region.sk} value={region.regionName}>
      {region.regionName}
    </MenuItem>
  ))

  const handleRegionFieldChange = (
    e: SelectChangeEvent<IRegionListDataItem["regionName"]>
  ) => {
    const selectedRegion = e.target.value
    const regionToSet = props.regions.find(r => r.regionName === selectedRegion)
    setRegion(regionToSet!)
  }

  const stationTypeSelectItemJSX = (stationTypeList?.data?.Items || []).map(
    stationType => (
      <MenuItem key={stationType.sk} value={stationType.stationType}>
        {stationType.stationType}
      </MenuItem>
    )
  )

  const handleStationTypeFieldChange = (
    e: SelectChangeEvent<IStationTypeListDataItem["stationType"]>
  ) => {
    if (!stationTypeList?.data?.Items?.length) return
    const selectedStationType = e.target.value
    const stationTypeToSet = (stationTypeList?.data?.Items || []).find(
      s => s.stationType === selectedStationType
    )
    setStationType(stationTypeToSet!)
  }

  const resetFields = () => {
    setStation("")
    setStationCode("")
    setStationId("")
    setCountry("")
    setRegion("")
    setStationType("")
  }

  const handleSaveAndClose = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!country || !region || !station || !stationType) return
    await props.handleAdd({
      countryCode: country.countryCode,
      regionCode: region.regionCode,
      regionId: region.regionID,
      regionName: region.regionName,
      stationCode,
      stationId,
      stationName: station,
      stationType: stationType.stationType,
    })
    props.handleClose()
  }

  const handleSaveAndCreateAnother = async () => {
    if (!country || !region || !station || !stationType) return
    await props.handleAdd({
      countryCode: country.countryCode,
      regionCode: region.regionCode,
      regionId: region.regionID,
      regionName: region.regionName,
      stationCode,
      stationId,
      stationName: station,
      stationType: stationType.stationType,
    })
    resetFields()
  }

  const isSubmitDisabled = !station || !country || !region || !stationType

  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <StyledAddStationModal>
        <StyledAddStationModalCloseIconContainer>
          <IconButton size="small" onClick={props.handleClose}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </StyledAddStationModalCloseIconContainer>
        <StyledAddStationModalTitle>Add new Station</StyledAddStationModalTitle>
        <StyledAddStationModalForm onSubmit={handleSaveAndClose}>
          <Box display="flex" flexDirection="column" mb={rem("16px")}>
            <StyledFieldLabel $isHidden={!country}>Country</StyledFieldLabel>
            <Select
              displayEmpty
              autoFocus
              value={country ? country.country : ""}
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
            <StyledFieldLabel $isHidden={!region}>Region</StyledFieldLabel>
            <Select
              displayEmpty
              value={region ? region.regionName : ""}
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
            <StyledFieldLabel $isHidden={!station}>
              Station name
            </StyledFieldLabel>
            <StyledAddStationModalFormField
              placeholder={`Station name`}
              value={station}
              onChange={handleStationField}
            />
          </Box>
          <Box display="flex" flexDirection="column" mb={rem("16px")}>
            <StyledFieldLabel $isHidden={!stationCode}>
              Station code
            </StyledFieldLabel>
            <StyledAddStationModalFormField
              placeholder={`Station code`}
              value={stationCode}
              onChange={handleStationCodeField}
            />
          </Box>
          <Box display="flex" flexDirection="column" mb={rem("16px")}>
            <StyledFieldLabel $isHidden={!stationId}>
              Station ID
            </StyledFieldLabel>
            <StyledAddStationModalFormField
              placeholder={`Station ID`}
              value={stationId}
              onChange={handleStationIdField}
            />
          </Box>
          <Box display="flex" flexDirection="column" mb={rem("44px")}>
            <StyledFieldLabel $isHidden={!stationType}>
              Station type
            </StyledFieldLabel>
            <Select
              displayEmpty
              value={stationType ? stationType.stationType : ""}
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
              Save and close
            </ContainedButton>
            <ContainedButton
              sx={{ width: "100%", marginBottom: rem("16px") }}
              disabled={isSubmitDisabled}
              onClick={handleSaveAndCreateAnother}
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
