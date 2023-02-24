import * as React from "react"
import TextField from "@mui/material/TextField"
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete"

import getCountryData, { RegionData } from "@/utils/getCountryData"

interface RegionAutocompleteProps
  extends Partial<AutocompleteProps<RegionData, false, false, false>> {
  country: string | undefined
  region: RegionData | null
  setRegion:
    | React.Dispatch<React.SetStateAction<RegionData | null | undefined>>
    | ((region: RegionData | null) => void)
  required?: boolean
  placeholder?: string
}

const RegionAutocomplete: React.FC<RegionAutocompleteProps> = ({
  country,
  region,
  setRegion,
  required,
  placeholder = "Select Region",
  ...props
}) => {
  return (
    <Autocomplete
      id="region-select--autocomplete"
      isOptionEqualToValue={(option, value) =>
        option.shortCode === value.shortCode
      }
      getOptionLabel={option => option.name}
      options={country ? getCountryData()[country].regions : []}
      value={region}
      onChange={(_: any, newValue: RegionData | null) => {
        setRegion(newValue)
      }}
      renderInput={params => (
        <TextField
          {...params}
          required={Boolean(required)}
          InputProps={{
            ...params.InputProps,
            placeholder,
            endAdornment: (
              <React.Fragment>{params.InputProps.endAdornment}</React.Fragment>
            ),
          }}
        />
      )}
      {...props}
    />
  )
}

export default RegionAutocomplete
