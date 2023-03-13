import React, { useState } from "react"
import { Box, Fade, Grid, IconButton, Menu, MenuItem } from "@mui/material"
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import { rem } from "polished"
import { Controller, useForm } from "react-hook-form"
import { makeStyles } from "@mui/styles"
import { observer } from "mobx-react-lite"
import { useMutation } from "react-query"
import { useSnackbar } from "notistack"

import {
  StyledProfileTabContent,
  StyledProfileTabContentBody,
  StyledProfileTabContentField,
  StyledProfileTabContentFieldHelperText,
  StyledProfileTabContentFieldLabel,
} from "@/components/ProfilePage/ProfilePage.styled"
import { ContainedButton, OutlinedButton } from "@/components/commons/Button"
import ChangePasswordModal from "@/components/ProfilePage/ChangePasswordModal"
import UpdatePhoneNumberModal from "@/components/ProfilePage/UpdatePhoneNumberModal"
import removeAllWhiteSpaces from "@/utils/removeAllWhiteSpaces"
import CloseAccountModal from "@/components/ProfilePage/CloseAccountModal"
import theme from "@/theme"
import { useStore } from "@/store"
import { personalInformationOptions } from "@/validation"
import useNavigate from "@/hooks/useNavigate"
import routes from "@/constants/routes"
import { requestEmailVerify, updateProfile, useCurrentUser } from "@/agent/user"
import LoadingScreen from "@/components/LoadingScreen"
import {
  RequestEmailVerifyResult,
  RequestEmailVerifyVariables,
  UpdateProfileResult,
  UpdateProfileVariables,
} from "@/lib/interfaces/user"
import { PageProps } from "@/lib/interfaces/common"
import TimezoneAutocomplete from "@/components/TimezoneAutocomplete"
import { localStorageUtils } from "@/utils"
import { USER } from "@/constants/localStorage"
import { UserType } from "@/types/auth"

const useStyles = makeStyles({
  timezoneStyles: {
    "& > div": {
      width: "100%",
      padding: "8px 2px",
      borderWidth: 0,
    },
    "&:focus-visible": {
      outline: "none",
    },
    "& .MuiInput-root::after": {
      borderBottomWidth: "0",
    },
    "& .MuiInput-root::before": {
      borderBottom: `1px solid ${theme.palette.grey3}`,
      "&:focus-within": {
        borderBottom: `1px solid ${theme.palette.main}`,
      },
    },
    "& .MuiInput-root:hover:not(.Mui-disabled):before": {
      borderBottom: `1px solid ${theme.palette.main}`,
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

interface ProfileTabContentProps extends PageProps { }

const ProfileTabContent: React.FC<ProfileTabContentProps> = ({
  country_code,
}) => {
  const classes = useStyles()
  const { navigate, navigateToDefault } = useNavigate({ country_code })
  const { enqueueSnackbar } = useSnackbar()
  const { userStore } = useStore()
  const { data: userData, isLoading, refetch } = useCurrentUser()
  const { mutate: updateProfileMutate } = useMutation<
    UpdateProfileResult,
    Error,
    UpdateProfileVariables
  >(updateProfile)
  const { mutate: requestEmailVerifyMutate } = useMutation<
    RequestEmailVerifyResult,
    Error,
    RequestEmailVerifyVariables
  >(requestEmailVerify)
  const [isCloseAccountModalOpen, setIsCloseAccountModalOpen] = useState(false)
  const [isNameEditEnabled, setIsNameEditEnabled] = useState(false)
  const [isSurNameEditEnabled, setIsSurNameEditEnabled] = useState(false)
  const [isTimezoneEditEnabled, setIsTimezoneEditEnabled] = useState(false)
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

  type FormPropType = typeof personalInformationOptions.defaultValues

  const { handleSubmit, control, formState, reset, getValues, ...methods } =
    useForm<FormPropType>(personalInformationOptions)

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

  const handleTimezoneEditEnable = () => {
    setIsTimezoneEditEnabled(true)
    handleSurNameEditDisable()
    handleNameEditDisable()
  }

  const handleTimezoneEditDisable = () => {
    methods.setValue("timezone", userData?.data?.tzName || "")
    setIsTimezoneEditEnabled(false)
  }

  const handleTimezoneEditSave = async () => {
    await updateProfileMutation({
      fieldName: "tzName",
      fieldValue: getValues("timezone"),
    })
    setIsTimezoneEditEnabled(false)
  }

  const handleNameEditEnable = () => {
    setIsNameEditEnabled(true)
    handleSurNameEditDisable()
    handleTimezoneEditDisable()
  }
  const handleNameEditDisable = () => {
    methods.setValue("name", userData?.data?.firstname || "")
    setIsNameEditEnabled(false)
  }



  const updateProfileMutation = async (params: UpdateProfileVariables) => {
    await updateProfileMutate(
      { fieldName: params.fieldName, fieldValue: params.fieldValue },
      {
        onSuccess({ success, message, validationError }) {
          if (!success) {
            enqueueSnackbar(
              validationError?.fieldName ||
              validationError?.fieldValue ||
              message,
              {
                variant: "error",
              }
            )
            return
          }
          let localStorageUserData = JSON.parse(localStorageUtils.get(USER) as string) as UserType
          localStorageUserData = { ...localStorageUserData, [params.fieldName]: params.fieldValue }
          localStorageUtils.set(USER, JSON.stringify(localStorageUserData)),
            enqueueSnackbar("User details Updated successfully", { variant: "success" })
          refetch()
        },
        onError(error, variables) {
          enqueueSnackbar(error.message, { variant: "error" })
          console.error("ERROR:", error)
          console.log("VARIABLES USED:", variables)
        },
      }
    )
  }

  const handleNameEditSave = async () => {
    await updateProfileMutation({
      fieldName: "firstname",
      fieldValue: getValues("name"),
    })
    setIsNameEditEnabled(false)
  }

  const handleSurNameEditEnable = () => {
    setIsSurNameEditEnabled(true)
    handleTimezoneEditDisable()
    handleNameEditDisable()
  }
  const handleSurNameEditDisable = () => {
    methods.setValue("surName", userData?.data?.lastname || "")
    setIsSurNameEditEnabled(false)
  }
  const handleSurNameEditSave = async () => {
    await updateProfileMutation({
      fieldName: "lastname",
      fieldValue: getValues("surName"),
    })
    setIsSurNameEditEnabled(false)
  }

  const handleEmailEditEnable = () => {
    handleEmailMenuClose()
    setIsEmailEditEnabled(true)
  }
  const handleEmailEditDisable = () => {
    methods.setValue("email", userData?.data?.email || "")
    setIsEmailEditEnabled(false)
  }
  const handleEmailEditSave = () => {
    setIsEmailEditEnabled(false)
  }

  const handlePhoneEditEnable = () => {
    handlePhoneMenuClose()
    setIsPhoneEditEnabled(true)
  }
  const handlePhoneEditDisable = () => {
    methods.setValue("phoneNumber", userData?.data?.phoneNumber || "")
    setIsPhoneEditEnabled(false)
  }
  const handlePhoneNumberChange = () => {
    handlePhoneEditDisable()
  }

  const handleChangePasswordModalOpen = () => setIsChangePasswordModalOpen(true)
  const handleChangePasswordModalClose = () =>
    setIsChangePasswordModalOpen(false)

  const handleUpdatePhoneNumberModalOpen = () =>
    setIsUpdatePhoneNumberModalOpen(true)
  const handleUpdatePhoneNumberModalClose = () => {
    methods.setValue(
      "phoneNumber",
      `${userData?.data?.phoneNumber || ""
      }`
    )
    setIsUpdatePhoneNumberModalOpen(false)
    handlePhoneEditDisable()
  }

  const handleEmailVerify = async () => {
    await requestEmailVerifyMutate(
      { email: getValues("email") },
      {
        onSuccess({ success, message, validationError }) {
          if (!success) {
            enqueueSnackbar(validationError?.email || message, {
              variant: "error",
            })
            return
          }
          enqueueSnackbar(message, { variant: "success" })
          refetch()
        },
        onError(error, variables) {
          enqueueSnackbar(error.message, { variant: "error" })
          console.error("ERROR:", error)
          console.log("VARIABLES USED:", variables)
        },
      }
    )
    handleEmailMenuClose()
  }

  const handlePhoneVerify = () => {
    handlePhoneMenuClose()
  }

  const onSubmit = (data: FormPropType) => {
    console.log("Personal Information form data", data)
    reset()
  }

  const handleBackButtonClick = () => {
    navigateToDefault(userStore.currentUser?.role)
  }

  const handleCloseAccount = () => {
    userStore.logout()
    navigate(routes.home)
  }

  const handleCloseAccountClick = () => {
    setIsCloseAccountModalOpen(true)
  }

  const handleCloseAccountModalClose = () => {
    setIsCloseAccountModalOpen(false)
  }

  React.useEffect(() => {
    if (!userData?.data) return
    reset({
      email: userData.data.email,
      name: userData.data.firstname,
      surName: userData.data.lastname,
      phoneNumber: `${userData.data.phoneNumber}`,
      timezone: userData.data.tzName,
    })
  }, [userData])

  if (isLoading) return <LoadingScreen />
  if (!userData?.data) return null

  return (
    <StyledProfileTabContent>
      {isChangePasswordModalOpen && (
        <ChangePasswordModal
          open={isChangePasswordModalOpen}
          handleClose={handleChangePasswordModalClose}
          handleSave={() => { }}
        />
      )}
      {isUpdatePhoneNumberModalOpen && getValues("phoneNumber") && (
        <UpdatePhoneNumberModal
          open={isUpdatePhoneNumberModalOpen}
          handleClose={handleUpdatePhoneNumberModalClose}
          handlePhoneNumberChange={handlePhoneNumberChange}
          newPhoneNumber={getValues("phoneNumber")}
          country={userData.data.country}
          dialCode={userData.data.dialCode}
          firstname={userData.data.firstname}
          lastname={userData.data.lastname}
          tzName={userData.data.tzName}
          refetchCurrentUser={refetch}
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
          disabled={userData?.data?.emailVerified}
        >
          {userData?.data?.emailVerified ? "Verified" : "Verify"}
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
          disabled={userData?.data?.phoneVerified}
        >
          {userData?.data?.phoneVerified ? "Verified" : "Verify"}
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
                              getValues("name") === userData?.data?.firstname || getValues("name") === ""
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
                              getValues("surName") === userData?.data?.lastname || getValues("surName") === ""
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
                        opacity: userData?.data?.emailVerified ? 1 : 0.4,
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
                              getValues("email") === userData?.data?.email
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
                        opacity: userData?.data?.phoneVerified ? 1 : 0.4,
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
                    readOnly={!isPhoneEditEnabled}
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
                                userData?.data?.phoneNumber || ""
                              ) || getValues("phoneNumber") === ""

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
                  <TimezoneAutocomplete
                    textFieldVariant="standard"
                    placeholder="Choose timezone"
                    className={classes.timezoneStyles}
                    timezone={value}
                    setTimezone={onChange}
                    getValues={getValues}
                    userData={userData}
                    isTimezoneEditEnabled={isTimezoneEditEnabled}
                    handleTimezoneEditEnable={handleTimezoneEditEnable}
                    handleTimezoneEditDisable={handleTimezoneEditDisable}
                    handleTimezoneEditSave={handleTimezoneEditSave}
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
                    placeholder="Password here"
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
