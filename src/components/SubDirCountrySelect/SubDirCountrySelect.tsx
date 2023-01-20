import React, { useCallback } from "react"
import { countriesToSelectList } from "@/constants/common"
import { getFilteredCountries } from "@/utils/getCountryData"
import {
  Box,
  BoxProps,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import { capitalCase } from "change-case"
import DropDownArrow from "@/assets/icons/country_selection_pop_up_drop_down_arrow.inline.svg"
import { StyledAccountInformatiomTabContentField as StyledInputField } from "../AddCustomerPage/AddCustomerPage.styled"

type Size = "small" | "large"

interface SubDirCountrySelectProps {
  country: string | null
  onChange: (e: SelectChangeEvent<string | null>) => void
  boxProps?: BoxProps
  isCountryNotListed?: boolean
  isCountryCode?: boolean
  openUpwards?: boolean
  size?: Size
}

const SubDirCountrySelect: React.FC<SubDirCountrySelectProps> = ({
  country,
  onChange,
  boxProps,
  isCountryNotListed = false,
  isCountryCode = true,
  openUpwards = false,
  size = "large",
}) => {
  const renderCountryOptions = useCallback(
    () =>
      getFilteredCountries(countriesToSelectList).map(country => (
        <MenuItem
          key={country.countryShortName}
          value={country.countryShortName}
        >
          <Box
            display="flex"
            alignItems="center"
            component="span"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          >
            <img
              loading="lazy"
              width={size === "large" ? "40" : "32"}
              src={`https://flagcdn.com/w40/${country.countryShortName.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${country.countryShortName.toLowerCase()}.png 2x`}
              alt=""
            />
            {size === "large"
              ? capitalCase(country.countryName)
              : country.countryShortName.toUpperCase()}{" "}
            {isCountryCode
              ? `(${country.countryShortName.toUpperCase()})`
              : null}
          </Box>
        </MenuItem>
      )),
    [size]
  )

  return (
    <Box {...boxProps}>
      <Select
        autoFocus
        displayEmpty
        onChange={onChange}
        value={country}
        input={<StyledInputField />}
        MenuProps={
          openUpwards
            ? {
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
            }
            : undefined
        }
        IconComponent={props => (
          <i className={`material-icons ${props.className}`}>
            <DropDownArrow />
          </i>
        )}
      >
        {renderCountryOptions()}
        {isCountryNotListed ? (
          <MenuItem value="">Country Not Listed</MenuItem>
        ) : null}
      </Select>
    </Box>
  )
}

export default SubDirCountrySelect
