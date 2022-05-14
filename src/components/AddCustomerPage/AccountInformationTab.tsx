import React from "react"
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
import { Controller, useForm } from "react-hook-form"
import ReactPhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/material.css"
import TimeZoneSelect from "react-timezone-select"
import { makeStyles } from "@mui/styles"

import { ContainedButton, OutlinedButton } from "@/components/commons/Button"
import {
  StyledAccountInformatiomTabContentField,
  StyledAccountInformationTab,
  StyledAccountInformationTabForm,
  StyledAccountInformationTabFormActions,
  StyledAccountInformationTabFormHelperText,
  StyledAccountInformationTabFormLabel,
} from "./AddCustomerPage.styled"
import theme from "@/theme"
import { accountInformationFormOptions } from "@/validation"
import { UserRolesType } from "@/types/common"
import { LabelledUserRoles, UserRoles } from "@/constants/common"
import { TabType } from "./AddCustomersPage.data"
import { navigateToAddCustomerPage } from "@/utils/navigateWithQuery"

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

interface IProps {
  tab: TabType
  role: UserRolesType
  setRole: React.Dispatch<
    React.SetStateAction<"driver" | "admin" | "salesAgent">
  >
}

const AccountInformationTab: React.FC<IProps> = ({ tab, role, setRole }) => {
  const classes = useStyles()

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

  type formPropType = typeof accountInformationFormOptions.defaultValues
  const { handleSubmit, control, formState, reset, setValue } =
    useForm<formPropType>({
      resolver: accountInformationFormOptions.resolver,
      defaultValues: {
        ...accountInformationFormOptions.defaultValues,
        role,
      },
    })

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
              <Box mb={rem("35px")}>
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
