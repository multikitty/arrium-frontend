import React, { useState } from "react"
import {
  Box,
  capitalize,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Select,
} from "@mui/material"
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
import { ContainedButton, OutlinedButton } from "../commons/Button"
import { ITabProps } from "./AccountInformationTab"
import { Plans } from "@/constants/common"
import customerConfigOptions from "@/validation/customerConfig"
import { Controller, useForm, useWatch } from "react-hook-form"
import { StyledPlaceholder } from "../commons/uiComponents"
import {
  updateConfigurationDetails,
  useCustomerConfigInfo,
} from "@/agent/customers"
import LoadingScreen from "../LoadingScreen"
import {
  useFlexVersionList,
  useOsVersionList,
  usePhoneModelList,
} from "@/agent/models"
import { useCountryList, useRegionList } from "@/agent/locations"
import { useStationTypeList } from "@/agent/stationTypes"
import { useMutation } from "react-query"
import {
  IUpdateConfigurationDetailsResult,
  IUpdateConfigurationDetailsVariables,
} from "@/lib/interfaces/customers"
import { useSnackbar } from "notistack"
import { Script } from "gatsby"

interface IConfigurationTabProps extends ITabProps {
  pk: string
}

const ConfigurationTab = (props: IConfigurationTabProps) => {
  const { enqueueSnackbar } = useSnackbar()
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const {
    data: configData,
    isLoading,
    refetch: refetchConfigInfo,
  } = useCustomerConfigInfo({
    pk: props.pk,
  })
  const { data: phoneModelListData } = usePhoneModelList()
  const { data: osVersionListData } = useOsVersionList()
  const { data: flexVersionListData } = useFlexVersionList()
  const { data: stationTypeListData } = useStationTypeList()
  const { data: countryListData } = useCountryList()
  const { mutate: configurationDetailsMutate } = useMutation<
    IUpdateConfigurationDetailsResult,
    Error,
    IUpdateConfigurationDetailsVariables
  >(updateConfigurationDetails)

  type formPropType = typeof customerConfigOptions.defaultValues
  const { handleSubmit, control, formState, reset, getValues } =
    useForm<formPropType>(customerConfigOptions)
  useWatch({ name: "country", control })

  const { data: regionListData } = useRegionList(getValues("country"))

  const handleToggleHidePassword = () => {
    setIsPasswordHidden(p => !p)
  }

  const handleSave = (variables: IUpdateConfigurationDetailsVariables) => {
    configurationDetailsMutate(variables, {
      onSuccess({ success, message, validationError }) {
        if (!success) {
          enqueueSnackbar(
            validationError?.amznId ||
              validationError?.awsReg1 ||
              validationError?.awsReg2 ||
              validationError?.blockType ||
              validationError?.cogId1 ||
              validationError?.cogId2 ||
              validationError?.country ||
              validationError?.devId ||
              validationError?.devModel ||
              validationError?.devSerialNumber ||
              validationError?.devType ||
              validationError?.flexId ||
              validationError?.flexPassword ||
              validationError?.flexUser ||
              validationError?.flexVersion ||
              validationError?.osVersion ||
              validationError?.planName ||
              validationError?.region ||
              validationError?.userPk ||
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
  }

  const deviceModelOptionsJSX = (phoneModelListData?.data?.Items || []).map(
    model => (
      <MenuItem value={model.ModelName} key={model.ModelID}>
        {model.ModelName}
      </MenuItem>
    )
  )

  const osVersionOptionsJSX = (osVersionListData?.data?.Items || []).map(
    version => (
      <MenuItem value={version.osVersion} key={version.osVersion}>
        {version.osVersion}
      </MenuItem>
    )
  )

  const flexVersionOptionsJSX = (flexVersionListData?.data?.Items || []).map(
    version => (
      <MenuItem value={version.flexVersion} key={version.flexVersion}>
        {version.flexVersion}
      </MenuItem>
    )
  )

  const planTypeOptionsJSX = (stationTypeListData?.data?.Items || []).map(
    plan => (
      <MenuItem value={plan.stationType} key={plan.stationType}>
        {plan.stationType}
      </MenuItem>
    )
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

  const onSubmit = (data: formPropType) => {
    handleSave({
      amznId: data["amznID"],
      awsReg1: data["awsreg1"],
      awsReg2: data["awsreg2"],
      blockType: data["blockType"],
      cogId1: data["cogid1"],
      cogId2: data["cogid2"],
      country: data["country"],
      devId: data["devID"],
      devModel: data["devModel"],
      devSerialNumber: data["devSerial"],
      devType: data["devType"],
      flexId: data["flexID"],
      flexVersion: data["flexVersion"],
      flexUser: data["amznFlexUser"],
      flexPassword: data["amznFlexPassword"],
      osVersion: data["osVersion"],
      planName: data["planName"],
      region: data["region"],
      userPk: props.pk,
    })
  }

  React.useEffect(() => {
    if (!configData?.data) return
    reset({
      amznFlexPassword: configData.data.amznFlexPassword,
      amznFlexUser: configData.data.amznFlexUser,
      amznID: configData.data.amznID,
      awsreg1: configData.data.awsreg1,
      awsreg2: configData.data.awsreg2,
      blockType: configData.data.blockType,
      cogid1: configData.data.cogid1,
      cogid2: configData.data.cogid2,
      country: configData.data.country,
      devID: configData.data.devID,
      devModel: configData.data.devModel,
      devSerial: configData.data.devSerial,
      devType: configData.data.devType,
      flexID: configData.data.flexID,
      flexVersion: configData.data.flexVersion,
      osVersion: configData.data.osVersion,
      planName: configData.data.planName,
      region: configData.data.region,
    })
  }, [configData])

  if (isLoading) return <LoadingScreen />

  return (
    <StyledConfigurationTab>
      <StyledConfigurationTabForm onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} sx={{ p: rem("8px") }}>
          <Grid item xs={12} lg={4}>
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
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Device Model
              </StyledConfigurationTabFormLabel>
              <Controller
                name={"devModel"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    displayEmpty
                    value={value}
                    onChange={onChange}
                    input={<StyledConfigurationTabFormField />}
                  >
                    <MenuItem disabled value="">
                      <StyledPlaceholder>Choose Device Model</StyledPlaceholder>
                    </MenuItem>
                    {deviceModelOptionsJSX}
                  </Select>
                )}
              />
              {!!formState.errors?.devModel && (
                <StyledAccountInformationTabFormHelperText>
                  {formState.errors?.devModel?.message}
                </StyledAccountInformationTabFormHelperText>
              )}
            </StyledConfigurationTabFormItem>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Device ID
              </StyledConfigurationTabFormLabel>
              <Controller
                name={"devID"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <StyledConfigurationTabFormField
                    value={value}
                    onChange={onChange}
                    placeholder="Device ID"
                  />
                )}
              />
              {!!formState.errors?.devID && (
                <StyledAccountInformationTabFormHelperText>
                  {formState.errors?.devID?.message}
                </StyledAccountInformationTabFormHelperText>
              )}
            </StyledConfigurationTabFormItem>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                OS version
              </StyledConfigurationTabFormLabel>
              <Controller
                name={"osVersion"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    displayEmpty
                    value={value}
                    onChange={onChange}
                    input={<StyledConfigurationTabFormField />}
                  >
                    <MenuItem disabled value="">
                      <StyledPlaceholder>Choose OS version</StyledPlaceholder>
                    </MenuItem>
                    {osVersionOptionsJSX}
                  </Select>
                )}
              />
              {!!formState.errors?.osVersion && (
                <StyledAccountInformationTabFormHelperText>
                  {formState.errors?.osVersion?.message}
                </StyledAccountInformationTabFormHelperText>
              )}
            </StyledConfigurationTabFormItem>
          </Grid>
          <Grid item xs={12} lg={4}>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Amazon Flex Password
              </StyledConfigurationTabFormLabel>
              <Box display="flex" alignItems="center">
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
                <Box display="flex" justifyContent="center" ml={1}>
                  <a id="LoginWithAmazon">
                    <img
                      alt="Login with Amazon"
                      src="https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_drkgry_76x32.png"
                      width="76"
                      height="32"
                    />
                  </a>
                </Box>
                <Script
                  strategy="idle"
                  type="text/javascript"
                  id="amazon-sdk"
                  dangerouslySetInnerHTML={{
                    __html: `
                      document.getElementById('LoginWithAmazon').onclick = function() {
                        setTimeout(window.doLogin, 1);
                        return false;
                      };
                      window.doLogin = function() {
                          options = {};
                          options.scope = 'profile';
                          options.pkce = true;
                          amazon.Login.authorize(options, function(response) {
                              if ( response.error ) {
                                  alert('oauth error ' + response.error);
                              return;
                              }
                              amazon.Login.retrieveToken(response.code, function(response) {
                                  if ( response.error ) {
                                      alert('oauth error ' + response.error);
                                  return;
                                  }
                                  amazon.Login.retrieveProfile(response.access_token, function(response) {
                                      alert('Hello, ' + response.profile.Name);
                                      alert('Your e-mail address is ' + response.profile.PrimaryEmail);
                                      alert('Your unique ID is ' + response.profile.CustomerId);
                                      if ( window.console && window.console.log )
                                        window.console.log(response);
                                  });
                              });
                          });
                    };
                  `,
                  }}
                ></Script>
              </Box>
            </StyledConfigurationTabFormItem>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Device type
              </StyledConfigurationTabFormLabel>
              <Controller
                name={"devType"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    displayEmpty
                    value={value}
                    onChange={onChange}
                    input={<StyledConfigurationTabFormField />}
                  >
                    <MenuItem disabled value="">
                      <StyledPlaceholder>Choose Device type</StyledPlaceholder>
                    </MenuItem>
                    <MenuItem value="Smartphone">Smartphone</MenuItem>
                    <MenuItem value="Tablet">Tablet</MenuItem>
                  </Select>
                )}
              />
              {!!formState.errors?.devType && (
                <StyledAccountInformationTabFormHelperText>
                  {formState.errors?.devType?.message}
                </StyledAccountInformationTabFormHelperText>
              )}
            </StyledConfigurationTabFormItem>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Device serial number
              </StyledConfigurationTabFormLabel>
              <Controller
                name={"devSerial"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <StyledConfigurationTabFormField
                    value={value}
                    onChange={onChange}
                    placeholder="Device serial number"
                  />
                )}
              />
              {!!formState.errors?.devSerial && (
                <StyledAccountInformationTabFormHelperText>
                  {formState.errors?.devSerial?.message}
                </StyledAccountInformationTabFormHelperText>
              )}
            </StyledConfigurationTabFormItem>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Flex version
              </StyledConfigurationTabFormLabel>
              <Controller
                name={"flexVersion"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    displayEmpty
                    value={value}
                    onChange={onChange}
                    input={<StyledConfigurationTabFormField />}
                  >
                    <MenuItem disabled value="">
                      <StyledPlaceholder>Choose Flex version</StyledPlaceholder>
                    </MenuItem>
                    {flexVersionOptionsJSX}
                  </Select>
                )}
              />
              {!!formState.errors?.flexVersion && (
                <StyledAccountInformationTabFormHelperText>
                  {formState.errors?.flexVersion?.message}
                </StyledAccountInformationTabFormHelperText>
              )}
            </StyledConfigurationTabFormItem>
          </Grid>
          <Grid item xs={12} lg={4}></Grid>
        </Grid>
        <Divider />
        <Grid container spacing={2} sx={{ p: rem("8px"), mt: rem("24px") }}>
          <Grid item xs={12} lg={4}>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                AWS Region
              </StyledConfigurationTabFormLabel>
              <Controller
                name={"awsreg1"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    displayEmpty
                    value={value}
                    onChange={onChange}
                    input={<StyledConfigurationTabFormField />}
                  >
                    <MenuItem disabled value="">
                      <StyledPlaceholder>Choose region here</StyledPlaceholder>
                    </MenuItem>
                    <MenuItem value="us-east-1">us-east-1</MenuItem>
                    <MenuItem value="us-west-1">us-west-1</MenuItem>
                  </Select>
                )}
              />
              {!!formState.errors?.awsreg1 && (
                <StyledAccountInformationTabFormHelperText>
                  {formState.errors?.awsreg1?.message}
                </StyledAccountInformationTabFormHelperText>
              )}
            </StyledConfigurationTabFormItem>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                AWS Region
              </StyledConfigurationTabFormLabel>
              <Controller
                name={"awsreg2"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    displayEmpty
                    value={value}
                    onChange={onChange}
                    input={<StyledConfigurationTabFormField />}
                  >
                    <MenuItem disabled value="">
                      <StyledPlaceholder>Choose region here</StyledPlaceholder>
                    </MenuItem>
                    <MenuItem value="us-east-1">us-east-1</MenuItem>
                    <MenuItem value="us-west-1">us-west-1</MenuItem>
                  </Select>
                )}
              />
              {!!formState.errors?.awsreg2 && (
                <StyledAccountInformationTabFormHelperText>
                  {formState.errors?.awsreg2?.message}
                </StyledAccountInformationTabFormHelperText>
              )}
            </StyledConfigurationTabFormItem>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Amazon ID
              </StyledConfigurationTabFormLabel>
              <Controller
                name={"amznID"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <StyledConfigurationTabFormField
                    value={value}
                    onChange={onChange}
                    placeholder="Amazon ID"
                  />
                )}
              />
              {!!formState.errors?.amznID && (
                <StyledAccountInformationTabFormHelperText>
                  {formState.errors?.amznID?.message}
                </StyledAccountInformationTabFormHelperText>
              )}
            </StyledConfigurationTabFormItem>
          </Grid>
          <Grid item xs={12} lg={4}>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Cognito ID (1)
              </StyledConfigurationTabFormLabel>
              <Controller
                name={"cogid1"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <StyledConfigurationTabFormField
                    value={value}
                    onChange={onChange}
                    placeholder="Cognito ID (1)"
                  />
                )}
              />
              {!!formState.errors?.cogid1 && (
                <StyledAccountInformationTabFormHelperText>
                  {formState.errors?.cogid1?.message}
                </StyledAccountInformationTabFormHelperText>
              )}
            </StyledConfigurationTabFormItem>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Cognito ID (2)
              </StyledConfigurationTabFormLabel>
              <Controller
                name={"cogid2"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <StyledConfigurationTabFormField
                    value={value}
                    onChange={onChange}
                    placeholder="Cognito ID (2)"
                  />
                )}
              />
              {!!formState.errors?.cogid2 && (
                <StyledAccountInformationTabFormHelperText>
                  {formState.errors?.cogid2?.message}
                </StyledAccountInformationTabFormHelperText>
              )}
            </StyledConfigurationTabFormItem>
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
          </Grid>
          <Grid item xs={12} lg={4}></Grid>
        </Grid>
        <Divider />
        <Grid container spacing={2} sx={{ p: rem("8px"), mt: rem("24px") }}>
          {/* Country Drop-down */}
          <Grid item xs={12} lg={4}>
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
          {/* Region Drop-down */}
          <Grid item xs={12} lg={4}>
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
          <Grid item xs={12} lg={4}></Grid>
          {/* Plan Name Drop-down */}
          <Grid item xs={12} lg={4}>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Plan Name
              </StyledConfigurationTabFormLabel>
              <Controller
                name={"planName"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    displayEmpty
                    value={value}
                    onChange={onChange}
                    input={<StyledConfigurationTabFormField />}
                  >
                    <MenuItem disabled value="">
                      <StyledPlaceholder>
                        Choose Plan Name here
                      </StyledPlaceholder>
                    </MenuItem>
                    <MenuItem value={Plans.basic}>
                      {capitalize(Plans.basic)}
                    </MenuItem>
                    <MenuItem value={Plans.premium}>
                      {capitalize(Plans.premium)}
                    </MenuItem>
                  </Select>
                )}
              />
              {!!formState.errors?.planName && (
                <StyledAccountInformationTabFormHelperText>
                  {formState.errors?.planName?.message}
                </StyledAccountInformationTabFormHelperText>
              )}
            </StyledConfigurationTabFormItem>
          </Grid>
          {/* Plan Type Drop-down */}
          <Grid item xs={12} lg={4}>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Plan type
              </StyledConfigurationTabFormLabel>
              <Controller
                name={"blockType"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    displayEmpty
                    value={value}
                    onChange={onChange}
                    input={<StyledConfigurationTabFormField />}
                  >
                    <MenuItem disabled value="">
                      <StyledPlaceholder>Choose Plan type</StyledPlaceholder>
                    </MenuItem>
                    {planTypeOptionsJSX}
                  </Select>
                )}
              />
              {!!formState.errors?.blockType && (
                <StyledAccountInformationTabFormHelperText>
                  {formState.errors?.blockType?.message}
                </StyledAccountInformationTabFormHelperText>
              )}
            </StyledConfigurationTabFormItem>
          </Grid>
          <Grid item xs={12} lg={4}></Grid>
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
