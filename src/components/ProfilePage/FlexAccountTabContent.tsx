import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { flexAccountOptions } from "@/validation"
import {
  StyledFlexAccountTabContent,
  StyledFlexAccountTabContentBody,
  StyledProfileTabContentField as StyledFlexAccountTabContentField,
  StyledFlexAccountTabContentFieldHelperText,
  StyledFlexAccountTabContentFieldLabel,
} from "./ProfilePage.styled"
import { Box, Grid, IconButton } from "@mui/material"
import { rem } from "polished"
import { ContainedButton, OutlinedButton } from "../commons/Button"
import theme from "@/theme"
import UpdatePasswordModal from "./UpdatePasswordModal"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import { useStore } from "@/store"

const FlexAccountTabContent = () => {
  const { userStore } = useStore()
  const [isUserNameEditEnabled, setIsUserNameEditEnabled] = useState(false)
  const [isUpdatePasswordModalOpen, setIsUpdatePasswordModalOpen] =
    useState(false)

  type formPropType = typeof flexAccountOptions.defaultValues

  const { handleSubmit, control, formState, reset } = useForm<formPropType>({
    defaultValues: {
      userName: userStore.currentUser?.email || "",
      password: flexAccountOptions.defaultValues.password,
    },
    resolver: flexAccountOptions.resolver,
  })

  const handleUpdatePasswordModalOpen = () => setIsUpdatePasswordModalOpen(true)
  const handleUpdatePasswordModalClose = () =>
    setIsUpdatePasswordModalOpen(false)

  const onSubmit = (data: formPropType) => {
    console.log("Flex Account form data", data)
    reset()
  }

  const handleUserNameEditSave = async () => {
    setIsUserNameEditEnabled(false)
  }

  const handleUserNameEditDisable = () => {
    setIsUserNameEditEnabled(false)
  }


  const handleUserNameEditEnable = () => setIsUserNameEditEnabled(true)

  return (
    <StyledFlexAccountTabContent>
      <UpdatePasswordModal
        open={isUpdatePasswordModalOpen}
        handleClose={handleUpdatePasswordModalClose}
        handleSave={() => { }}
      />
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
                    readOnly={!isUserNameEditEnabled}
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
                    autoComplete="new-password"
                    type="password"
                    onChange={onChange}
                    value={value}
                    error={!!formState.errors?.password}
                    readOnly
                    endAdornment={
                      <div>
                        <OutlinedButton
                          sx={{
                            border: `1px solid ${theme.palette.grey3}`,
                            color: theme.palette.grey7,
                            whiteSpace: "nowrap",
                            mb: rem("8px"),
                            p: `${rem("6px")} ${rem("16px")}`,
                          }}
                          onClick={handleUpdatePasswordModalOpen}
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
          </Grid>
        </form>
      </StyledFlexAccountTabContentBody>
    </StyledFlexAccountTabContent>
  )
}

export default FlexAccountTabContent
