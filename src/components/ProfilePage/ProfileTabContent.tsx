import React, { useState } from "react"
import { Box, Fade, Grid, IconButton, Menu, MenuItem } from "@mui/material"
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import { rem } from "polished"
import { Controller, useForm } from "react-hook-form"
import TimezoneSelect from "react-timezone-select"
import { makeStyles } from "@mui/styles"
import { observer } from "mobx-react-lite"

import {
  StyledProfileTabContent,
  StyledProfileTabContentBody,
  StyledProfileTabContentField,
  StyledProfileTabContentFieldHelperText,
  StyledProfileTabContentFieldLabel,
} from "./ProfilePage.styled"
import { ContainedButton, OutlinedButton } from "../commons/Button"
import ChangePasswordModal from "./ChangePasswordModal"
import UpdatePhoneNumberModal from "./UpdatePhoneNumberModal"
import removeAllWhiteSpaces from "@/utils/removeAllWhiteSpaces"
import CloseAccountModal from "./CloseAccountModal"
import theme from "@/theme"
import navigateToDefault from "@/utils/navigateToDefault"
import { useStore } from "@/store"
import { personalInformationOptions } from "@/validation"

const useStyles = makeStyles({
  timezoneStyles: {
    "& > div": {
      width: "100%",
      padding: "8px 2px",
      borderWidth: 0,
      borderBottomWidth: "1px",
    },
    "&:focus-visible": {
      outline: "none",
    },
    "&:focus > div": {
      borderWidth: 0,
      borderBottomWidth: "1px",
    },
    "& > div > div > span": {
      display: "none",
    },
  },
})

const ProfileTabContent = () => {
  const classes = useStyles()
  const { userStore } = useStore()
  const [isCloseAccountModalOpen, setIsCloseAccountModalOpen] = useState(false)
  const [isNameEditEnabled, setIsNameEditEnabled] = useState(false)
  const [isSurNameEditEnabled, setIsSurNameEditEnabled] = useState(false)
  const [isEmailEditEnabled, setIsEmailEditEnabled] = useState(false)
  const [isPhoneEditEnabled, setIsPhoneEditEnabled] = useState(false)
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false)
  const [isUpdatePhoneNumberModalOpen, setIsUpdatePhoneNumberModalOpen] =
    useState(false)
  const [emailAnchorEl, setEmailAnchorEl] = useState<null | HTMLElement>(null)
  const [phoneAnchorEl, setPhoneAnchorEl] = useState<null | HTMLElement>(null)
  const isEmailMenuOpen = Boolean(emailAnchorEl)
  const isPhoneMenuOpen = Boolean(phoneAnchorEl)

  type formPropType = typeof personalInformationOptions.defaultValues

  const { handleSubmit, control, formState, reset, getValues, ...methods } =
    useForm<formPropType>({
      defaultValues: {
        email: userStore.currentUser?.email,
        name: userStore.currentUser?.firstName,
        surName: userStore.currentUser?.lastName,
        phoneNumber: userStore.currentUser?.phoneNumber,
        timezone: personalInformationOptions.defaultValues.timezone,
      },
      resolver: personalInformationOptions.resolver,
    })

  const handleEmailMenuButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setEmailAnchorEl(event.currentTarget)
  }
  const handlePhoneMenuButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setPhoneAnchorEl(event.currentTarget)
  }

  const handleEmailMenuClose = () => {
    setEmailAnchorEl(null)
  }
  const handlePhoneMenuClose = () => {
    setPhoneAnchorEl(null)
  }

  const handleNameEditEnable = () => setIsNameEditEnabled(true)
  const handleNameEditDisable = () => {
    methods.setValue("name", userStore.currentUser?.firstName || "")
    setIsNameEditEnabled(false)
  }
  const handleNameEditSave = () => {
    handleNameEditDisable()
    userStore.setUser = {
      ...userStore.currentUser,
      id: userStore.currentUser?.id || "",
      firstName: getValues("name"),
      lastName: userStore.currentUser?.lastName || "",
      country: userStore.currentUser?.country || "",
    }
  }

  const handleSurNameEditEnable = () => setIsSurNameEditEnabled(true)
  const handleSurNameEditDisable = () => {
    methods.setValue("surName", userStore.currentUser?.lastName || "")
    setIsSurNameEditEnabled(false)
  }
  const handleSurNameEditSave = () => {
    handleSurNameEditDisable()
    userStore.setUser = {
      ...userStore.currentUser,
      id: userStore.currentUser?.id || "",
      firstName: userStore.currentUser?.firstName || "",
      lastName: getValues("surName"),
      country: userStore.currentUser?.country || "",
    }
  }

  const handleEmailEditEnable = () => {
    handleEmailMenuClose()
    setIsEmailEditEnabled(true)
  }
  const handleEmailEditDisable = () => {
    methods.setValue("email", userStore.currentUser?.email || "")
    setIsEmailEditEnabled(false)
  }
  const handleEmailEditSave = () => {
    handleEmailEditDisable()
    const newEmail = getValues("email")
    userStore.setUser = {
      ...userStore.currentUser,
      id: userStore.currentUser?.id || "",
      firstName: userStore.currentUser?.firstName || "",
      lastName: userStore.currentUser?.lastName || "",
      country: userStore.currentUser?.country || "",
      email: newEmail,
      isEmailVerified: newEmail === userStore.currentUser?.email,
    }
  }

  const handlePhoneEditEnable = () => {
    handlePhoneMenuClose()
    setIsPhoneEditEnabled(true)
  }
  const handlePhoneEditDisable = () => {
    methods.setValue("phoneNumber", userStore.currentUser?.phoneNumber || "")
    setIsPhoneEditEnabled(false)
  }
  const handlePhoneNumberChange = () => {
    handlePhoneEditDisable()
    const newPhone = getValues("phoneNumber")
    userStore.setUser = {
      ...userStore.currentUser,
      id: userStore.currentUser?.id || "",
      firstName: userStore.currentUser?.firstName || "",
      lastName: userStore.currentUser?.lastName || "",
      country: userStore.currentUser?.country || "",
      phoneNumber: newPhone,
      isPhoneVerified: true,
    }
  }

  const handleChangePasswordModalOpen = () => setIsChangePasswordModalOpen(true)
  const handleChangePasswordModalClose = () =>
    setIsChangePasswordModalOpen(false)

  const handleUpdatePhoneNumberModalOpen = () =>
    setIsUpdatePhoneNumberModalOpen(true)
  const handleUpdatePhoneNumberModalClose = () => {
    methods.setValue("phoneNumber", userStore.currentUser?.phoneNumber || "")
    setIsUpdatePhoneNumberModalOpen(false)
    handlePhoneEditDisable()
  }

  const handleEmailVerify = () => {
    userStore.verifyEmail()
    handleEmailMenuClose()
  }

  const handlePhoneVerify = () => {
    userStore.verifyPhone()
    handlePhoneMenuClose()
  }

  const onSubmit = (data: formPropType) => {
    console.log("Personal Information form data", data)
    reset()
  }

  const handleBackButtonClick = () => {
    navigateToDefault(userStore.currentUser?.role)
  }

  const handleCloseAccount = () => {
    userStore.logout()
  }

  const handleCloseAccountClick = () => {
    setIsCloseAccountModalOpen(true)
  }

  const handleCloseAccountModalClose = () => {
    setIsCloseAccountModalOpen(false)
  }

  return (
    <StyledProfileTabContent>
      {isChangePasswordModalOpen && (
        <ChangePasswordModal
          open={isChangePasswordModalOpen}
          handleClose={handleChangePasswordModalClose}
          handleSave={() => {}}
        />
      )}
      {isUpdatePhoneNumberModalOpen && getValues("phoneNumber") && (
        <UpdatePhoneNumberModal
          open={isUpdatePhoneNumberModalOpen}
          handleClose={handleUpdatePhoneNumberModalClose}
          handlePhoneNumberChange={handlePhoneNumberChange}
          newPhoneNumber={getValues("phoneNumber")}
        />
      )}
      {isCloseAccountModalOpen && (
        <CloseAccountModal
          open={isCloseAccountModalOpen}
          handleClose={handleCloseAccountModalClose}
          handleCloseAccount={handleCloseAccount}
        />
      )}
      <Menu
        elevation={2}
        id="email-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={emailAnchorEl}
        open={isEmailMenuOpen}
        onClose={handleEmailMenuClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={handleEmailVerify}
          disabled={userStore.currentUser?.isEmailVerified}
        >
          {userStore.currentUser?.isEmailVerified ? "Verified" : "Verify"}
        </MenuItem>
        <MenuItem onClick={handleEmailEditEnable}>Edit</MenuItem>
      </Menu>
      <Menu
        elevation={2}
        id="phone-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={phoneAnchorEl}
        open={isPhoneMenuOpen}
        onClose={handlePhoneMenuClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={handlePhoneVerify}
          disabled={userStore.currentUser?.isPhoneVerified}
        >
          {userStore.currentUser?.isPhoneVerified ? "Verified" : "Verify"}
        </MenuItem>
        <MenuItem onClick={handlePhoneEditEnable}>Edit</MenuItem>
      </Menu>
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
                    readOnly={!isNameEditEnabled}
                    endAdornment={
                      isNameEditEnabled ? (
                        <Box display="flex" mb={rem("8px")}>
                          <OutlinedButton
                            sx={{
                              border: `1px solid ${theme.palette.grey3}`,
                              color: theme.palette.grey7,
                              whiteSpace: "nowrap",
                              mr: rem("8px"),
                              p: `${rem("6px")} ${rem("16px")}`,
                            }}
                            onClick={handleNameEditDisable}
                          >
                            Cancel
                          </OutlinedButton>
                          <ContainedButton
                            sx={{
                              whiteSpace: "nowrap",
                              p: `${rem("6px")} ${rem("16px")}`,
                            }}
                            onClick={handleNameEditSave}
                            disabled={
                              getValues("name") ===
                              userStore.currentUser?.firstName
                            }
                          >
                            Save
                          </ContainedButton>
                        </Box>
                      ) : (
                        <IconButton size="small" onClick={handleNameEditEnable}>
                          <EditOutlinedIcon
                            sx={{ fontSize: 16, color: theme.palette.grey6 }}
                          />
                        </IconButton>
                      )
                    }
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
                    readOnly={!isSurNameEditEnabled}
                    endAdornment={
                      isSurNameEditEnabled ? (
                        <Box display="flex" mb={rem("8px")}>
                          <OutlinedButton
                            sx={{
                              border: `1px solid ${theme.palette.grey3}`,
                              color: theme.palette.grey7,
                              whiteSpace: "nowrap",
                              mr: rem("8px"),
                              p: `${rem("6px")} ${rem("16px")}`,
                            }}
                            onClick={handleSurNameEditDisable}
                          >
                            Cancel
                          </OutlinedButton>
                          <ContainedButton
                            sx={{
                              whiteSpace: "nowrap",
                              p: `${rem("6px")} ${rem("16px")}`,
                            }}
                            onClick={handleSurNameEditSave}
                            disabled={
                              getValues("surName") ===
                              userStore.currentUser?.lastName
                            }
                          >
                            Save
                          </ContainedButton>
                        </Box>
                      ) : (
                        <IconButton
                          size="small"
                          onClick={handleSurNameEditEnable}
                        >
                          <EditOutlinedIcon
                            sx={{ fontSize: 16, color: theme.palette.grey6 }}
                          />
                        </IconButton>
                      )
                    }
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
                <Box component="span" display="flex" alignItems="center">
                  <span>Email</span>
                  <Box
                    component="span"
                    display="flex"
                    alignItems="center"
                    ml={1}
                  >
                    <CheckCircleOutlineIcon
                      sx={{
                        color: theme.palette.common.green,
                        fontSize: 16,
                        opacity: userStore.currentUser?.isEmailVerified
                          ? 1
                          : 0.4,
                      }}
                    />
                  </Box>
                </Box>
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
                    readOnly={!isEmailEditEnabled}
                    endAdornment={
                      isEmailEditEnabled ? (
                        <Box display="flex" mb={rem("8px")}>
                          <OutlinedButton
                            sx={{
                              border: `1px solid ${theme.palette.grey3}`,
                              color: theme.palette.grey7,
                              whiteSpace: "nowrap",
                              mr: rem("8px"),
                              p: `${rem("6px")} ${rem("16px")}`,
                            }}
                            onClick={handleEmailEditDisable}
                          >
                            Cancel
                          </OutlinedButton>
                          <ContainedButton
                            sx={{
                              whiteSpace: "nowrap",
                              p: `${rem("6px")} ${rem("16px")}`,
                            }}
                            onClick={handleEmailEditSave}
                            disabled={
                              getValues("email") ===
                              userStore.currentUser?.email
                            }
                          >
                            Save
                          </ContainedButton>
                        </Box>
                      ) : (
                        <IconButton
                          size="small"
                          onClick={handleEmailMenuButtonClick}
                        >
                          <MoreVertIcon
                            sx={{ fontSize: 16, color: theme.palette.grey6 }}
                          />
                        </IconButton>
                      )
                    }
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
                <Box component="span" display="flex" alignItems="center">
                  <span>Phone number</span>
                  <Box
                    component="span"
                    display="flex"
                    alignItems="center"
                    ml={1}
                  >
                    <CheckCircleOutlineIcon
                      sx={{
                        color: theme.palette.common.green,
                        fontSize: 16,
                        opacity: userStore.currentUser?.isPhoneVerified
                          ? 1
                          : 0.4,
                      }}
                    />
                  </Box>
                </Box>
              </StyledProfileTabContentFieldLabel>
              <Controller
                name={"phoneNumber"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <StyledProfileTabContentField
                    onChange={onChange}
                    value={value}
                    error={!!formState.errors?.phoneNumber}
                    endAdornment={
                      isPhoneEditEnabled ? (
                        <Box display="flex" mb={rem("8px")}>
                          <OutlinedButton
                            sx={{
                              border: `1px solid ${theme.palette.grey3}`,
                              color: theme.palette.grey7,
                              whiteSpace: "nowrap",
                              mr: rem("8px"),
                              p: `${rem("6px")} ${rem("16px")}`,
                            }}
                            onClick={handlePhoneEditDisable}
                          >
                            Cancel
                          </OutlinedButton>
                          <ContainedButton
                            sx={{
                              whiteSpace: "nowrap",
                              p: `${rem("6px")} ${rem("16px")}`,
                            }}
                            onClick={handleUpdatePhoneNumberModalOpen}
                            disabled={
                              removeAllWhiteSpaces(getValues("phoneNumber")) ===
                              removeAllWhiteSpaces(
                                userStore.currentUser?.phoneNumber || ""
                              )
                            }
                          >
                            Save
                          </ContainedButton>
                        </Box>
                      ) : (
                        <IconButton
                          size="small"
                          onClick={handlePhoneMenuButtonClick}
                        >
                          <MoreVertIcon
                            sx={{ fontSize: 16, color: theme.palette.grey6 }}
                          />
                        </IconButton>
                      )
                    }
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
                  <TimezoneSelect
                    placeholder="Choose timezone"
                    className={classes.timezoneStyles}
                    value={value}
                    onChange={onChange}
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
                    autoComplete="new-password"
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
                          onClick={handleChangePasswordModalOpen}
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
              <Box display="flex">
                <OutlinedButton
                  onClick={handleBackButtonClick}
                  sx={{ mt: 1, mr: 2 }}
                >
                  Back
                </OutlinedButton>
                <ContainedButton
                  error
                  onClick={handleCloseAccountClick}
                  startIcon={<HighlightOffOutlinedIcon />}
                  sx={{ mt: 1 }}
                >
                  Close Account
                </ContainedButton>
              </Box>
            </Grid>
          </Grid>
        </form>
      </StyledProfileTabContentBody>
    </StyledProfileTabContent>
  )
}

export default observer(ProfileTabContent)
