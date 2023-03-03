import * as React from "react"
import TextField, { TextFieldProps } from "@mui/material/TextField"
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete"
import CircularProgress from "@mui/material/CircularProgress"
import { Box, IconButton } from "@mui/material"
import { useAllTimezonesList } from "@/agent/timezone"
import { StyledProfileTabContentField } from "../ProfilePage/ProfilePage.styled"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import theme from "@/theme"
import { rem } from "polished"
import { ContainedButton, OutlinedButton } from "@/components/commons/Button"

function addSearchIconToEndAdornment(endAdornment, handleTimezoneEditDisable, handleTimezoneEditSave, getValues, userData) {
  const children = React.Children.toArray(endAdornment.props.children);
  children.push(
    <React.Fragment>
      <OutlinedButton
        sx={{
          border: `1px solid ${theme.palette.grey3}`,
          color: theme.palette.grey7,
          whiteSpace: "nowrap",
          mr: rem("8px"),
          p: `${rem("6px")} ${rem("16px")}`,
          top: `-${rem("12px")}`
        }}
        onClick={handleTimezoneEditDisable}
      >
        Cancel
      </OutlinedButton>
      <ContainedButton
        sx={{
          whiteSpace: "nowrap",
          p: `${rem("6px")} ${rem("16px")}`,
          top: `-${rem("12px")}`
        }}
        onClick={handleTimezoneEditSave}
        disabled={
          getValues("timezone") === userData?.data?.tzName
        }
      >
        Save
      </ContainedButton>
    </React.Fragment>);
  return React.cloneElement(endAdornment, {}, children);
}
interface TimezoneAutocompleteProps
  extends Partial<AutocompleteProps<string, false, false, false>> {
  timezone: string | null
  setTimezone:
  | React.Dispatch<React.SetStateAction<string | null>>
  | ((timezone: string | null) => void)
  required?: boolean
  placeholder?: string
  autoFocus?: boolean
  textFieldVariant?: TextFieldProps["variant"],
  isTimezoneEditEnabled: boolean
  handleTimezoneEditEnable: () => void
  handleTimezoneEditDisable: () => void
  handleTimezoneEditSave: () => void
  getValues: () => void
  userData?: string
}

const TimezoneAutocomplete: React.FC<TimezoneAutocompleteProps> = ({
  timezone,
  setTimezone,
  required,
  placeholder = "Select Timezone",
  autoFocus,
  textFieldVariant = "outlined",
  isTimezoneEditEnabled,
  handleTimezoneEditEnable,
  handleTimezoneEditDisable,
  handleTimezoneEditSave,
  getValues,
  userData,
  ...props
}) => {
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState<string[]>([])
  const { data: timezoneList } = useAllTimezonesList()
  const loading = open && options.length === 0
  console.log("xmklfndslkfndssdfksdlfksfd", getValues("timezone"), userData?.data?.tzName)
  React.useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    ; (async () => {
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

  return !isTimezoneEditEnabled ?
    <StyledProfileTabContentField
      value={timezone}
      readOnly={!isTimezoneEditEnabled}
      endAdornment={
        <IconButton size="small" onClick={handleTimezoneEditEnable}>
          <EditOutlinedIcon
            sx={{ fontSize: 16, color: theme.palette.grey6 }}
          />
        </IconButton>
      }
    /> : (
      <Autocomplete
        id="combo-box-demo"
        open={open}
        onOpen={() => {
          setOpen(true)
        }}
        onClose={() => {
          setOpen(false)
        }}
        clearIcon={false}
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
              endAdornment: addSearchIconToEndAdornment(
                params.InputProps.endAdornment, handleTimezoneEditDisable, handleTimezoneEditSave, getValues, userData
              )
            }}
          />
        )}
        {...props}
      />
    )
}

export default TimezoneAutocomplete
