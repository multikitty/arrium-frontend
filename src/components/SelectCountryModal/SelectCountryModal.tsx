import React from "react"
import { Box, MenuItem, Modal, Select } from "@mui/material"
import { rem } from "polished"
import {
  StyledAddCountryModal as StyledSelectCountryModal,
  StyledAddCountryModalFormActions as StyledSelectCountryModalFormActions,
  StyledAddCountryModalTitle as StyledSelectCountryModalTitle,
} from "../SettingsPage/SettingsPage.styled"
import { ContainedButton } from "../commons/Button"
import { navigate } from "gatsby-link"
import { localStorageUtils } from "@/utils"
import getCountryData, {
  CountryData,
  getFilteredCountries,
} from "@/utils/getCountryData"
import { countriesToSelectList } from "@/constants/common"
import { StyledAccountInformatiomTabContentField } from "../AddCustomerPage/AddCustomerPage.styled"

interface IProps {
  open: boolean
  handleClose: () => void
  handleSave: () => void
}

const SelectCountryModal = (props: IProps) => {
  const [selectedCountry, setSelectedCountry] = React.useState<string | null>(
    "GB"
  )

  const handleSave = () => {
    if (selectedCountry === "") return props.handleSave()
    localStorageUtils.setLocalStorage(
      "country",
      selectedCountry?.toLowerCase() || "gb"
    )
    navigate(`/${selectedCountry?.toLowerCase() || "gb"}/en`)
  }

  const renderCountryOptions = () =>
    getFilteredCountries(countriesToSelectList).map(country => (
      <MenuItem key={country.countryShortName} value={country.countryShortName}>
        <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }}>
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${country.countryShortName.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${country.countryShortName.toLowerCase()}.png 2x`}
            alt=""
          />
          {country.countryName} ({country.countryShortName})
        </Box>
      </MenuItem>
    ))

  return (
    <Modal open={props.open}>
      <StyledSelectCountryModal>
        <StyledSelectCountryModalTitle deleteConfirmation selectCountry>
          We couldn't identify which country you're visiting us from. Choose
          your country from the list below
        </StyledSelectCountryModalTitle>
        <Box display="flex" my={2}>
          <Select
            autoFocus
            displayEmpty
            onChange={(e: any) => {
              setSelectedCountry(e.target.value)
            }}
            value={selectedCountry}
            input={<StyledAccountInformatiomTabContentField large />}
          >
            {renderCountryOptions()}
            <MenuItem value="">Country Not Listed</MenuItem>
          </Select>
        </Box>
        <StyledSelectCountryModalFormActions>
          <ContainedButton
            disabled={selectedCountry === null}
            sx={{ width: "100%", marginBottom: rem("16px") }}
            onClick={handleSave}
          >
            Save
          </ContainedButton>
        </StyledSelectCountryModalFormActions>
      </StyledSelectCountryModal>
    </Modal>
  )
}

export default SelectCountryModal
