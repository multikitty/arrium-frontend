import React from "react"
import { Controller, useForm } from "react-hook-form"
import { flexAccountFormOptions } from "../../validation"
import {
  StyledFlexAccountTabContent,
  StyledFlexAccountTabContentActionButtons,
  StyledFlexAccountTabContentBody,
  StyledProfileTabContentField as StyledFlexAccountTabContentField,
  StyledFlexAccountTabContentFieldHelperText,
  StyledFlexAccountTabContentFieldLabel,
} from "./ProfilePage.styled"
import { Box, Grid } from "@mui/material"
import { rem } from "polished"
import { ContainedButton, OutlinedButton } from "../commons/Button"
import theme from "../../theme"

const FlexAccountTabContent = () => {
  const { handleSubmit, control, formState, reset } = useForm(
    flexAccountFormOptions
  )

  type formPropType = typeof flexAccountFormOptions.defaultValues

  const onSubmit = (data: formPropType) => {
    console.log("Flex Account form data", data)
    reset()
  }

  return (
    <StyledFlexAccountTabContent>
      <StyledFlexAccountTabContentBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container rowSpacing={3} columnSpacing={2}>
            <Grid item xs={12}>
              <StyledFlexAccountTabContentFieldLabel>
                Username
              </StyledFlexAccountTabContentFieldLabel>
              <Controller
                name={"userName"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <StyledFlexAccountTabContentField
                    onChange={onChange}
                    value={value}
                    error={!!formState.errors?.userName}
                  />
                )}
              />
              {!!formState.errors?.userName && (
                <StyledFlexAccountTabContentFieldHelperText>
                  {formState.errors?.userName?.message}
                </StyledFlexAccountTabContentFieldHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <StyledFlexAccountTabContentFieldLabel>
                Password
              </StyledFlexAccountTabContentFieldLabel>
              <Controller
                name={"password"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <StyledFlexAccountTabContentField
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
                <StyledFlexAccountTabContentFieldHelperText>
                  {formState.errors?.password?.message}
                </StyledFlexAccountTabContentFieldHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <StyledFlexAccountTabContentActionButtons>
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
              </StyledFlexAccountTabContentActionButtons>
            </Grid>
          </Grid>
        </form>
      </StyledFlexAccountTabContentBody>
    </StyledFlexAccountTabContent>
  )
}

export default FlexAccountTabContent
