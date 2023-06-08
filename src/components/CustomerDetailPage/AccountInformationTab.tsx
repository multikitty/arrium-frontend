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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CalendarIcon from "@mui/icons-material/CalendarTodayOutlined"
import { makeStyles } from "@mui/styles"
import { rem } from "polished"
import { Controller, useForm, useWatch } from "react-hook-form"
import { observer } from "mobx-react-lite"
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "react-query"
// import { useSnackbar } from "notistack"
import { capitalCase } from "change-case"
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
} from "@/components/CustomerDetailPage/CustomerDetailPage.styled"
import { useStore } from "@/store"
import { LabelledUserRoles, Plans } from "@/constants/common"
import { PlanType } from "@/types/common"
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
import LoadingScreen from "@/components/LoadingScreen"
import Switch from "@/components/commons/Switch/Switch"
import { StyledPlaceholder } from "@/components/commons/uiComponents"
import { useStationTypeList } from "@/agent/stationTypes"
import { getCountryNameByCode } from "@/utils/getCountryNameByCode"
import HelperText from "@/components/commons/HelperText/HelperText"
import SendAccountApprovedEmailModal from "@/components/CustomerDetailPage/SendAccountApprovedModal"
import TimezoneAutocomplete from "@/components/TimezoneAutocomplete"
import {
  UpdatePricingPlanStatusResult,
  UpdatePricingPlanStatusVariables,
} from "@/lib/interfaces/user"
import { updatePricingPlanStatus } from "@/agent/user"
import { useRegionList } from "@/agent/locations"
import { devices } from "@/constants/device"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastNotification, handleSuccessToast, handleWarningToast, handleErrorToast } from '@/components/ToastNotification/ToastNotification';
import { GREY_7 } from "@/constants/colors"

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
  handleNavigateToCustomersPage: () => void
  handleCancel: () => void
  refCode?: string
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
    handleNavigateToCustomersPage,
    handleCancel,
    zendeskUserID,
    ...rest
  } = props

  const theme = useTheme()
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"))
  const isWebView = useMediaQuery(devices.desktop.up)
  // const { enqueueSnackbar } = useSnackbar()
  const { userStore } = useStore()
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
  const { mutate: updatePricingPlanStatusMutate } = useMutation<
    UpdatePricingPlanStatusResult,
    Error,
    UpdatePricingPlanStatusVariables
  >(updatePricingPlanStatus)
  const [endDatePickerOpen, setEndDatePickerOpen] = React.useState(false)
  const [dialCode, setDialCode] = React.useState(props.dialCode)
  const [
    isSendAccountApprovedEmailOpen,
    setIsSendAccountApprovedEmailModalOpen,
  ] = React.useState(false)

  const [isTimezoneEditEnabled, setIsTimezoneEditEnabled] = React.useState(false)
  const generateRadioOptions = React.useCallback(() => {
    return radioOptions.map(singleOption => (
      <FormControlLabel
        key={singleOption.label}
        value={singleOption.value}
        label={singleOption.label}
        control={<Radio sx={{ color: theme.palette.primary.main }} />}
      />
    ))
  }, [])

  const renderRoleOptions = LabelledUserRoles.map(role => (
    <MenuItem key={role.value} value={role.value} disabled>
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
            toast.error(
              validationError?.userPK ||
              validationError?.userSK ||
              message,
              {
                closeButton: false,
                autoClose: 3000,
              }
            )
            return
          }
          toast.success(message, {
            closeButton: false,
            autoClose: 3000,
          });
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
        phoneNumber: props?.dialCode + props?.phoneNumber,
        timezone: props.tzName,
        startDate: props.startDate
          ? (new Date(props.startDate * 1000) as any)
          : null,
        status: props.accountStatus,
        planType: props.planType,
        isEmailVerified: props?.emailVerified
      },
    })
  useWatch({ control })
  const { data: stationTypeListData } = useStationTypeList()
  const { data: regionListData } = useRegionList(props.flexCountry)
  const regionName: RegionListResult = regionListData?.data?.Items.filter((item: any) => item.regionCode === props.regionCode)
  const handleUpdateAccountInfo = async () => {
    const startDate = getValues("endDate")
      ? +new Date((getValues("startDate") as number)?.toString()) / 1000 // converting to a timestamp of seconds and not ms
      : null
    const endDate = getValues("endDate")
      ? +new Date((getValues("endDate") as number)?.toString()) / 1000
      : null
    const mutationParams: UpdateUserAccountInfoVariables = {
      email: getValues("email"),
      emailVerified: getValues("isEmailVerified"),
      endDate,
      firstname: getValues("firstName"),
      lastname: getValues("surName"),
      dialCode: dialCode.replaceAll("+", ""),
      phoneNumber: getValues("phoneNumber").replace('+', "").slice(dialCode.length).replace(' ', ""),
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
      currentSteps: getValues("isEmailVerified") === 'true' ? "finished" : "holding"
    }
    await mutate(mutationParams, {
      onSuccess({ success, message, validationError }) {
        if (!success) {
          toast.error(
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
            // {
            //   closeButton: false,
            //   autoClose: 3000,
            // }
          )
          return
        }
        handleSuccessToast(message);
      },
    })
  }
  // const onSubmit = async (data: FormPropType) => {
  //   if (data.sendAccountApprovedEmail) {
  //     handleSendAccountApprovedEmailModalOpen()
  //     return
  //   }
  //   try {
  //     await handleUpdateAccountInfo()
  //     if (props.pricingPlan === data.enablePricingPlan) {
  //       props.refetchCustomerData()
  //       toast.success("Account updated successfully", {
  //         closeButton: false,
  //         autoClose: 3000,
  //       });
  //       return
  //     }else {
  //     await updatePricingPlanStatusMutate(
  //       {
  //         userSK: props.sk,
  //         userPK: props.pk,
  //         pricingPlan: data.enablePricingPlan,
  //       },
  //       {
  //         onSuccess({ success, message, validationError }) {
  //           if (!success) {
  // toast.error(
  // enqueueSnackbar(
  //   validationError?.userSK ||
  //   validationError?.userPK ||
  //   validationError?.pricingPlan ||
  //   message,
  //   {
  //     closeButton: false,
  //     autoClose: 3000,
  //   }
  // )
  // toast.error(errorMessage);
  //   handleErrorToast(
  //     validationError?.email ||
  //     validationError?.emailVerified ||
  //     validationError?.endDate ||
  //     validationError?.firstname ||
  //     validationError?.lastname ||
  //     validationError?.passwordChangeRequest ||
  //     validationError?.phoneNumber ||
  //     validationError?.startDate ||
  //     validationError?.status ||
  //     validationError?.tzName ||
  //     validationError?.userPK ||
  //     validationError?.userRole ||
  //     validationError?.userSK ||
  //     validationError?.dialCode ||
  //     validationError?.planType ||
  //     validationError?.stationType ||
  //     validationError?.zendeskUserID ||
  //     message
  //   );
  //   return
  // }
  // enqueueSnackbar(message, { variant: "success" })
  //           handleSuccessToast(message);
  //         // toast.success("Account updated successfully", {
  //         //   closeButton: false,
  //         //   autoClose: 3000,
  //         // });
  //         },
  //       }
  //     )
  //     props.refetchCustomerData()
  //     toast.success("Account updated successfully", {
  //       closeButton: false,
  //       autoClose: 3000,
  //     });
  //   } catch (error) {
  //     console.error(error)
  //     toast.error("An error occurred while updating your account", {
  //       closeButton: false,
  //       autoClose: 3000,
  //     });
  //   }
  // }
  // const onSubmit = async (data: FormPropType) => {
  //   try {
  //     await handleUpdateAccountInfo();
  //     handleSuccessToast("Account info updated successfully!");
  //   } catch (error) {
  //     console.error(error)
  //     handleErrorToast("Failed to update account info.");
  //   }
  // }

  const onSubmit = async (data: FormPropType) => {
    if (data.sendAccountApprovedEmail) {
      handleSendAccountApprovedEmailModalOpen()
      return
    }

    try {
      await handleUpdateAccountInfo()

      if (props.pricingPlan === data.enablePricingPlan) {
        props.refetchCustomerData()
        toast.success("Account updated successfully", {
          closeButton: false,
          autoClose: 3000,
        });
        return
      }

      await updatePricingPlanStatusMutate(
        {
          userSK: props.sk,
          userPK: props.pk,
          pricingPlan: data.enablePricingPlan,
        },
        {
          onSuccess({ success, message, validationError }) {
            if (!success) {
              handleErrorToast(
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
                message
              );
              return;
            }
            handleSuccessToast(message);
          },
        }
      )

      props.refetchCustomerData()
      toast.success("Account updated successfully", {
        closeButton: false,
        autoClose: 3000,
      });
    } catch (error) {
      console.error(error)
      toast.error("An error occurred while updating your account", {
        closeButton: false,
        autoClose: 3000,
      });
    }
  }


  const handleEndDatePickerClick = () => {
    if (getValues("startDate")) {
      setEndDatePickerOpen(true);
    } else {
      toast.error("Please select Start Date first!", {
        closeButton: false,
        autoClose: 3000,
      });
    }
  }
  const handleTimezoneEditEnable = () => {
    setIsTimezoneEditEnabled(true)
  }
  const handleTimezoneEditDisable = () => {
    setIsTimezoneEditEnabled(false)
    setValue("timezone", props.tzName)
  }
  const handleTimezoneEditSave = () => {
    setIsTimezoneEditEnabled(false)
  }

  const handleCancelUpdate = () => {
    if (
      getValues("email") !== rest.email ||
      getValues("isEmailVerified") !== rest.emailVerified ||
      getValues("firstName") !== rest.firstname ||
      getValues("surName") !== rest.lastname ||
      dialCode.replaceAll("+", "") !== rest.dialCode ||
      getValues("phoneNumber").replace('+', "").slice(dialCode.length).replace(' ', "") !== rest.phoneNumber ||
      getValues("startDate") !== rest.startDate ||
      getValues("status") !== rest.accountStatus ||
      getValues("timezone") !== rest.tzName ||
      getValues("role") !== rest.role ||
      getValues("planType") !== rest.planType ||
      getValues("sendAccountApprovedEmail") === true ||
      getValues("enablePricingPlan") === true ||
      getValues("stationType") !== rest.stationType ||
      getValues("endDate") !== rest.endDate
    ) {
      props.handleCancel()
    } else {
      handleNavigateToCustomersPage()
    }
  }
  const stationTypeOptionsJSX = (stationTypeListData?.data?.Items || []).map(
    station => (
      <MenuItem value={station.stationType} key={station.sk}>
        {capitalCase(station.stationType)}
      </MenuItem>
    )
  )
  const planTypeOptionsJSX = Object.values(Plans).map((plan: PlanType) => (
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
      <ToastNotification />
      {isSendAccountApprovedEmailOpen && (
        <SendAccountApprovedEmailModal
          open={isSendAccountApprovedEmailOpen}
          handleClose={handleSendAccountApprovedEmailModalClose}
          handleSendAccountApprovedEmail={handleSendAccountApprovedEmail}
        />
      )}
      <StyledAccountInformationTabForm onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={4}>{/* Customer Id Field */}
            <Box mb="24px">
              <StyledAccountInformationTabFormLabel>
                Customer ID
              </StyledAccountInformationTabFormLabel>
              <StyledAccountInformatiomTabContentField
                value={props.customerID}
                readOnly
                disabled
              />
            </Box></Grid>
          <Grid item xs={12} lg={4}>{/* First Name Field */}
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
            </Box></Grid>
          <Grid item xs={12} lg={4}>{/* Surname Field */}
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
            </Box></Grid>
          <Grid item xs={12} lg={4}>{/* Phone Number Field */}
            <Box mb="24px">
              <StyledAccountInformationTabFormLabel>
                Phone number
              </StyledAccountInformationTabFormLabel>
              <Controller
                name={"phoneNumber"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <ReactPhoneInput
                    country={userStore?.lowerCaseCountry}
                    onChange={(_, countryData: CountryData, e, formattedValue) => {
                      setDialCode(countryData?.dialCode)
                      onChange(e)
                    }}
                    value={value ? value : null}
                    disabled
                    inputProps={{
                      readOnly: true,
                    }}
                    buttonStyle={{
                      top: rem("8px"),
                      bottom: rem("8px"),
                      paddingRight: rem("3px"),
                      borderRight: "1px solid #E6E6ED",
                    }}
                    inputStyle={{
                      height: rem("48px"),
                      width: "100%",
                      borderRadius: rem("10px"),
                      paddingTop: rem("16px"),
                      paddingLeft: rem("68px"),
                      paddingBottom: rem("16px"),
                    }}
                    countryCodeEditable={false}
                    disableCountryCode 
                    specialLabel=""
                  />
                )}
              />
              {!!formState.errors?.phoneNumber && (
                <HelperText type="large">
                  {formState.errors?.phoneNumber?.message}
                </HelperText>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} lg={4}>{/* Email Field */}
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
            </Box></Grid>
          <Grid item xs={12} lg={4}>
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
            </Box></Grid>
          <Grid item xs={12} lg={4}>{/* Timezone Field */}
            <Box mb="30px">
              <StyledAccountInformationTabFormLabel>
                Timezone
              </StyledAccountInformationTabFormLabel>
              <Controller
                name={"timezone"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TimezoneAutocomplete
                    placeholder="Choose timezone"
                    timezone={value}
                    setTimezone={onChange}
                    isTimezoneEditEnabled={isTimezoneEditEnabled}
                    handleTimezoneEditEnable={handleTimezoneEditEnable}
                    handleTimezoneEditDisable={handleTimezoneEditDisable}
                    handleTimezoneEditSave={handleTimezoneEditSave}
                    getValues={getValues}
                    addSearchIconToEndAdornmentTop={'0px'}
                  />
                )}
              />
              {!!formState.errors?.timezone && (
                <HelperText type="large">
                  {formState.errors?.timezone?.message}
                </HelperText>
              )}
            </Box></Grid>
          <Grid item xs={12} lg={4}>
            {/* Role Field */}
            <Box mb="24px">
              <StyledAccountInformationTabFormLabel>
                Role
              </StyledAccountInformationTabFormLabel>
              <StyledAccountInformatiomTabContentField
                value={getValues("role")}
                readOnly
                disabled
              />
              {!!formState.errors?.role && (
                <HelperText type="large">
                  {formState.errors?.role?.message}
                </HelperText>
              )}
            </Box></Grid>
          <Grid item xs={12} lg={4}>
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
                    IconComponent={ExpandMoreIcon}
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
            </Box></Grid>
          <Grid item xs={12} lg={4}> {/* Country Field */}
            <Box mb="24px">
              <StyledAccountInformationTabFormLabel>
                Country
              </StyledAccountInformationTabFormLabel>
              <StyledAccountInformatiomTabContentField
                value={getCountryNameByCode(props.country)}
                readOnly
                disabled
              />
            </Box></Grid>
          <Grid item xs={12} lg={4}> {/* Region Field */}
            <Box mb="24px">
              <StyledAccountInformationTabFormLabel>
                Region
              </StyledAccountInformationTabFormLabel>
              <StyledAccountInformatiomTabContentField
                value={regionName?.[0]?.regionName ? regionName?.[0]?.regionName : props.regionCode}
                placeholder="Region"
                readOnly
                disabled
              />
            </Box></Grid>
          {isWebView ? (<Grid item xs={12} lg={4}>{/* Send account approved Email Switch */}
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
            </Box></Grid>) : null}
          <Grid item xs={12} lg={4}> {/* Plan Type Field */}
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
                    IconComponent={ExpandMoreIcon}
                    disabled
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
          </Grid>
          <Grid item xs={12} lg={4}> {/* Station Type Field */}
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
                    IconComponent={ExpandMoreIcon}
                    disabled
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
          </Grid>
          {isWebView ? (<Grid item xs={12} lg={4}>{/* Enable pricing plans Switch */}
            <Box ml="16px" mt="28px">
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
            </Box></Grid>) : null}
          <Grid item xs={12} lg={4}>{/* Start Date Field */}
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
                          inputProps={{ placeholder: "DD/MM/YYYY" }}
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
                          inputProps={{ placeholder: "DD/MM/YYYY" }}
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
            </Box></Grid>
          <Grid item xs={12} lg={4}>{/* End Date Field */}
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
                          inputProps={{ placeholder: "DD/MM/YYYY" }}
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
                          inputProps={{ placeholder: "DD/MM/YYYY" }}
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
            </Box></Grid>

          {!isWebView ? <Grid item xs={12} lg={4}>{/* Send account approved Email Switch */}
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
            </Box></Grid> : null}
          {!isWebView ? <Grid item xs={12} lg={4}>{/* Enable pricing plans Switch */}
            <Box ml="16px" mt="28px">
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
            </Box></Grid> : null}

        </Grid>
        <StyledAccountInformationTabFormActions>
          <OutlinedButton
            sx={{ mr: rem("12px"), color: GREY_7, border: "1px solid #E6E6ED" }}
            onClick={handleCancelUpdate}
          >
            Cancel
          </OutlinedButton>
          <ContainedButton type="submit" onClick={handleUpdateAccountInfo}>Save</ContainedButton>
        </StyledAccountInformationTabFormActions>
      </StyledAccountInformationTabForm>
    </StyledAccountInformationTab>
  )
}

export default observer(AccountInformationTab)
