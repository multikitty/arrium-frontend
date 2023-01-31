import React, { useState } from "react"
import { Box, Grid, IconButton, MenuItem, Select } from "@mui/material"
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
import { TabProps } from "./AccountInformationTab"
import customerConfigOptions from "@/validation/customerConfig"
import { Controller, useForm, useWatch } from "react-hook-form"
import { StyledPlaceholder } from "../commons/uiComponents"
import { useCustomerConfigInfo } from "@/agent/customers"
import LoadingScreen from "../LoadingScreen"
import { useCountryList, useRegionList } from "@/agent/locations"
import { Script } from "gatsby"

interface ConfigurationTabProps extends TabProps {
  pk: string
  sk: string
}

const ConfigurationTab = (props: ConfigurationTabProps) => {
  // const { enqueueSnackbar } = useSnackbar()
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const {
    data: configData,
    isLoading,
    // refetch: refetchConfigInfo,
  } = useCustomerConfigInfo({
    pk: props.pk,
  })
  const { data: countryListData } = useCountryList()
  // const { mutate: configurationDetailsMutate } = useMutation<
  //   IUpdateConfigurationDetailsResult,
  //   Error,
  //   IUpdateConfigurationDetailsVariables
  // >(updateConfigurationDetails)

  type FormPropType = typeof customerConfigOptions.defaultValues
  const { handleSubmit, control, formState, reset, getValues } =
    useForm<FormPropType>(customerConfigOptions)
  useWatch({ name: "country", control })

  const { data: regionListData } = useRegionList(getValues("country"))

  const handleToggleHidePassword = () => {
    setIsPasswordHidden(p => !p)
  }

  // const handleSave = useCallback(
  //   (variables: IUpdateConfigurationDetailsVariables) => {
  //     configurationDetailsMutate(variables, {
  //       onSuccess({ success, message, validationError }) {
  //         if (!success) {
  //           enqueueSnackbar(
  //             validationError?.amznId ||
  //               validationError?.awsReg1 ||
  //               validationError?.awsReg2 ||
  //               validationError?.blockType ||
  //               validationError?.cogId1 ||
  //               validationError?.cogId2 ||
  //               validationError?.country ||
  //               validationError?.devId ||
  //               validationError?.devModel ||
  //               validationError?.devSerialNumber ||
  //               validationError?.devType ||
  //               validationError?.flexId ||
  //               validationError?.flexPassword ||
  //               validationError?.flexUser ||
  //               validationError?.flexVersion ||
  //               validationError?.osVersion ||
  //               validationError?.planName ||
  //               validationError?.region ||
  //               validationError?.userPk ||
  //               message,
  //             {
  //               variant: "error",
  //             }
  //           )
  //           return
  //         }
  //         enqueueSnackbar(message, { variant: "success" })
  //         refetchConfigInfo()
  //       },
  //       onError(error, variables) {
  //         enqueueSnackbar(error.message, { variant: "error" })
  //         console.error("ERROR:", error)
  //         console.log("VARIABLES USED:", variables)
  //       },
  //     })
  //   },
  //   [configurationDetailsMutate, refetchConfigInfo]
  // )

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

  const onSubmit = () =>
    // data: FormPropType
    {
      // handleSave({
      //   amznId: data["amznID"],
      //   awsReg1: data["awsreg1"],
      //   awsReg2: data["awsreg2"],
      //   blockType: data["blockType"],
      //   cogId1: data["cogid1"],
      //   cogId2: data["cogid2"],
      //   country: data["country"],
      //   devId: data["devID"],
      //   devModel: data["devModel"],
      //   devSerialNumber: data["devSerial"],
      //   devType: data["devType"],
      //   flexId: data["flexID"],
      //   flexVersion: data["flexVersion"],
      //   flexUser: data["amznFlexUser"],
      //   flexPassword: data["amznFlexPassword"],
      //   osVersion: data["osVersion"],
      //   planName: data["planName"],
      //   region: data["region"],
      //   userPk: props.pk,
      // })
    }

  React.useEffect(() => {
    if (!configData?.data) return
    reset({
      amznFlexPassword: configData.data.amznFlexPassword,
      amznFlexUser: configData.data.amznFlexUser,
      flexID: configData.data.flexID,
      country: configData.data.country,
      region: configData.data.region,
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
            {/* LWA Button */}
            <StyledConfigurationTabFormItem>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight={81}
                sx={{ "& a": { cursor: "pointer" } }}
              >
                <a id="LoginWithAmazon">
                  <img
                    alt="Login with Amazon"
                    src="https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_312x64.png"
                    width="233"
                    height="48"
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
                                // alert('Login with Amazon error ' + response.error);
                                return;
                              }
                              amazon.Login.retrieveToken(response.code, function(response) {
                                  if ( response.error ) {
                                    // alert('Login with Amazon error ' + response.error);
                                    return;
                                  }
                                  console.log("response for LWA", response);
                                  amazon.Login.retrieveProfile(response.access_token, function(response) {
                                      // alert('Hello, ' + response.profile.Name);
                                      // alert('Your e-mail address is ' + response.profile.PrimaryEmail);
                                      // alert('Your unique ID is ' + response.profile.CustomerId);
                                      if ( window.console && window.console.log )
                                        window.console.log(response);
                                      const body = {
                                        userPk: "${props.pk}",
                                        userSk: "${props.sk}",
                                        accessToken: response.access_token,
                                        refreshToken: response.refresh_token
                                      }
                                      if ( window.fetch ) {
                                        window.fetch("https://api.arrium.io/v1/user/flex-details/update", {
                                          method: "PUT",
                                          body
                                        })
                                      }
                                  });
                              });
                          });
                    };
                  `,
                }}
              ></Script>
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
