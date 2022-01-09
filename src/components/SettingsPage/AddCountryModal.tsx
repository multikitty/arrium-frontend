import React, { useState } from "react"
import { Box, IconButton, Modal } from "@mui/material"
import { rem } from "polished"
import {
  StyledAddCountryModal,
  StyledAddCountryModalCloseIconContainer,
  StyledAddCountryModalForm,
  StyledAddCountryModalFormActions,
  StyledAddCountryModalFormField,
  StyledAddCountryModalFormHelperText,
  StyledAddCountryModalTitle,
} from "./SettingsPage.styled"
import CloseIcon from "@mui/icons-material/Close"
import { ContainedButton, OutlinedButton } from "../commons/Button"
import { SettingsItem } from "./LocationsTab"

interface IProps {
  open: boolean
  handleClose: () => void
  handleAdd: (name: string) => void
  countries: SettingsItem[]
}

const AddCountryModal = (props: IProps) => {
  const [country, setCountry] = useState("")

  const handleCountryField:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = e => setCountry(e.target.value)

  const handleSave = () => {
    props.handleAdd(country)
    props.handleClose()
  }

  const countryError = !!props.countries.find(item => item.name === country)

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
          <Box display="flex" flexDirection="column" mb={rem("44px")}>
            <StyledAddCountryModalFormField
              autoFocus
              placeholder={`Country name`}
              value={country}
              onChange={handleCountryField}
              error={countryError}
            />
            {countryError && (
              <StyledAddCountryModalFormHelperText>
                Country already exists
              </StyledAddCountryModalFormHelperText>
            )}
          </Box>
          <StyledAddCountryModalFormActions>
            <ContainedButton
              sx={{ width: "100%", marginBottom: rem("16px") }}
              disabled={!country || countryError}
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
