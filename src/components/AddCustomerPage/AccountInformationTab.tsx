import {
  Box,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material"
import { rem } from "polished"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { ContainedButton, OutlinedButton } from "../commons/Button"
import {
  StyledAccountInformatiomTabContentField,
  StyledAccountInformationTab,
  StyledAccountInformationTabForm,
  StyledAccountInformationTabFormActions,
  StyledAccountInformationTabFormHelperText,
  StyledAccountInformationTabFormLabel,
} from "./AddCustomerPage.styled"
import ReactPhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/material.css"
import TimeZoneSelect from "react-timezone-select"
import { makeStyles } from "@mui/styles"
import theme from "@/theme"
import { accountInformationFormOptions } from "@/validation"

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

const AccountInformationTab: React.FC = () => {
  const classes = useStyles()

  const generateRadioOptions = () => {
    return radioOptions.map(singleOption => (
      <FormControlLabel
        value={singleOption.value}
        label={singleOption.label}
        control={<Radio sx={{ color: theme.palette.main }} />}
      />
    ))
  }

  const { handleSubmit, control, formState, reset } = useForm(
    accountInformationFormOptions
  )

  const onSubmit = (data: any) => {
    console.log("Personal Information form data", data)
    reset()
  }

  return (
    <StyledAccountInformationTab>
      <StyledAccountInformationTabForm onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={4}>
            <Box display="flex" flexDirection="column">
              {/* Customer Id Field */}
              <Box mb={rem("24px")}>
                <StyledAccountInformationTabFormLabel>
                  Customer Id
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
                      onChange={onChange}
                      value={value}
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
                  render={({ field: { onChange, value } }) => (
                    <StyledAccountInformatiomTabContentField
                      onChange={onChange}
                      value={value}
                      error={!!formState.errors?.startDate}
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
                      onChange={onChange}
                      value={value}
                      error={!!formState.errors?.role}
                      input={
                        <StyledAccountInformatiomTabContentField roleField />
                      }
                    >
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="driver">Driver</MenuItem>
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
                  render={({ field: { onChange, value } }) => (
                    <StyledAccountInformatiomTabContentField
                      onChange={onChange}
                      value={value}
                      error={!!formState.errors?.endDate}
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
                      input={<StyledAccountInformatiomTabContentField />}
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

export default AccountInformationTab
