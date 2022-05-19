import * as React from "react"
import TextField from "@mui/material/TextField"
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete"
import getCountryData, { RegionData } from "@/utils/getCountryData"

interface IProps
  extends Partial<AutocompleteProps<RegionData, false, false, false>> {
  country: string | undefined
  region: RegionData | null
  setRegion:
    | React.Dispatch<React.SetStateAction<RegionData | null | undefined>>
    | ((region: RegionData | null) => void)
  required?: boolean
  label?: string
}

const RegionSelect: React.FC<IProps> = ({
  country,
  region,
  setRegion,
  required,
  label = "Select Region",
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
          label={label}
          InputProps={{
            ...params.InputProps,
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

export default RegionSelect
