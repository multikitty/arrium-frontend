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
import { Controller, useForm, useWatch } from "react-hook-form"
import TimeZoneSelect from "react-timezone-select"
import ReactPhoneInput, { CountryData } from "react-phone-input-2"
import "react-phone-input-2/lib/material.css"

import { accountInformationOptions } from "@/validation"
import { ContainedButton, OutlinedButton } from "@/components/commons/Button"
import {
  StyledAccountInformatiomTabContentField,
  StyledAccountInformationTab,
  StyledAccountInformationTabDateField,
  StyledAccountInformationTabForm,
  StyledAccountInformationTabFormActions,
  StyledAccountInformationTabFormLabel,
} from "./CustomerDetailPage.styled"
import { useStore } from "@/store"
import { observer } from "mobx-react-lite"
import { LabelledUserRoles, Plans } from "@/constants/common"
import { PlansType } from "@/types/common"
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "react-query"
import {
  CUSTOMER_ACCOUNT_STATUS,
  CustomerAccountInfoData,
  CustomerAccountInfoResult,
  SendAccountApprovedEmailResult,
  SendAccountApprovedEmailVariables,
  UpdateUserAccountInfoResult,
  UpdateUserAccountInfoVariables,
} from "@/lib/interfaces/customers"
import {
  sendAccountApprovedEmail,
  updateUserAccountInfo,
} from "@/agent/customers"
import { useSnackbar } from "notistack"
import LoadingScreen from "@/components/LoadingScreen"
import Switch from "@/components/commons/Switch/Switch"
import { StyledPlaceholder } from "@/components/commons/uiComponents"
import { useStationTypeList } from "@/agent/stationTypes"
import { getCountryNameByCode } from "@/utils/getCountryNameByCode"
import { capitalCase } from "change-case"
import HelperText from "@/components/commons/HelperText/HelperText"
import SendAccountApprovedEmailModal from "@/components/CustomerDetailPage/SendAccountApprovedModal"

const useStyles = makeStyles({
  timezoneStyles: {
    "& > div": {
      width: "100%",
      padding: "7px 10px",
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

export interface TabProps {
  handleSave: () => void
  handleCancel: () => void
}

interface AccountInformationTabProps extends TabProps, CustomerAccountInfoData {
  refetchCustomerData: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<CustomerAccountInfoResult, unknown>>
  isLoading: boolean
}

const AccountInformationTab = (props: AccountInformationTabProps) => {
  const {
    refetchCustomerData,
    isLoading,
    handleSave,
    handleCancel,
    zendeskUserID,
    ...rest
  } = props

  const classes = useStyles()
  const theme = useTheme()
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"))
  const { enqueueSnackbar } = useSnackbar()
  const { messageStore, userStore } = useStore()
  const { mutate, isLoading: isMutationLoading } = useMutation<
    UpdateUserAccountInfoResult,
    Error,
    UpdateUserAccountInfoVariables
  >(updateUserAccountInfo)
  const { mutate: sendAccountApprovedEmailMutate } = useMutation<
    SendAccountApprovedEmailResult,
    Error,
    SendAccountApprovedEmailVariables
  >(sendAccountApprovedEmail)
  const [endDatePickerOpen, setEndDatePickerOpen] = React.useState(false)
  const [dialCode, setDialCode] = React.useState(props.dialCode)
  const [
    isSendAccountApprovedEmailOpen,
    setIsSendAccountApprovedEmailModalOpen,
  ] = React.useState(false)

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

  const handleSendAccountApprovedEmailModalOpen = () => {
    setIsSendAccountApprovedEmailModalOpen(true)
  }
  const handleSendAccountApprovedEmailModalClose = () => {
    setIsSendAccountApprovedEmailModalOpen(false)
  }

  const handleSendAccountApprovedEmail = async () => {
    await sendAccountApprovedEmailMutate(
      {
        userPK: props.pk,
        userSK: props.sk,
      },
      {
        onSuccess({ success, message, validationError }) {
          if (!success) {
            enqueueSnackbar(
              validationError?.userPK || validationError?.userSK || message,
              {
                variant: "error",
              }
            )
            return
          }
          enqueueSnackbar(message, { variant: "success" })
        },
      }
    )
    handleSendAccountApprovedEmailModalClose()
    handleUpdateAccountInfo()
  }

  type FormPropType = typeof accountInformationOptions.defaultValues

  const { handleSubmit, control, formState, getValues, setValue } =
    useForm<FormPropType>({
      resolver: accountInformationOptions.resolver,
      defaultValues: {
        ...accountInformationOptions.defaultValues,
        ...rest,
        firstName: rest.firstname,
        surName: rest.lastname,
        phoneNumber: props.dialCode + props.phoneNumber,
        timezone: props.tzName,
        startDate: props.startDate
          ? (new Date(props.startDate * 1000) as any)
          : null,
        status: props.accountStatus,
        planType: props.planType,
      },
    })
  useWatch({ control })

  const { data: stationTypeListData } = useStationTypeList()

  const handleUpdateAccountInfo = async () => {
    const startDate = getValues("endDate")
      ? +new Date((getValues("startDate") as number).toString()) / 1000 // converting to a timestamp of seconds and not ms
      : null
    const endDate = getValues("endDate")
      ? +new Date((getValues("endDate") as number).toString()) / 1000
      : null
    const mutationParams: UpdateUserAccountInfoVariables = {
      email: getValues("email"),
      emailVerified: getValues("isEmailVerified"),
      endDate,
      firstname: getValues("firstName"),
      lastname: getValues("surName"),
      dialCode: `+${dialCode}`,
      phoneNumber: getValues("phoneNumber"),
      startDate,
      status: getValues("status"),
      tzName: getValues("timezone"),
      userRole: getValues("role"),
      userPK: props.pk,
      userSK: props.sk,
      passwordChangeRequest: false,
      planType: getValues("planType"),
      stationType: getValues("stationType"),
      zendeskUserID: zendeskUserID.toString(),
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
              validationError?.dialCode ||
              validationError?.planType ||
              validationError?.stationType ||
              validationError?.zendeskUserID ||
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
  }

  const onSubmit = async (data: FormPropType) => {
    if (data.sendAccountApprovedEmail) {
      handleSendAccountApprovedEmailModalOpen()
      return
    }
    handleUpdateAccountInfo()
  }

  const handleEndDatePickerClick = () => {
    if (getValues("startDate")) return setEndDatePickerOpen(true)
    messageStore.setMessage = "Please select Start Date first!"
    messageStore.setOpen = true
  }

  const stationTypeOptionsJSX = (stationTypeListData?.data?.Items || []).map(
    station => (
      <MenuItem value={station.stationType} key={station.sk}>
        {capitalCase(station.stationType)}
      </MenuItem>
    )
  )

  const planTypeOptionsJSX = Object.values(Plans).map((plan: PlansType) => (
    <MenuItem value={plan} key={plan}>
      {capitalCase(plan)}
    </MenuItem>
  ))

  const statusOptionsJSX = Object.values(CUSTOMER_ACCOUNT_STATUS).map(
    status => (
      <MenuItem value={status} key={status}>
        {status === "inActive" ? "Inactive" : capitalCase(status)}
      </MenuItem>
    )
  )

  if (isMutationLoading || props.isLoading) return <LoadingScreen />

  return (
    <StyledAccountInformationTab>
      {isSendAccountApprovedEmailOpen && (
        <SendAccountApprovedEmailModal
          open={isSendAccountApprovedEmailOpen}
          handleClose={handleSendAccountApprovedEmailModalClose}
          handleSendAccountApprovedEmail={handleSendAccountApprovedEmail}
        />
      )}
      <StyledAccountInformationTabForm onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={4}>
            <Box display="flex" flexDirection="column">
              {/* Customer Id Field */}
              <Box mb="24px">
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
              <Box mb="24px">
                <StyledAccountInformationTabFormLabel>
                  Phone number
                </StyledAccountInformationTabFormLabel>
                <Controller
                  name={"phoneNumber"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <ReactPhoneInput
                      country={userStore.lowerCaseCountry}
                      onChange={(_, countryData: CountryData, e) => {
                        setDialCode(countryData.dialCode)
                        onChange(e)
                      }}
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
                  <HelperText type="large">
                    {formState.errors?.phoneNumber?.message}
                  </HelperText>
                )}
              </Box>
              {/* Timezone Field */}
              <Box mb="24px">
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
                  <HelperText type="large">
                    {formState.errors?.timezone?.message}
                  </HelperText>
                )}
              </Box>
              {/* Country Field */}
              <Box mb="24px">
                <StyledAccountInformationTabFormLabel>
                  Country
                </StyledAccountInformationTabFormLabel>
                <StyledAccountInformatiomTabContentField
                  value={getCountryNameByCode(props.country)}
                  readOnly
                  disabled
                />
              </Box>
              {/* Station Type Field */}
              <Box mb="24px">
                <StyledAccountInformationTabFormLabel>
                  Station Type
                </StyledAccountInformationTabFormLabel>
                <Controller
                  name={"stationType"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      displayEmpty
                      value={value}
                      onChange={onChange}
                      input={<StyledAccountInformatiomTabContentField />}
                    >
                      <MenuItem disabled value="">
                        <StyledPlaceholder>
                          Choose station type here
                        </StyledPlaceholder>
                      </MenuItem>
                      {stationTypeOptionsJSX}
                    </Select>
                  )}
                />

                {!!formState.errors?.stationType && (
                  <HelperText type="large">
                    {formState.errors?.stationType?.message}
                  </HelperText>
                )}
              </Box>
              {/* Start Date Field */}
              <Box mb="24px">
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
                  <HelperText type="large">
                    {formState.errors?.startDate?.message}
                  </HelperText>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Box display="flex" flexDirection="column">
              {/* First Name Field */}
              <Box mb="24px">
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
                  <HelperText type="large">
                    {formState.errors?.firstName?.message}
                  </HelperText>
                )}
              </Box>
              {/* Email Field */}
              <Box mb="24px">
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
                  <HelperText type="large">
                    {formState.errors?.email?.message}
                  </HelperText>
                )}
              </Box>
              {/* Role Field */}
              <Box mb="24px">
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
                      input={<StyledAccountInformatiomTabContentField />}
                    >
                      {renderRoleOptions}
                    </Select>
                  )}
                />
                {!!formState.errors?.role && (
                  <HelperText type="large">
                    {formState.errors?.role?.message}
                  </HelperText>
                )}
              </Box>
              {/* Region Field */}
              <Box mb="24px">
                <StyledAccountInformationTabFormLabel>
                  Region
                </StyledAccountInformationTabFormLabel>
                <StyledAccountInformatiomTabContentField
                  value={props.region}
                  readOnly
                  disabled
                />
              </Box>
              {/* Plan Type Field */}
              <Box mb="24px">
                <StyledAccountInformationTabFormLabel>
                  Plan Type
                </StyledAccountInformationTabFormLabel>
                <Controller
                  name={"planType"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      displayEmpty
                      value={value}
                      onChange={onChange}
                      input={<StyledAccountInformatiomTabContentField />}
                    >
                      <MenuItem disabled value="">
                        <StyledPlaceholder>
                          Choose plan type here
                        </StyledPlaceholder>
                      </MenuItem>
                      {planTypeOptionsJSX}
                    </Select>
                  )}
                />
                {!!formState.errors?.planType && (
                  <HelperText type="large">
                    {formState.errors?.planType?.message}
                  </HelperText>
                )}
              </Box>
              {/* End Date Field */}
              <Box mb="24px">
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
                  <HelperText type="large">
                    {formState.errors?.endDate?.message}
                  </HelperText>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Box display="flex" flexDirection="column">
              {/* Surname Field */}
              <Box mb="24px">
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
                  <HelperText type="large">
                    {formState.errors?.surName?.message}
                  </HelperText>
                )}
              </Box>
              {/* Email Verification Status Field */}
              <Box mb="33px">
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
                  <HelperText type="large">
                    {formState.errors?.isEmailVerified?.message}
                  </HelperText>
                )}
              </Box>
              {/* Status Field */}
              <Box mb="24px">
                <StyledAccountInformationTabFormLabel>
                  Status
                </StyledAccountInformationTabFormLabel>
                <Controller
                  name={"status"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      displayEmpty
                      onChange={onChange}
                      value={value}
                      error={!!formState.errors?.status}
                      input={<StyledAccountInformatiomTabContentField />}
                    >
                      <MenuItem disabled value="">
                        <StyledPlaceholder>
                          Choose status here
                        </StyledPlaceholder>
                      </MenuItem>
                      {statusOptionsJSX}
                    </Select>
                  )}
                />
                {!!formState.errors?.status && (
                  <HelperText type="large">
                    {formState.errors?.status?.message}
                  </HelperText>
                )}
              </Box>
              {/* Send account approved Email Switch */}
              <Box ml="16px" mt="28px">
                <Controller
                  control={control}
                  name="sendAccountApprovedEmail"
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel
                      control={
                        <Switch
                          sx={{ mr: "10px" }}
                          checked={value}
                          onChange={onChange}
                        />
                      }
                      label="Send account approved Email"
                    />
                  )}
                />
              </Box>
              {/* Enable pricing plans Switch */}
              <Box ml="16px" mt="80px">
                <Controller
                  control={control}
                  name="enablePricingPlan"
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel
                      control={
                        <Switch
                          sx={{ mr: "10px" }}
                          checked={value}
                          onChange={onChange}
                        />
                      }
                      label="Enable pricing plan"
                    />
                  )}
                />
              </Box>
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
