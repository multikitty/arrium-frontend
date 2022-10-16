import React from "react"
import { Box, MenuItem, Modal, Select } from "@mui/material"
import { rem } from "polished"
import {
  StyledSelectCountryModal,
  StyledSelectCountryModalBrandLogo,
  StyledSelectCountryModalBrandLogoContainer,
  StyledSelectCountryModalFormActions,
  StyledSelectCountryModalSubTitle,
  StyledSelectCountryModalTitle,
} from "./SelectCountryModal.styled"
import { ContainedButton } from "../commons/Button"
import { navigate } from "gatsby-link"
import { localStorageUtils } from "@/utils"
import { getFilteredCountries } from "@/utils/getCountryData"
import { countriesToSelectList } from "@/constants/common"
import { StyledAccountInformatiomTabContentField } from "../AddCustomerPage/AddCustomerPage.styled"
import brandLogo from "@/assets/icons/arrium_logo.svg"

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
        <Box component="span" sx={{ "& > img": { mr: 2, flexShrink: 0 } }}>
          <img
            loading="lazy"
            width="40"
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
        <StyledSelectCountryModalBrandLogoContainer>
          <StyledSelectCountryModalBrandLogo src={brandLogo} />
        </StyledSelectCountryModalBrandLogoContainer>
        <StyledSelectCountryModalTitle deleteConfirmation selectCountry>
          Select your country
        </StyledSelectCountryModalTitle>
        <StyledSelectCountryModalSubTitle>
          We couldn't identify which country you're visiting us from. Please
          choose your country in order to serve you better
        </StyledSelectCountryModalSubTitle>
        <Box display="flex" mb={rem("40px")} mx="auto" maxWidth={rem("408px")}>
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
            Continue
          </ContainedButton>
        </StyledSelectCountryModalFormActions>
      </StyledSelectCountryModal>
    </Modal>
  )
}

export default SelectCountryModal
