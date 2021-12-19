import React from "react"
import { Controller, useForm } from "react-hook-form"
import { personalInformationFormOptions } from "../../validation"
import {
  StyledProfileTabContent,
  StyledProfileTabContentActionButtons,
  StyledProfileTabContentBody,
  StyledProfileTabContentField,
  StyledProfileTabContentFieldHelperText,
  StyledProfileTabContentFieldLabel,
} from "./ProfilePage.styled"
import { Box, Grid } from "@mui/material"
import { rem } from "polished"
import { ContainedButton, OutlinedButton } from "../commons/Button"
import theme from "../../theme"

const ProfileTabContent = () => {
  const { handleSubmit, control, formState, reset } = useForm(
    personalInformationFormOptions
  )

  type formPropType = typeof personalInformationFormOptions.defaultValues

  const onSubmit = (data: formPropType) => {
    console.log("Personal Information form data", data)
    reset()
  }

  return (
    <StyledProfileTabContent>
      <StyledProfileTabContentBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container rowSpacing={3} columnSpacing={2}>
            <Grid item xs={12}>
              <StyledProfileTabContentFieldLabel>
                Name
              </StyledProfileTabContentFieldLabel>
              <Controller
                name={"name"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <StyledProfileTabContentField
                    onChange={onChange}
                    value={value}
                    error={!!formState.errors?.name}
                  />
                )}
              />
              {!!formState.errors?.name && (
                <StyledProfileTabContentFieldHelperText>
                  {formState.errors?.name?.message}
                </StyledProfileTabContentFieldHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <StyledProfileTabContentFieldLabel>
                Surname
              </StyledProfileTabContentFieldLabel>
              <Controller
                name={"surName"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <StyledProfileTabContentField
                    onChange={onChange}
                    value={value}
                    error={!!formState.errors?.surName}
                  />
                )}
              />
              {!!formState.errors?.surName && (
                <StyledProfileTabContentFieldHelperText>
                  {formState.errors?.surName?.message}
                </StyledProfileTabContentFieldHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <StyledProfileTabContentFieldLabel>
                Email
              </StyledProfileTabContentFieldLabel>
              <Controller
                name={"email"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <StyledProfileTabContentField
                    type="email"
                    onChange={onChange}
                    value={value}
                    error={!!formState.errors?.email}
                  />
                )}
              />
              {!!formState.errors?.email && (
                <StyledProfileTabContentFieldHelperText>
                  {formState.errors?.email?.message}
                </StyledProfileTabContentFieldHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <StyledProfileTabContentFieldLabel>
                Phone number
              </StyledProfileTabContentFieldLabel>
              <Controller
                name={"phoneNumber"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <StyledProfileTabContentField
                    onChange={onChange}
                    value={value}
                    error={!!formState.errors?.phoneNumber}
                  />
                )}
              />
              {!!formState.errors?.phoneNumber && (
                <StyledProfileTabContentFieldHelperText>
                  {formState.errors?.phoneNumber?.message}
                </StyledProfileTabContentFieldHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <StyledProfileTabContentFieldLabel>
                Timezone
              </StyledProfileTabContentFieldLabel>
              <Controller
                name={"timezone"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <StyledProfileTabContentField
                    onChange={onChange}
                    value={value}
                    error={!!formState.errors?.timezone}
                  />
                )}
              />
              {!!formState.errors?.timezone && (
                <StyledProfileTabContentFieldHelperText>
                  {formState.errors?.timezone?.message}
                </StyledProfileTabContentFieldHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <StyledProfileTabContentFieldLabel>
                Password
              </StyledProfileTabContentFieldLabel>
              <Controller
                name={"password"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <StyledProfileTabContentField
                    type="password"
                    onChange={onChange}
                    value={value}
                    error={!!formState.errors?.password}
                    endAdornment={
                      <div>
                        <OutlinedButton
                          sx={{
                            border: `1px solid ${theme.palette.grey3}`,
                            color: theme.palette.grey7,
                            whiteSpace: "nowrap",
                            mb: rem("8px"),
                          }}
                        >
                          Change password
                        </OutlinedButton>
                      </div>
                    }
                  />
                )}
              />
              {!!formState.errors?.password && (
                <StyledProfileTabContentFieldHelperText>
                  {formState.errors?.password?.message}
                </StyledProfileTabContentFieldHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <StyledProfileTabContentActionButtons>
                <Box
                  sx={{
                    mr: rem("8px"),
                  }}
                >
                  <OutlinedButton
                    sx={{
                      border: `1px solid ${theme.palette.grey3}`,
                      color: theme.palette.grey7,
                    }}
                  >
                    Cancel
                  </OutlinedButton>
                </Box>
                <Box>
                  <ContainedButton>Save</ContainedButton>
                </Box>
              </StyledProfileTabContentActionButtons>
            </Grid>
          </Grid>
        </form>
      </StyledProfileTabContentBody>
    </StyledProfileTabContent>
  )
}

export default ProfileTabContent
