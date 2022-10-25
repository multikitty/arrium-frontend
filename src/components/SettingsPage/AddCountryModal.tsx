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
import { ContainedButton, OutlinedButton } from "../commons/Button"
import { CountryData } from "@/utils/getCountryData"
import CountrySelect from "../CountrySelect"
import { IAddCountryVariables } from "@/lib/interfaces/locations"
import { ModalProps } from "./SettingsPage.types"

interface IProps extends ModalProps {
  handleAdd: (variables: IAddCountryVariables) => void
}

const AddCountryModal = (props: IProps) => {
  const [country, setCountry] = useState<CountryData | null>(null)
  const [countryCode, setCountryCode] =
    useState<CountryData["countryShortName"]>("")

  const handleCountryField = (c: CountryData | null) => {
    setCountry(c)
    setCountryCode(c?.countryShortName || "")
  }

  const handleSave = () => {
    if (!country) return
    props.handleAdd({
      country: country.countryName,
      countryCode: country.countryShortName,
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
        <StyledAddCountryModalForm>
          <Box display="flex" flexDirection="column" mb={rem("24px")}>
            <CountrySelect
              autoFocus
              country={country}
              setCountry={handleCountryField}
            />
          </Box>
          <Box display="flex" flexDirection="column" mb={rem("44px")}>
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
              onClick={handleSave}
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
