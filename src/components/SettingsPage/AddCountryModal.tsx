import React, { useState } from "react"
import { Box, IconButton, Modal } from "@mui/material"
import { rem } from "polished"
import {
  StyledAddCountryModal,
  StyledAddCountryModalCloseIconContainer,
  StyledAddCountryModalForm,
  StyledAddCountryModalFormActions,
  StyledAddCountryModalFormField,
  StyledAddCountryModalTitle,
} from "./SettingsPage.styled"
import CloseIcon from "@mui/icons-material/Close"
import { ContainedButton, OutlinedButton } from "@/components/commons/Button"
import { CountryData } from "@/utils/getCountryData"
import CountryAutocomplete from "@/components/CountryAutocomplete"
import { AddCountryVariables } from "@/lib/interfaces/locations"
import { ModalProps } from "./SettingsPage.types"
import { StyledFieldLabel } from "@/components/commons/uiComponents"

interface AddCountryModalProps extends ModalProps {
  handleAdd: (variables: AddCountryVariables) => void
}

const AddCountryModal = (props: AddCountryModalProps) => {
  const [country, setCountry] = useState<CountryData | null>(null)
  const [countryCode, setCountryCode] =
    useState<CountryData["countryShortName"]>("")

  const handleCountryField = (c: CountryData | null) => {
    setCountry(c)
    setCountryCode(c?.countryShortName || "")
  }

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!country) return
    props.handleAdd({
      country: country.countryName,
      countryCode: country.countryShortName.toUpperCase(),
    })
  }

  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <StyledAddCountryModal>
        <StyledAddCountryModalCloseIconContainer>
          <IconButton size="small" onClick={props.handleClose}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </StyledAddCountryModalCloseIconContainer>
        <StyledAddCountryModalTitle>Add new Country</StyledAddCountryModalTitle>
        <StyledAddCountryModalForm onSubmit={handleSave}>
          <Box display="flex" flexDirection="column" mb={rem("24px")}>
            <StyledFieldLabel $isHidden={!country}>Country</StyledFieldLabel>
            <CountryAutocomplete
              autoFocus
              placeholder="Country*"
              country={country}
              setCountry={handleCountryField}
            />
          </Box>
          <Box display="flex" flexDirection="column" mb={rem("44px")}>
            <StyledFieldLabel $isHidden={!countryCode}>
              Country code
            </StyledFieldLabel>
            <StyledAddCountryModalFormField
              readOnly
              disabled
              value={countryCode}
              placeholder="Country Code"
            />
          </Box>
          <StyledAddCountryModalFormActions>
            <ContainedButton
              sx={{ width: "100%", marginBottom: rem("16px") }}
              disabled={!country}
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
          </StyledAddCountryModalFormActions>
        </StyledAddCountryModalForm>
      </StyledAddCountryModal>
    </Modal>
  )
}

export default AddCountryModal
