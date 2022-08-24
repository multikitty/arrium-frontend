import React, { useState } from "react"
import {
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
import { Controller, useForm } from "react-hook-form"
import { StyledPlaceholder } from "../commons/uiComponents"
import { useCustomerConfigInfo } from "@/agent/customers"
import LoadingScreen from "../LoadingScreen"

interface IConfigurationTabProps extends ITabProps {
  pk: string
}

const ConfigurationTab = (props: IConfigurationTabProps) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const { data: configData, isLoading } = useCustomerConfigInfo({
    pk: props.pk,
  })

  const handleToggleHidePassword = () => {
    setIsPasswordHidden(p => !p)
  }

  type formPropType = typeof customerConfigOptions.defaultValues

  const { handleSubmit, control, formState, reset } = useForm<formPropType>(
    customerConfigOptions
  )

  const onSubmit = (data: formPropType) => {
    console.log("Config Info form data", data)
    reset()
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
                    <MenuItem value="iphone 12 pro">iPhone 12 Pro</MenuItem>
                    <MenuItem value="iphone 13 pro">iPhone 13 Pro</MenuItem>
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
              ,
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
                    <MenuItem value="12.4">12.4</MenuItem>
                    <MenuItem value="12.8">12.8</MenuItem>
                    <MenuItem value="13.0">13.0</MenuItem>
                    <MenuItem value="14.8">14.8</MenuItem>
                    <MenuItem value="15">15</MenuItem>
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
                    <MenuItem value="14.0.1">14.0.1</MenuItem>
                    <MenuItem value="17.8.1">17.8.1</MenuItem>
                    <MenuItem value="17.8.2">17.8.2</MenuItem>
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
                    <MenuItem value="UK">Great Britain</MenuItem>
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
                  >
                    <MenuItem disabled value="">
                      <StyledPlaceholder>Choose region here</StyledPlaceholder>
                    </MenuItem>
                    <MenuItem value="London">London</MenuItem>
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
                    <MenuItem value="Logistic">Logistic</MenuItem>
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
          <ContainedButton onClick={props.handleSave}>Save</ContainedButton>
        </StyledConfigurationTabFormActions>
      </StyledConfigurationTabForm>
    </StyledConfigurationTab>
  )
}

export default ConfigurationTab
