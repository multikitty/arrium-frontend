import * as React from "react"
import TextField from "@mui/material/TextField"
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete"
import CircularProgress from "@mui/material/CircularProgress"
import getCountryData, { CountryData } from "@/utils/getCountryData"
import { Box } from "@mui/material"

interface CountryAutocompleteProps
  extends Partial<AutocompleteProps<CountryData, false, false, false>> {
  country: CountryData | null
  setCountry:
    | React.Dispatch<React.SetStateAction<CountryData | null | undefined>>
    | ((country: CountryData | null) => void)
  required?: boolean
  placeholder?: string
  autoFocus?: boolean
  include?: string[]
}

const CountryAutocomplete: React.FC<CountryAutocompleteProps> = ({
  country,
  setCountry,
  required,
  placeholder = "Select Country",
  autoFocus,
  include,
  ...props
}) => {
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState<CountryData[]>([])
  const loading = open && options.length === 0

  React.useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    ;(async () => {
      if (active) {
        setOptions([...Object.values(getCountryData())])
      }
    })()

    return () => {
      active = false
    }
  }, [loading])

  React.useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return (
    <Autocomplete
      id="country-select--autocomplete"
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      isOptionEqualToValue={(option, value) =>
        option.countryShortName === value.countryShortName
      }
      getOptionLabel={option => option.countryName}
      options={
        !!include
          ? options
              .filter(opt =>
                include.find(
                  inc =>
                    inc.toLowerCase() === opt.countryShortName.toLowerCase()
                )
              )
              .sort((a, b) => (a.countryName > b.countryName ? -1 : 1))
          : options.sort((a, b) => (a.countryName > b.countryName ? -1 : 1))
      }
      filterOptions={(options, state) =>
        options.filter(countryName =>
          state.inputValue.toLowerCase()
            ? countryName.countryName
                .toLowerCase()
                .includes(state.inputValue.toLowerCase())
            : true
        )
      }
      loading={loading}
      value={country}
      onChange={(_: any, newValue: CountryData | null) => {
        setCountry(newValue)
      }}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w160/${option.countryShortName.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w160/${option.countryShortName.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.countryName} ({option.countryShortName})
        </Box>
      )}
      renderInput={params => (
        <TextField
          {...params}
          autoFocus={!!autoFocus}
          required={Boolean(required)}
          InputProps={{
            ...params.InputProps,
            placeholder,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      {...props}
    />
  )
}

export default CountryAutocomplete