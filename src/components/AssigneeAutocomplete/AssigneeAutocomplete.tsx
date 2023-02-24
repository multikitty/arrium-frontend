import * as React from "react"
import TextField from "@mui/material/TextField"
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete"
import { Box, CircularProgress } from "@mui/material"

import { UserByRoleResultData } from "@/lib/interfaces/user"
import { useUserByRole } from "@/agent/user"
import { UserRoles } from "@/constants/common"

interface AssigneeAutoCompleteProps
  extends Omit<
    Partial<AutocompleteProps<UserByRoleResultData, false, false, false>>,
    "value" | "onChange" | "options"
  > {
  options?: UserByRoleResultData[]
  value: UserByRoleResultData | null
  onChange:
    | React.Dispatch<
        React.SetStateAction<UserByRoleResultData | null | undefined>
      >
    | ((assignee: UserByRoleResultData | null) => void)
  required?: boolean
  placeholder?: string
  autoFocus?: boolean
  readOnly?: boolean
}

const AssigneeAutoComplete: React.FC<AssigneeAutoCompleteProps> = ({
  value,
  onChange,
  required,
  placeholder = "Assign to",
  autoFocus,
  ...props
}) => {
  const { data: adminList, isLoading: isLoadingAdminList } = useUserByRole(
    { role: UserRoles.admin },
    !!props.options
  )
  const { data: salesAgentList, isLoading: isLoadingSalesAgentList } =
    useUserByRole({ role: UserRoles.sales }, !!props.options)

  const options = React.useMemo(
    () =>
      props.options || [
        ...(adminList?.data?.Items || []),
        ...(salesAgentList?.data?.Items || []),
      ],
    [adminList, salesAgentList]
  )

  return (
    <Autocomplete
      {...props}
      id="assignee-select--autocomplete"
      options={options}
      isOptionEqualToValue={(option, value) => option.pk === value.pk}
      getOptionLabel={option => `${option.firstname} ${option.lastname}`}
      filterOptions={(options, state) =>
        options.filter(opt =>
          state.inputValue.toLowerCase()
            ? `${opt.firstname} ${opt.lastname}`
                .toLowerCase()
                .includes(state.inputValue.toLowerCase())
            : true
        )
      }
      loading={props.loading || isLoadingAdminList || isLoadingSalesAgentList}
      value={value}
      onChange={(_: any, newValue: UserByRoleResultData | null) => {
        onChange(newValue)
      }}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {option.firstname} {option.lastname}
        </Box>
      )}
      renderInput={params => (
        <TextField
          {...params}
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: "10px",
            },
          }}
          autoFocus={!!autoFocus}
          required={Boolean(required)}
          InputProps={{
            ...params.InputProps,
            placeholder,
            readOnly: props.readOnly,
            endAdornment: (
              <React.Fragment>
                {isLoadingAdminList || isLoadingSalesAgentList ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  )
}

export default AssigneeAutoComplete
