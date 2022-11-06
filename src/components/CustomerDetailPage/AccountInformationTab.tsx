import * as React from "react"
import {
  Box,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextFieldProps,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker"
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker"
import CalendarIcon from "@mui/icons-material/CalendarTodayOutlined"
import { makeStyles } from "@mui/styles"
import { rem } from "polished"
import { Controller, useForm } from "react-hook-form"
import TimeZoneSelect from "react-timezone-select"
import ReactPhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/material.css"

import { accountInformationOptions } from "@/validation"
import { ContainedButton, OutlinedButton } from "@/components/commons/Button"
import { BpCheckbox as Checkbox } from "@/components/commons/CheckBox"
import {
  StyledAccountInformatiomTabContentField,
  StyledAccountInformationTab,
  StyledAccountInformationTabDateField,
  StyledAccountInformationTabForm,
  StyledAccountInformationTabFormActions,
  StyledAccountInformationTabFormHelperText,
  StyledAccountInformationTabFormLabel,
} from "./CustomerDetailPage.styled"
import { useStore } from "@/store"
import { observer } from "mobx-react-lite"
import { LabelledUserRoles } from "@/constants/common"
import { UserRolesType } from "@/types/common"
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "react-query"
import {
  ICustomerAccountInfoResult,
  IUpdateUserAccountInfoResult,
  IUpdateUserAccountInfoVariables,
} from "@/lib/interfaces/customers"
import { updateUserAccountInfo } from "@/agent/customers"
import { useSnackbar } from "notistack"
import LoadingScreen from "../LoadingScreen"

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

export interface ITabProps {
  handleSave: () => void
  handleCancel: () => void
}

interface IAccountInformationTabProps extends ITabProps {
  customerID: string
  dialCode: string
  phoneNumber: string
  tzName: string
  startDate: number | null
  endDate: number | null
  firstname: string
  email: string
  lastname: string
  role: string
  emailVerified: boolean
  accountStatus: string
  sk: string
  pk: string
  refetchCustomerData: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<ICustomerAccountInfoResult, unknown>>
  isLoading: boolean
}

const AccountInformationTab = (props: IAccountInformationTabProps) => {
  const classes = useStyles()
  const theme = useTheme()
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"))
  const { enqueueSnackbar } = useSnackbar()
  const { messageStore, userStore } = useStore()
  const { mutate, isLoading } = useMutation<
    IUpdateUserAccountInfoResult,
    Error,
    IUpdateUserAccountInfoVariables
  >(updateUserAccountInfo)
  const [endDatePickerOpen, setEndDatePickerOpen] = React.useState(false)

  const generateRadioOptions = () => {
    return radioOptions.map(singleOption => (
      <FormControlLabel
        key={singleOption.label}
        value={singleOption.value}
        label={singleOption.label}
        control={<Radio sx={{ color: theme.palette.primary.main }} />}
      />
    ))
  }

  const renderRoleOptions = LabelledUserRoles.map(role => (
    <MenuItem key={role.value} value={role.value}>
      {role.label}
    </MenuItem>
  ))

  type formPropType = typeof accountInformationOptions.defaultValues

  const { handleSubmit, control, formState, getValues, setValue, reset } =
    useForm<formPropType>(accountInformationOptions)

  const onSubmit = async (data: formPropType) => {
    const startDate = +new Date(data.startDate as unknown as string) / 1000 // converting to a timestamp of seconds and not ms
    const endDate = data.endDate ? +new Date(data.endDate) / 1000 : null
    const mutationParams: IUpdateUserAccountInfoVariables = {
      email: data.email,
      emailVerified: data.isEmailVerified,
      endDate,
      firstname: data.firstName,
      lastname: data.surName,
      passwordChangeRequest: data.sendPasswordChangeRequest,
      phoneNumber: data.phoneNumber,
      startDate,
      status: data.status,
      tzName: data.timezone,
      userRole: data.role,
      userPK: props.pk,
      userSK: props.sk,
    }
    await mutate(mutationParams, {
      onSuccess({ success, message, validationError }) {
        if (!success) {
          enqueueSnackbar(
            validationError?.email ||
              validationError?.emailVerified ||
              validationError?.endDate ||
              validationError?.firstname ||
              validationError?.lastname ||
              validationError?.passwordChangeRequest ||
              validationError?.phoneNumber ||
              validationError?.startDate ||
              validationError?.status ||
              validationError?.tzName ||
              validationError?.userPK ||
              validationError?.userRole ||
              validationError?.userSK ||
              message,
            {
              variant: "error",
            }
          )
          return
        }
        enqueueSnackbar(message, { variant: "success" })
        props.refetchCustomerData()
      },
    })
    reset()
  }

  const handleEndDatePickerClick = () => {
    if (getValues("startDate")) return setEndDatePickerOpen(true)
    messageStore.setMessage = "Please select Start Date first!"
    messageStore.setOpen = true
  }

  React.useEffect(() => {
    reset({
      phoneNumber: props.dialCode + props.phoneNumber,
      timezone: props.tzName,
      startDate: props.startDate
        ? (new Date(props.startDate * 1000) as any)
        : null,
      endDate: props.endDate ? (new Date(props.endDate * 1000) as any) : null,
      firstName: props.firstname,
      email: props.email,
      role: props.role as UserRolesType,
      surName: props.lastname,
      isEmailVerified: props.emailVerified,
      status: props.accountStatus,
    })
  }, [props])

  if (isLoading || props.isLoading) return <LoadingScreen />

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
                <StyledAccountInformatiomTabContentField
                  value={props.customerID}
                  readOnly
                  disabled
                />
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
                  render={({ field: { value } }) =>
                    isMdUp ? (
                      <DesktopDatePicker
                        inputFormat="dd/MM/yyyy"
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
                    ) : (
                      <MobileDatePicker
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
                    )
                  }
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
                      onChange={onChange}
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
                  render={({ field: { value } }) =>
                    isMdUp ? (
                      <DesktopDatePicker
                        inputFormat="dd/MM/yyyy"
                        open={endDatePickerOpen}
                        onOpen={handleEndDatePickerClick}
                        minDate={
                          new Date(getValues("startDate") as unknown as string)
                        }
                        value={value}
                        onChange={val => {
                          setValue("endDate", val as any)
                          setEndDatePickerOpen(false)
                        }}
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
                    ) : (
                      <MobileDatePicker
                        inputFormat="dd/MM/yyyy"
                        open={endDatePickerOpen}
                        onOpen={() =>
                          getValues("startDate") && setEndDatePickerOpen(true)
                        }
                        minDate={
                          new Date(getValues("startDate") as unknown as string)
                        }
                        value={value}
                        onChange={val => {
                          setValue("endDate", val as any)
                          setEndDatePickerOpen(false)
                        }}
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
                    )
                  }
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
            </Box>
          </Grid>
          <Grid item xs={12} lg={4}>
            {/* Send password change request checkbox */}
            <Box>
              <Controller
                control={control}
                name="sendPasswordChangeRequest"
                render={({ field: { value, onChange } }) => (
                  <FormControlLabel
                    control={<Checkbox checked={value} onChange={onChange} />}
                    label="Send Password Change Request"
                  />
                )}
              />
            </Box>
          </Grid>
        </Grid>
        <StyledAccountInformationTabFormActions>
          <OutlinedButton
            grey
            sx={{ mr: rem("12px") }}
            onClick={props.handleCancel}
          >
            Cancel
          </OutlinedButton>
          <ContainedButton type="submit">Save</ContainedButton>
        </StyledAccountInformationTabFormActions>
      </StyledAccountInformationTabForm>
    </StyledAccountInformationTab>
  )
}

export default observer(AccountInformationTab)
