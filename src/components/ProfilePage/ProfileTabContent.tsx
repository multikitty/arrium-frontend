import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { personalInformationFormOptions } from "../../validation"
import {
  StyledProfileTabContent,
  StyledProfileTabContentBody,
  StyledProfileTabContentField,
  StyledProfileTabContentFieldHelperText,
  StyledProfileTabContentFieldLabel,
} from "./ProfilePage.styled"
import { Box, Fade, Grid, IconButton, Menu, MenuItem } from "@mui/material"
import { rem } from "polished"
import { ContainedButton, OutlinedButton } from "../commons/Button"
import theme from "../../theme"
import ChangePasswordModal from "./ChangePasswordModal"
import UpdatePhoneNumberModal from "./UpdatePhoneNumberModal"
import TimezoneSelect from "react-timezone-select"
import { makeStyles } from "@mui/styles"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"

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
  const [isNameEditEnabled, setIsNameEditEnabled] = useState(false)
  const [isSurNameEditEnabled, setIsSurNameEditEnabled] = useState(false)
  const [isEmailEditEnabled, setIsEmailEditEnabled] = useState(false)
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [isPhoneEditEnabled, setIsPhoneEditEnabled] = useState(false)
  const [isPhoneVerified, setIsPhoneVerified] = useState(false)
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false)
  const [isUpdatePhoneNumberModalOpen, setIsUpdatePhoneNumberModalOpen] =
    useState(false)
  const [emailAnchorEl, setEmailAnchorEl] = React.useState<null | HTMLElement>(
    null
  )
  const [phoneAnchorEl, setPhoneAnchorEl] = React.useState<null | HTMLElement>(
    null
  )
  const isEmailMenuOpen = Boolean(emailAnchorEl)
  const isPhoneMenuOpen = Boolean(phoneAnchorEl)

  const { handleSubmit, control, formState, reset } = useForm(
    personalInformationFormOptions
  )

  type formPropType = typeof personalInformationFormOptions.defaultValues

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
  const handleNameEditDisable = () => setIsNameEditEnabled(false)

  const handleSurNameEditEnable = () => setIsSurNameEditEnabled(true)
  const handleSurNameEditDisable = () => setIsSurNameEditEnabled(false)

  const handleEmailEditEnable = () => {
    handleEmailMenuClose()
    setIsEmailEditEnabled(true)
  }
  const handleEmailEditDisable = () => setIsEmailEditEnabled(false)

  const handlePhoneEditEnable = () => {
    handlePhoneMenuClose()
    setIsPhoneEditEnabled(true)
  }
  const handlePhoneEditDisable = () => setIsPhoneEditEnabled(false)

  const handleChangePasswordModalOpen = () => setIsChangePasswordModalOpen(true)
  const handleChangePasswordModalClose = () =>
    setIsChangePasswordModalOpen(false)

  const handleUpdatePhoneNumberModalOpen = () =>
    setIsUpdatePhoneNumberModalOpen(true)
  const handleUpdatePhoneNumberModalClose = () => {
    setIsUpdatePhoneNumberModalOpen(false)
    handlePhoneEditDisable()
  }

  const handleEmailVerify = () => {
    setIsEmailVerified(true)
    handleEmailMenuClose()
  }
  const handlePhoneVerify = () => {
    setIsPhoneVerified(true)
    handlePhoneMenuClose()
  }

  const onSubmit = (data: formPropType) => {
    console.log("Personal Information form data", data)
    reset()
  }

  return (
    <StyledProfileTabContent>
      <ChangePasswordModal
        open={isChangePasswordModalOpen}
        handleClose={handleChangePasswordModalClose}
        handleSave={() => {}}
      />
      <UpdatePhoneNumberModal
        open={isUpdatePhoneNumberModalOpen}
        handleClose={handleUpdatePhoneNumberModalClose}
        handlePhoneNumberChange={() => {}}
      />
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
        <MenuItem onClick={handleEmailVerify} disabled={isEmailVerified}>
          {isEmailVerified ? "Verified" : "Verify"}
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
        <MenuItem onClick={handlePhoneVerify} disabled={isPhoneVerified}>
          {isPhoneVerified ? "Verified" : "Verify"}
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
                            onClick={handleNameEditDisable}
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
                            onClick={handleSurNameEditDisable}
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
                        opacity: isEmailVerified ? 1 : 0.4,
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
                            onClick={handleEmailEditDisable}
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
                        opacity: isPhoneVerified ? 1 : 0.4,
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
          </Grid>
        </form>
      </StyledProfileTabContentBody>
    </StyledProfileTabContent>
  )
}

export default ProfileTabContent
