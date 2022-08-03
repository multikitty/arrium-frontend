import React from "react"
import { Box, Modal } from "@mui/material"
import { rem } from "polished"
import {
  StyledAddCountryModal as StyledSelectCountryModal,
  StyledAddCountryModalFormActions as StyledSelectCountryModalFormActions,
  StyledAddCountryModalTitle as StyledSelectCountryModalTitle,
} from "../SettingsPage/SettingsPage.styled"
import { ContainedButton } from "../commons/Button"
import CountrySelect from "../CountrySelect"
import { CountryData } from "@/utils/getCountryData"

interface IProps {
  open: boolean
  handleClose: () => void
  handleSave: (country: string) => void
}

const SelectCountryModal = (props: IProps) => {
  const [selectedCountry, setSelectedCountry] =
    React.useState<CountryData | null>(null)

  return (
    <Modal open={props.open}>
      <StyledSelectCountryModal>
        <StyledSelectCountryModalTitle deleteConfirmation selectCountry>
          Select Your Country
        </StyledSelectCountryModalTitle>
        <Box display="flex" my={2}>
          <CountrySelect
            autoFocus
            openOnFocus
            fullWidth
            filterCountries={["gb", "us", "es", "de"]}
            country={selectedCountry}
            setCountry={setSelectedCountry}
          />
        </Box>
        <StyledSelectCountryModalFormActions>
          <ContainedButton
            disabled={!selectedCountry}
            sx={{ width: "100%", marginBottom: rem("16px") }}
            onClick={() =>
              props.handleSave(
                selectedCountry?.countryShortName.toLowerCase() || ""
              )
            }
          >
            Save
          </ContainedButton>
        </StyledSelectCountryModalFormActions>
      </StyledSelectCountryModal>
    </Modal>
  )
}

export default SelectCountryModal
