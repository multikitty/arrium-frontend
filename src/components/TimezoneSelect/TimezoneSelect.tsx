import * as React from "react"
import TextField, { TextFieldProps } from "@mui/material/TextField"
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete"
import CircularProgress from "@mui/material/CircularProgress"
import { Box } from "@mui/material"
import { useAllTimezonesList } from "@/agent/timezone"

interface IProps
  extends Partial<AutocompleteProps<string, false, false, false>> {
  timezone: string | null
  setTimezone:
    | React.Dispatch<React.SetStateAction<string | null>>
    | ((timezone: string | null) => void)
  required?: boolean
  placeholder?: string
  autoFocus?: boolean
  textFieldVariant?: TextFieldProps["variant"]
}

const TimezoneSelect: React.FC<IProps> = ({
  timezone,
  setTimezone,
  required,
  placeholder = "Select Timezone",
  autoFocus,
  textFieldVariant = "outlined",
  ...props
}) => {
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState<string[]>([])
  const { data: timezoneList } = useAllTimezonesList()
  const loading = open && options.length === 0

  React.useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    ;(async () => {
      if (active && !!timezoneList?.data.zones.length) {
        setOptions(timezoneList.data.zones.map(zone => zone.zoneName))
      }
    })()

    return () => {
      active = false
    }
  }, [loading, timezoneList])

  React.useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return (
    <Autocomplete
      id="timezone-select--autocomplete"
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      filterOptions={(options, state) =>
        options.filter(zoneName =>
          state.inputValue.toLowerCase()
            ? zoneName.toLowerCase().includes(state.inputValue.toLowerCase())
            : true
        )
      }
      options={options}
      loading={loading}
      value={timezone}
      onChange={(_: any, newValue: string | null) => {
        setTimezone(newValue)
      }}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          {option}
        </Box>
      )}
      renderInput={params => (
        <TextField
          {...params}
          variant={textFieldVariant}
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

export default TimezoneSelect
