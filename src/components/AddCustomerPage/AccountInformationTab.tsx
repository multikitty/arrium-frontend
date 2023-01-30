import React from "react"
import {
  Box,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextFieldProps,
} from "@mui/material"
import CalendarIcon from "@mui/icons-material/CalendarTodayOutlined"
import { rem } from "polished"
import { Controller, useForm } from "react-hook-form"
import ReactPhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/material.css"
import TimeZoneSelect from "react-timezone-select"
import { makeStyles } from "@mui/styles"

import { ContainedButton, OutlinedButton } from "@/components/commons/Button"
import { BpCheckbox as Checkbox } from "@/components/commons/CheckBox"
import {
  StyledAccountInformatiomTabContentField,
  StyledAccountInformationTab,
  StyledAccountInformationTabForm,
  StyledAccountInformationTabFormActions,
  StyledAccountInformationTabFormHelperText,
  StyledAccountInformationTabFormLabel,
} from "./AddCustomerPage.styled"
import theme from "@/theme"
import { accountInformationOptions } from "@/validation"
import { UserRolesType } from "@/types/common"
import { LabelledUserRoles, UserRoles } from "@/constants/common"
import { TabType } from "./AddCustomersPage.data"
import { DatePicker } from "@mui/x-date-pickers"
import { useStore } from "@/store"
import { StyledAccountInformationTabDateField } from "../CustomerDetailPage/CustomerDetailPage.styled"
import { observer } from "mobx-react-lite"
import useNavigate from "@/hooks/useNavigate"
import { IPageProps } from "@/lib/interfaces/common"

const useStyles = makeStyles({
  timezoneStyles: {
    "& > div": {
      width: "100%",
      padding: "14px 16px",
      borderRadius: "10px !important",
    },
    "& > div > div > span": {
      display: "none",
    },
  },
  telephoneInputContainer: {
    "& > .special-label": {
      display: "none",
    },
  },
})

const radioOptions = [
  {
    label: "Verified",
    value: true,
  },
  {
    label: "Unverified",
    value: false,
  },
]

interface IProps extends IPageProps {
  tab: TabType
  role: UserRolesType
  setRole: React.Dispatch<
    React.SetStateAction<"driver" | "admin" | "salesAgent">
  >
}

const AccountInformationTab: React.FC<IProps> = ({
  tab,
  role,
  setRole,
  country_code,
  lang,
}) => {
  const {
    navigateWithQuery: { navigateToAddCustomerPage },
  } = useNavigate({ country_code, lang })
  const classes = useStyles()
  const { messageStore, userStore } = useStore()
  const [endDatePickerOpen, setEndDatePickerOpen] = React.useState(false)

  const generateRadioOptions = () => {
    return radioOptions.map(singleOption => (
      <FormControlLabel
        key={singleOption.label}
        value={singleOption.value}
        label={singleOption.label}
        control={<Radio sx={{ color: theme.palette.main }} />}
      />
    ))
  }

  const renderRoleOptions = LabelledUserRoles.map(role => (
    <MenuItem value={role.value}>{role.label}</MenuItem>
  ))

  type formPropType = typeof accountInformationOptions.defaultValues
  const { handleSubmit, control, formState, reset, setValue, ...methods } =
    useForm<formPropType>({
      resolver: accountInformationOptions.resolver,
      defaultValues: {
        ...accountInformationOptions.defaultValues,
        role,
      },
    })

  const handleEndDatePickerClick = () => {
    if (methods.getValues("startDate")) return setEndDatePickerOpen(true)
    messageStore.setMessage = "Please select Start Date first!"
    messageStore.setOpen = true
  }

  const onSubmit = (data: formPropType) => {
    console.log("Personal Information form data", data)
    reset()
  }

  React.useEffect(() => {
    if (!Object.values(UserRoles).includes(role)) return
    setValue("role", role)
  }, [role])

  return (
    <StyledAccountInformationTab>
      <StyledAccountInformationTabForm onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={4}>
            <Box display="flex" flexDirection="column">
              {/* Customer Id Field */}
              <Box mb={rem("24px")}>
                <StyledAccountInformationTabFormLabel>
                  Customer ID
                </StyledAccountInformationTabFormLabel>
                <StyledAccountInformatiomTabContentField readOnly disabled />
              </Box>
              {/* Phone Number Field */}
              <Box mb={rem("24px")}>
                <StyledAccountInformationTabFormLabel>
                  Phone number
                </StyledAccountInformationTabFormLabel>
                <Controller
                  name={"phoneNumber"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <ReactPhoneInput
                      country={userStore.lowerCaseCountry}
                      onChange={onChange}
                      value={value}
                      containerClass={classes.telephoneInputContainer}
                      placeholder=""
                      inputStyle={{
                        width: "100%",
                        borderRadius: rem("10px"),
                        paddingTop: rem("16px"),
                        paddingBottom: rem("16px"),
                      }}
                    />
                  )}
                />
                {!!formState.errors?.phoneNumber && (
                  <StyledAccountInformationTabFormHelperText>
                    {formState.errors?.phoneNumber?.message}
                  </StyledAccountInformationTabFormHelperText>
                )}
              </Box>
              {/* Timezone Field */}
              <Box mb={rem("24px")}>
                <StyledAccountInformationTabFormLabel>
                  Timezone
                </StyledAccountInformationTabFormLabel>
                <Controller
                  name={"timezone"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TimeZoneSelect
                      placeholder="Choose timezone"
                      className={classes.timezoneStyles}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                {!!formState.errors?.timezone && (
                  <StyledAccountInformationTabFormHelperText>
                    {formState.errors?.timezone?.message}
                  </StyledAccountInformationTabFormHelperText>
                )}
              </Box>
              {/* Start Date Field */}
              <Box mb={rem("24px")}>
                <StyledAccountInformationTabFormLabel>
                  Start date
                </StyledAccountInformationTabFormLabel>
                <Controller
                  name={"startDate"}
                  control={control}
                  render={({ field: { value } }) => (
                    <DatePicker
                      inputFormat="dd/MM/yyyy"
                      disablePast
                      value={value}
                      onChange={val => setValue("startDate", val as any)}
                      renderInput={(params: TextFieldProps) => (
                        <StyledAccountInformationTabDateField
                          {...params}
                          error={!!formState.errors?.startDate}
                        />
                      )}
                      components={{
                        OpenPickerIcon: CalendarIcon,
                      }}
                    />
                  )}
                />
                {!!formState.errors?.startDate && (
                  <StyledAccountInformationTabFormHelperText>
                    {formState.errors?.startDate?.message}
                  </StyledAccountInformationTabFormHelperText>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Box display="flex" flexDirection="column">
              {/* First Name Field */}
              <Box mb={rem("24px")}>
                <StyledAccountInformationTabFormLabel>
                  First name
                </StyledAccountInformationTabFormLabel>
                <Controller
                  name={"firstName"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <StyledAccountInformatiomTabContentField
                      onChange={onChange}
                      value={value}
                      error={!!formState.errors?.firstName}
                    />
                  )}
                />
                {!!formState.errors?.firstName && (
                  <StyledAccountInformationTabFormHelperText>
                    {formState.errors?.firstName?.message}
                  </StyledAccountInformationTabFormHelperText>
                )}
              </Box>
              {/* Email Field */}
              <Box mb={rem("24px")}>
                <StyledAccountInformationTabFormLabel>
                  Email
                </StyledAccountInformationTabFormLabel>
                <Controller
                  name={"email"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <StyledAccountInformatiomTabContentField
                      onChange={onChange}
                      value={value}
                      error={!!formState.errors?.email}
                    />
                  )}
                />
                {!!formState.errors?.email && (
                  <StyledAccountInformationTabFormHelperText>
                    {formState.errors?.email?.message}
                  </StyledAccountInformationTabFormHelperText>
                )}
              </Box>
              {/* Role Field */}
              <Box mb={rem("24px")}>
                <StyledAccountInformationTabFormLabel>
                  Role
                </StyledAccountInformationTabFormLabel>
                <Controller
                  name={"role"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      onChange={e => {
                        onChange(e)
                        const newRole = e.target.value as UserRolesType
                        setRole(newRole)
                        navigateToAddCustomerPage(newRole, tab)
                      }}
                      value={value}
                      error={!!formState.errors?.role}
                      input={<StyledAccountInformatiomTabContentField large />}
                    >
                      {renderRoleOptions}
                    </Select>
                  )}
                />
                {!!formState.errors?.role && (
                  <StyledAccountInformationTabFormHelperText>
                    {formState.errors?.role?.message}
                  </StyledAccountInformationTabFormHelperText>
                )}
              </Box>
              {/* End Date Field */}
              <Box mb={rem("24px")}>
                <StyledAccountInformationTabFormLabel>
                  End date
                </StyledAccountInformationTabFormLabel>
                <Controller
                  name={"endDate"}
                  control={control}
                  render={({ field: { value } }) => (
                    <DatePicker
                      inputFormat="dd/MM/yyyy"
                      open={endDatePickerOpen}
                      onOpen={handleEndDatePickerClick}
                      minDate={
                        new Date(
                          methods.getValues("startDate") as unknown as string
                        )
                      }
                      value={value}
                      onChange={val => setValue("endDate", val as any)}
                      renderInput={(params: TextFieldProps) => (
                        <StyledAccountInformationTabDateField
                          {...params}
                          error={!!formState.errors?.endDate}
                        />
                      )}
                      components={{
                        OpenPickerIcon: CalendarIcon,
                      }}
                    />
                  )}
                />
                {!!formState.errors?.endDate && (
                  <StyledAccountInformationTabFormHelperText>
                    {formState.errors?.endDate?.message}
                  </StyledAccountInformationTabFormHelperText>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Box display="flex" flexDirection="column">
              {/* Surname Field */}
              <Box mb={rem("24px")}>
                <StyledAccountInformationTabFormLabel>
                  Surname
                </StyledAccountInformationTabFormLabel>
                <Controller
                  name={"surName"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <StyledAccountInformatiomTabContentField
                      onChange={onChange}
                      value={value}
                      error={!!formState.errors?.surName}
                    />
                  )}
                />
                {!!formState.errors?.surName && (
                  <StyledAccountInformationTabFormHelperText>
                    {formState.errors?.surName?.message}
                  </StyledAccountInformationTabFormHelperText>
                )}
              </Box>
              {/* Email Verification Status Field */}
              <Box mb={rem("24px")}>
                <StyledAccountInformationTabFormLabel>
                  Email verification status
                </StyledAccountInformationTabFormLabel>
                <Controller
                  name={"isEmailVerified"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <RadioGroup row value={value} onChange={onChange}>
                      {generateRadioOptions()}
                    </RadioGroup>
                  )}
                />
                {!!formState.errors?.isEmailVerified && (
                  <StyledAccountInformationTabFormHelperText>
                    {formState.errors?.isEmailVerified?.message}
                  </StyledAccountInformationTabFormHelperText>
                )}
              </Box>
              {/* Status Field */}
              <Box mb={rem("24px")}>
                <StyledAccountInformationTabFormLabel>
                  Status
                </StyledAccountInformationTabFormLabel>
                <Controller
                  name={"status"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      onChange={onChange}
                      value={value}
                      error={!!formState.errors?.status}
                      input={<StyledAccountInformatiomTabContentField large />}
                    >
                      <MenuItem value="disabled">Disabled</MenuItem>
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                  )}
                />
                {!!formState.errors?.status && (
                  <StyledAccountInformationTabFormHelperText>
                    {formState.errors?.status?.message}
                  </StyledAccountInformationTabFormHelperText>
                )}
              </Box>
              {/* Send password change request checkbox */}
              <Box mt={rem("24px")}>
                <Controller
                  control={control}
                  name="sendPasswordChangeRequest"
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel
                      control={<Checkbox checked={value} onChange={onChange} />}
                      label="Send Password Reset Email"
                    />
                  )}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <StyledAccountInformationTabFormActions>
          <OutlinedButton grey sx={{ mr: rem("12px") }}>
            Cancel
          </OutlinedButton>
          <ContainedButton>Save</ContainedButton>
        </StyledAccountInformationTabFormActions>
      </StyledAccountInformationTabForm>
    </StyledAccountInformationTab>
  )
}

export default observer(AccountInformationTab)
