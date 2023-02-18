import React, { useCallback, useState } from "react"
import { Grid, IconButton, MenuItem, Select } from "@mui/material"
import {
  StyledAccountInformationTabFormHelperText,
  StyledConfigurationTab,
  StyledConfigurationTabForm,
  StyledConfigurationTabFormActions,
  StyledConfigurationTabFormField,
  StyledConfigurationTabFormItem,
  StyledConfigurationTabFormLabel,
} from "./CustomerDetailPage.styled"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { rem } from "polished"
import { ContainedButton, OutlinedButton } from "@/components/commons/Button"
import { TabProps } from "./AccountInformationTab"
import customerConfigOptions from "@/validation/customerConfig"
import { Controller, useForm, useWatch } from "react-hook-form"
import { StyledPlaceholder } from "@/components/commons/uiComponents"
import {
  updateConfigurationDetails,
  useCustomerConfigInfo,
} from "@/agent/customers"
import LoadingScreen from "@/components/LoadingScreen"
import { useCountryList, useRegionList } from "@/agent/locations"
import {
  UpdateConfigurationDetailsResult,
  UpdateConfigurationDetailsVariables,
} from "@/lib/interfaces/customers"
import { useMutation } from "react-query"
import { useSnackbar } from "notistack"
import { ZENDESK_ORG_ID } from "@/constants/common"

interface ConfigurationTabProps extends TabProps {
  pk: string
  sk: string
  zendeskUserId: string
}

const ConfigurationTab = (props: ConfigurationTabProps) => {
  const { enqueueSnackbar } = useSnackbar()
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const {
    data: configData,
    isLoading,
    refetch: refetchConfigInfo,
  } = useCustomerConfigInfo({
    pk: props.pk,
  })
  const { data: countryListData } = useCountryList()
  const { mutate: configurationDetailsMutate } = useMutation<
    UpdateConfigurationDetailsResult,
    Error,
    UpdateConfigurationDetailsVariables
  >(updateConfigurationDetails)

  type FormPropType = typeof customerConfigOptions.defaultValues
  const { handleSubmit, control, formState, reset, getValues } =
    useForm<FormPropType>(customerConfigOptions)
  useWatch({ name: "country", control })

  const { data: regionListData } = useRegionList(
    (getValues("country") || "").toLowerCase()
  )

  const handleToggleHidePassword = () => {
    setIsPasswordHidden(p => !p)
  }

  const handleSave = useCallback(
    (variables: UpdateConfigurationDetailsVariables) => {
      configurationDetailsMutate(variables, {
        onSuccess({ success, message, validationError }) {
          if (!success) {
            enqueueSnackbar(
              validationError?.accessToken ||
                validationError?.country ||
                validationError?.flexId ||
                validationError?.flexPassword ||
                validationError?.flexUser ||
                validationError?.refreshToken ||
                validationError?.region ||
                validationError?.userAgent ||
                validationError?.userPk ||
                validationError?.userSk ||
                validationError?.zendeskOrgID ||
                validationError?.zendeskUserID ||
                message,
              {
                variant: "error",
              }
            )
            return
          }
          enqueueSnackbar(message, { variant: "success" })
          refetchConfigInfo()
        },
        onError(error, variables) {
          enqueueSnackbar(error.message, { variant: "error" })
          console.error("ERROR:", error)
          console.log("VARIABLES USED:", variables)
        },
      })
    },
    [configurationDetailsMutate, refetchConfigInfo]
  )

  const countryOptionsJSX = (countryListData?.data?.Items || []).map(
    country => (
      <MenuItem value={country.countryCode} key={country.countryCode}>
        {country.country}
      </MenuItem>
    )
  )

  const regionOptionsJSX = (regionListData?.data?.Items || []).map(region => (
    <MenuItem value={region.regionCode} key={region.regionCode}>
      {region.regionName}
    </MenuItem>
  ))

  const onSubmit = (data: FormPropType) => {
    handleSave({
      accessToken: data.accessToken,
      country: data.country,
      flexId: data.flexID,
      flexPassword: data.amznFlexPassword,
      flexUser: data.amznFlexUser,
      refreshToken: data.refreshToken,
      region: data.region,
      userAgent: data.userAgent,
      userPk: props.pk,
      userSk: props.sk,
      // TODO: to change with real zendeskIDs
      zendeskOrgID: ZENDESK_ORG_ID,
      zendeskUserID: props.zendeskUserId,
    })
  }

  React.useEffect(() => {
    if (!configData?.data) return
    reset({
      accessToken: configData.data.accToken,
      amznFlexPassword: configData.data.amznFlexPassword,
      amznFlexUser: configData.data.amznFlexUser,
      country: configData.data.country,
      flexID: configData.data.flexID,
      refreshToken: configData.data.refToken,
      region: configData.data.region,
      userAgent: configData.data.usrAgent,
    })
  }, [configData])

  if (isLoading) return <LoadingScreen />

  return (
    <StyledConfigurationTab>
      <StyledConfigurationTabForm onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} sx={{ p: rem("8px") }}>
          <Grid item xs={12} lg={4}>
            {/* Amazon Flex Username Field */}
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Amazon Flex Username
              </StyledConfigurationTabFormLabel>
              <Controller
                name={"amznFlexUser"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <StyledConfigurationTabFormField
                    value={value}
                    onChange={onChange}
                    placeholder="Username here"
                  />
                )}
              />
              {!!formState.errors?.amznFlexUser && (
                <StyledAccountInformationTabFormHelperText>
                  {formState.errors?.amznFlexUser?.message}
                </StyledAccountInformationTabFormHelperText>
              )}
            </StyledConfigurationTabFormItem>
            {/* Access Token Textarea */}
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Access Token
              </StyledConfigurationTabFormLabel>
              <Controller
                name={"accessToken"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <StyledConfigurationTabFormField
                    multiline
                    minRows={3}
                    value={value}
                    onChange={onChange}
                    placeholder="Type..."
                  />
                )}
              />
              {!!formState.errors?.accessToken && (
                <StyledAccountInformationTabFormHelperText>
                  {formState.errors?.accessToken?.message}
                </StyledAccountInformationTabFormHelperText>
              )}
            </StyledConfigurationTabFormItem>
            {/* Country Drop-down */}
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Country
              </StyledConfigurationTabFormLabel>
              <Controller
                name={"country"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    displayEmpty
                    value={value}
                    onChange={onChange}
                    input={<StyledConfigurationTabFormField />}
                  >
                    <MenuItem disabled value="">
                      <StyledPlaceholder>Choose country here</StyledPlaceholder>
                    </MenuItem>
                    {countryOptionsJSX}
                  </Select>
                )}
              />
              {!!formState.errors?.country && (
                <StyledAccountInformationTabFormHelperText>
                  {formState.errors?.country?.message}
                </StyledAccountInformationTabFormHelperText>
              )}
            </StyledConfigurationTabFormItem>
          </Grid>
          <Grid item xs={12} lg={4}>
            {/* Amazon Flex Passsword Field */}
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Amazon Flex Password
              </StyledConfigurationTabFormLabel>
              <Controller
                name={"amznFlexPassword"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <StyledConfigurationTabFormField
                    autoComplete="new-password"
                    type={isPasswordHidden ? "password" : "text"}
                    value={value}
                    onChange={onChange}
                    placeholder="Password here"
                    endAdornment={
                      <IconButton
                        size="small"
                        onClick={handleToggleHidePassword}
                        sx={{ mr: rem("8px") }}
                      >
                        {isPasswordHidden ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    }
                  />
                )}
              />
              {!!formState.errors?.amznFlexPassword && (
                <StyledAccountInformationTabFormHelperText>
                  {formState.errors?.amznFlexPassword?.message}
                </StyledAccountInformationTabFormHelperText>
              )}
            </StyledConfigurationTabFormItem>
            {/* Refresh Token Textarea */}
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Refresh Token
              </StyledConfigurationTabFormLabel>
              <Controller
                name={"refreshToken"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <StyledConfigurationTabFormField
                    multiline
                    minRows={3}
                    value={value}
                    onChange={onChange}
                    placeholder="Type..."
                  />
                )}
              />
              {!!formState.errors?.refreshToken && (
                <StyledAccountInformationTabFormHelperText>
                  {formState.errors?.refreshToken?.message}
                </StyledAccountInformationTabFormHelperText>
              )}
            </StyledConfigurationTabFormItem>
            {/* Region Drop-down */}
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Region
              </StyledConfigurationTabFormLabel>
              <Controller
                name={"region"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    displayEmpty
                    value={value}
                    onChange={onChange}
                    input={<StyledConfigurationTabFormField />}
                    disabled={!getValues("country")}
                  >
                    <MenuItem disabled value="">
                      <StyledPlaceholder>Choose region here</StyledPlaceholder>
                    </MenuItem>
                    {regionOptionsJSX}
                  </Select>
                )}
              />
              {!!formState.errors?.region && (
                <StyledAccountInformationTabFormHelperText>
                  {formState.errors?.region?.message}
                </StyledAccountInformationTabFormHelperText>
              )}
            </StyledConfigurationTabFormItem>
          </Grid>
          <Grid item xs={12} lg={4}>
            {/* Flex ID Field */}
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Flex ID
              </StyledConfigurationTabFormLabel>
              <Controller
                name={"flexID"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <StyledConfigurationTabFormField
                    value={value}
                    onChange={onChange}
                    placeholder="Flex ID"
                  />
                )}
              />
              {!!formState.errors?.flexID && (
                <StyledAccountInformationTabFormHelperText>
                  {formState.errors?.flexID?.message}
                </StyledAccountInformationTabFormHelperText>
              )}
            </StyledConfigurationTabFormItem>
            {/* User Agent Textarea */}
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                User Agent
              </StyledConfigurationTabFormLabel>
              <Controller
                name={"userAgent"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <StyledConfigurationTabFormField
                    multiline
                    minRows={3}
                    value={value}
                    onChange={onChange}
                    placeholder="Type..."
                  />
                )}
              />
              {!!formState.errors?.userAgent && (
                <StyledAccountInformationTabFormHelperText>
                  {formState.errors?.userAgent?.message}
                </StyledAccountInformationTabFormHelperText>
              )}
            </StyledConfigurationTabFormItem>
          </Grid>
        </Grid>

        {/* Tab Actions */}
        <StyledConfigurationTabFormActions>
          <OutlinedButton
            grey
            sx={{ mr: rem("12px") }}
            onClick={props.handleCancel}
          >
            Cancel
          </OutlinedButton>
          <ContainedButton type="submit">Save</ContainedButton>
        </StyledConfigurationTabFormActions>
      </StyledConfigurationTabForm>
    </StyledConfigurationTab>
  )
}

export default ConfigurationTab
