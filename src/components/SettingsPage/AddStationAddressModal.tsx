import React from "react"
import { Box, IconButton, Modal } from "@mui/material"
import { rem } from "polished"
import CloseIcon from "@mui/icons-material/Close"

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
import { ModalProps } from "./SettingsPage.types"
import { ContainedButton, OutlinedButton } from "../commons/Button"
import { StyledFieldLabel } from "../commons/uiComponents"
import { StationFieldName } from "./LocationsTab"

interface AddStationAddressModalProps extends ModalProps {
  handleAdd: (variables: AddStationVariables) => void
  handleClearFields: () => void
  handleGoBack: () => void
  countries: CountryListDataItem[]
  regions: RegionListDataItem[]
  stationData: Required<AddStationVariables>
  handleStationField: (name: StationFieldName, value: string) => void
}

const AddStationAddressModal = (props: AddStationAddressModalProps) => {
  const handleAddressLine1Field: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    props.handleStationField("address1", e.target.value)
  }

  const handleAddressLine2Field: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    props.handleStationField("address2", e.target.value)
  }

  const handleAddressLine3Field: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    props.handleStationField("address3", e.target.value)
  }

  const handleCityField: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    props.handleStationField("city", e.target.value)
  }

  const handleStateField: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    props.handleStationField("state", e.target.value)
  }

  const handlePostalCodeField: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    props.handleStationField("postalCode", e.target.value)
  }

  const handleLongitudeField: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    props.handleStationField("longitude", e.target.value)
  }

  const handleLatitudeField: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    props.handleStationField("latitude", e.target.value)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await props.handleAdd({
      countryCode: props.stationData.countryCode,
      regionCode: props.stationData.regionCode,
      regionId: props.stationData.regionId,
      regionName: props.stationData.regionName,
      stationCode: props.stationData.stationCode,
      stationId: props.stationData.stationId,
      stationName: props.stationData.stationName,
      stationType: props.stationData.stationType,
      address1: props.stationData.address1,
      address2: props.stationData.address2,
      address3: props.stationData.address3,
      city: props.stationData.city,
      state: props.stationData.state,
      postalCode: props.stationData.postalCode,
      longitude: props.stationData.longitude,
      latitude: props.stationData.latitude,
    })
    handleClose()
  }

  const handleSaveAndCreateAnother = async () => {
    await props.handleAdd({
      countryCode: props.stationData.countryCode,
      regionCode: props.stationData.regionCode,
      regionId: props.stationData.regionId,
      regionName: props.stationData.regionName,
      stationCode: props.stationData.stationCode,
      stationId: props.stationData.stationId,
      stationName: props.stationData.stationName,
      stationType: props.stationData.stationType,
      address1: props.stationData.address1,
      address2: props.stationData.address2,
      address3: props.stationData.address3,
      city: props.stationData.city,
      state: props.stationData.state,
      postalCode: props.stationData.postalCode,
      longitude: props.stationData.longitude,
      latitude: props.stationData.latitude,
    })
    props.handleClearFields()
    props.handleGoBack()
  }

  const handleClose = () => {
    props.handleClearFields()
    props.handleClose()
  }

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
            <StyledFieldLabel $isHidden={!props.stationData.address1}>
              Address Line 1
            </StyledFieldLabel>
            <StyledAddStationModalFormField
              placeholder={`Address Line 1`}
              value={props.stationData.address1}
              onChange={handleAddressLine1Field}
            />
          </Box>
          <Box display="flex" flexDirection="column" mb={rem("16px")}>
            <StyledFieldLabel $isHidden={!props.stationData.address2}>
              Address Line 2
            </StyledFieldLabel>
            <StyledAddStationModalFormField
              placeholder={`Address Line 2`}
              value={props.stationData.address2}
              onChange={handleAddressLine2Field}
            />
          </Box>
          <Box display="flex" flexDirection="column" mb={rem("16px")}>
            <StyledFieldLabel $isHidden={!props.stationData.address3}>
              Address Line 3
            </StyledFieldLabel>
            <StyledAddStationModalFormField
              placeholder={`Address Line 3`}
              value={props.stationData.address3}
              onChange={handleAddressLine3Field}
            />
          </Box>
          <Box display="flex" flexDirection="column" mb={rem("16px")}>
            <StyledFieldLabel $isHidden={!props.stationData.city}>
              City
            </StyledFieldLabel>
            <StyledAddStationModalFormField
              placeholder={`City`}
              value={props.stationData.city}
              onChange={handleCityField}
            />
          </Box>
          <Box display="flex" flexDirection="column" mb={rem("16px")}>
            <StyledFieldLabel $isHidden={!props.stationData.state}>
              State
            </StyledFieldLabel>
            <StyledAddStationModalFormField
              placeholder={`State`}
              value={props.stationData.state}
              onChange={handleStateField}
            />
          </Box>
          <Box display="flex" flexDirection="column" mb={rem("16px")}>
            <StyledFieldLabel $isHidden={!props.stationData.postalCode}>
              Postal Code
            </StyledFieldLabel>
            <StyledAddStationModalFormField
              placeholder={`Postal Code`}
              value={props.stationData.postalCode}
              onChange={handlePostalCodeField}
            />
          </Box>
          <Box display="flex" flexDirection="column" mb={rem("16px")}>
            <StyledFieldLabel $isHidden={!props.stationData.longitude}>
              Longitude
            </StyledFieldLabel>
            <StyledAddStationModalFormField
              placeholder={`Longitude`}
              value={props.stationData.longitude}
              onChange={handleLongitudeField}
            />
          </Box>
          <Box display="flex" flexDirection="column" mb={rem("44px")}>
            <StyledFieldLabel $isHidden={!props.stationData.latitude}>
              Latitude
            </StyledFieldLabel>
            <StyledAddStationModalFormField
              placeholder={`Latitude`}
              value={props.stationData.latitude}
              onChange={handleLatitudeField}
            />
          </Box>
          <StyledAddStationModalFormActions>
            <ContainedButton
              sx={{ width: "100%", marginBottom: rem("16px") }}
              type="submit"
            >
              Save and Close
            </ContainedButton>
            <ContainedButton
              sx={{ width: "100%", marginBottom: rem("16px") }}
              onClick={handleSaveAndCreateAnother}
            >
              Save and Create Another
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

export default AddStationAddressModal
