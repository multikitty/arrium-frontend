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

const ConfigurationTab = (props: ITabProps) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)

  const handleToggleHidePassword = () => {
    setIsPasswordHidden(p => !p)
  }

  type formPropType = typeof customerConfigOptions.defaultValues

  const { handleSubmit, control, formState, getValues, setValue, reset } =
    useForm<formPropType>(customerConfigOptions)

  const onSubmit = (data: formPropType) => {
    console.log("Config Info form data", data)
    reset()
  }

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
                    <MenuItem value="iphone 12 pro">iPhone 13 Pro</MenuItem>
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
              <StyledConfigurationTabFormField
                type={isPasswordHidden ? "password" : "text"}
                defaultValue="idekwhatitis"
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
            </StyledConfigurationTabFormItem>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Device type
              </StyledConfigurationTabFormLabel>
              <Select
                defaultValue="Smartphone"
                input={<StyledConfigurationTabFormField />}
              >
                <MenuItem value="Smartphone">Smartphone</MenuItem>
                <MenuItem value="Tablet">Tablet</MenuItem>
              </Select>
            </StyledConfigurationTabFormItem>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Device serial number
              </StyledConfigurationTabFormLabel>
              <StyledConfigurationTabFormField defaultValue="J82744HK82374LC" />
            </StyledConfigurationTabFormItem>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Flex version
              </StyledConfigurationTabFormLabel>
              <Select
                defaultValue="14.0.1"
                input={<StyledConfigurationTabFormField />}
              >
                <MenuItem value="14.0.1">14.0.1</MenuItem>
                <MenuItem value="17.8.1">17.8.1</MenuItem>
                <MenuItem value="17.8.2">17.8.2</MenuItem>
              </Select>
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
              <Select
                defaultValue="none"
                input={<StyledConfigurationTabFormField />}
              >
                <MenuItem disabled value="none">
                  Choose region here
                </MenuItem>
                <MenuItem value="us-east-1">us-east-1</MenuItem>
                <MenuItem value="us-west-1">us-west-1</MenuItem>
              </Select>
            </StyledConfigurationTabFormItem>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                AWS Region
              </StyledConfigurationTabFormLabel>
              <Select
                defaultValue="none"
                input={<StyledConfigurationTabFormField />}
              >
                <MenuItem disabled value="none">
                  Choose region here
                </MenuItem>
                <MenuItem value="us-east-1">us-east-1</MenuItem>
                <MenuItem value="us-west-1">us-west-1</MenuItem>
              </Select>
            </StyledConfigurationTabFormItem>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Amazon ID
              </StyledConfigurationTabFormLabel>
              <StyledConfigurationTabFormField defaultValue="C123J456" />
            </StyledConfigurationTabFormItem>
          </Grid>
          <Grid item xs={12} lg={4}>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Cognito ID (1)
              </StyledConfigurationTabFormLabel>
              <StyledConfigurationTabFormField defaultValue="HFSDUEYWWS" />
            </StyledConfigurationTabFormItem>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Cognito ID (2)
              </StyledConfigurationTabFormLabel>
              <StyledConfigurationTabFormField defaultValue="KSGDSFTYASL" />
            </StyledConfigurationTabFormItem>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Flex ID
              </StyledConfigurationTabFormLabel>
              <StyledConfigurationTabFormField defaultValue="sjf8345df9086" />
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
              <Select
                defaultValue="UK"
                input={<StyledConfigurationTabFormField />}
              >
                <MenuItem value="UK">Great Britain</MenuItem>
              </Select>
            </StyledConfigurationTabFormItem>
          </Grid>
          {/* Region Drop-down */}
          <Grid item xs={12} lg={4}>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Region
              </StyledConfigurationTabFormLabel>
              <Select
                defaultValue="London"
                input={<StyledConfigurationTabFormField />}
              >
                <MenuItem value="London">London</MenuItem>
              </Select>
            </StyledConfigurationTabFormItem>
          </Grid>
          <Grid item xs={12} lg={4}></Grid>
          {/* Plan Name Drop-down */}
          <Grid item xs={12} lg={4}>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Plan Name
              </StyledConfigurationTabFormLabel>
              <Select
                defaultValue={Plans.basic}
                input={<StyledConfigurationTabFormField />}
              >
                <MenuItem value={Plans.basic}>
                  {capitalize(Plans.basic)}
                </MenuItem>
                <MenuItem value={Plans.premium}>
                  {capitalize(Plans.premium)}
                </MenuItem>
              </Select>
            </StyledConfigurationTabFormItem>
          </Grid>
          {/* Block Type Drop-down */}
          <Grid item xs={12} lg={4}>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Block type
              </StyledConfigurationTabFormLabel>
              <Select
                defaultValue="Logistic"
                input={<StyledConfigurationTabFormField />}
              >
                <MenuItem disabled value="Logistic">
                  Logistic
                </MenuItem>
              </Select>
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
