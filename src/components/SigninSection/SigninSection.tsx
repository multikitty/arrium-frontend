import React, { useState } from "react"
import { Box, IconButton, useMediaQuery } from "@mui/material"
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material"
import { Controller, useForm, useWatch } from "react-hook-form"
import { rem } from "polished"
import { useMutation } from "react-query"

import {
  StyledButton,
  StyledButtonText,
  StyledFieldLabel,
  StyledLoginContainer,
  StyledLoginContainerMobile,
  StyledCardHeader,
  StyledSignUpButton,
  StyledSignUpText,
} from "@/components/commons/uiComponents"
import emailAndPasswordOptions from "@/validation/emailAndPassword"
import { devices } from "@/constants/device"
import { useStore } from "@/store"
import { signinUser } from "@/agent/signin"
import { SigninUserResult, SigninUserVariables } from "@/lib/interfaces/signin"
import routes from "@/constants/routes"
import useNavigate from "@/hooks/useNavigate"
import { setLocalStorage } from "@/utils/localStorage"
import { PageProps } from "@/lib/interfaces/common"
import { TOKEN } from "@/constants/localStorage"
import { REGISTRATION_STEP_MAP } from "@/constants/common"
import { RegistrationStepsType } from "@/types/common"
import InputField from "@/components/commons/InputField"
import HelperText from "@/components/commons/HelperText"
import IDS from "@/constants/ids"
import {
  StyledCheckBox,
  StyledForgotPassword,
  StyledRemeberMeText,
} from "@/components/SigninSection/SigninSection.styled"
import { SnackbarKey, useSnackbar } from "notistack"
import Message from "@/components/Message"

interface SigninSectionProps extends PageProps { }

const SigninSection: React.FC<SigninSectionProps> = ({ country_code }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const {
    navigateToDefault,
    navigate,
    navigateWithQuery: { navigateToSignup },
  } = useNavigate({ country_code })
  const { userStore } = useStore()
  const isWebView = useMediaQuery(devices.web.up)
  const [isVisible, setIsVisible] = useState(false)
  const { mutate } = useMutation<SigninUserResult, Error, SigninUserVariables>(
    signinUser
  )

  type FormPropType = typeof emailAndPasswordOptions.defaultValues
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors },
    getValues,
    ...methods
  } = useForm<FormPropType>(emailAndPasswordOptions)

  useWatch({ name: "email", control })
  useWatch({ name: "password", control })

  const handleNavigateToSignupStep = (step: RegistrationStepsType) => {
    if (REGISTRATION_STEP_MAP[step] === 2) {
      navigateToSignup(1)
    } else {
      navigateToSignup(REGISTRATION_STEP_MAP[step])
    }
  }

  const handleNavigateToContactForm = (key: SnackbarKey) => {
    navigate(`${routes.home}#${IDS.landing["contact-us-section"]}`)
    closeSnackbar(key)
  }

  const onSubmit = (props: FormPropType) => {
    mutate(
      {
        email: props.email,
        password: props.password,
      },
      {
        onSuccess({ data, success }) {
          if (!success) {
            setError("checkbox", {
              message: "Your email address or password is incorrect",
              type: "validate",
            })
          }
          if (!data) return
          if (data.userData.accountStatus === "disabled") {
            enqueueSnackbar("", {
              persist: true,
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
              content: key => (
                <Message
                  id={key}
                  title="Your account has been disabled."
                  text={
                    <div>
                      To reactivate your account, please contact the Team using
                      <br />
                      the{" "}
                      <span
                        className="link"
                        onClick={() => handleNavigateToContactForm(key)}
                      >
                        contact form
                      </span>
                    </div>
                  }
                  variant="error"
                />
              ),
            })
            return
          }
          setLocalStorage(TOKEN, data.userData.token)
          if (
            data.userData.role !== "admin" &&
            data.userData.currentSteps !== "finished"
          ) {
            console.log("data.userData.currentSteps", data.userData.currentSteps)
            handleNavigateToSignupStep(data.userData.currentSteps)
            return
          }
          userStore.authenticateUser(data.userData)
          userStore.setUserFlexData(data.flexData)
          navigateToDefault(data.userData.role)
        },
        onError(error) {
          setError("checkbox", {
            message: "Your email address or password is incorrect",
            type: "validate",
          })
        },
      }
    )
  }

  const handleNavigateToSignUp = () => {
    navigate(routes.signup)
  }

  const handleNavigateToForgotPassword = () => {
    navigate(routes.forgotPassword)
  }

  return (
    <React.Fragment>
      {isWebView ? (
        <StyledLoginContainer noValidate onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" justifyContent="center">
            <StyledCardHeader>Login to your account</StyledCardHeader>
          </Box>
          <Box display="flex" flexDirection="column" mb={"16px"}>
            <StyledFieldLabel $isHidden={!getValues("email")}>
              Email Address
            </StyledFieldLabel>
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <InputField
                  autoFocus
                  mb={0}
                  type="email"
                  id={IDS.signin.form.email}
                  name={IDS.signin.form.email}
                  placeholder="Enter Email Address"
                  variant="outlined"
                  value={value}
                  onChange={e => {
                    onChange(e)
                    methods.clearErrors("checkbox")
                  }}
                  error={!!errors.email}
                  autoComplete="off"
                  InputProps={{ autoComplete: "off" }}
                />
              )}
            />
            {errors.email && (
              <HelperText type="large" mt="4px">
                {errors.email.message}
              </HelperText>
            )}
          </Box>
          <Box display="flex" flexDirection="column" mb={errors.checkbox ? "16px" : "32px"}>
            <StyledFieldLabel $isHidden={!getValues("password")}>
              Password
            </StyledFieldLabel>
            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange } }) => (
                <InputField
                  mb="0"
                  id={IDS.signin.form.password}
                  name={IDS.signin.form.password}
                  placeholder="Enter Password"
                  type={isVisible ? "text" : "password"}
                  variant="outlined"
                  value={value}
                  onChange={e => {
                    onChange(e)
                    methods.clearErrors("checkbox")
                  }}
                  error={!!errors.password}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={() => setIsVisible(prev => !prev)}>
                        {isVisible ? (
                          <VisibilityOffOutlined />
                        ) : (
                          <VisibilityOutlined />
                        )}
                      </IconButton>
                    ),
                  }}
                />
              )}
            />
            {errors.password && (
              <HelperText type="large" mt="4px">
                {errors.password.message}
              </HelperText>
            )}
          </Box>
          {errors.checkbox && (
            <HelperText type="large" mb={"16px"}>{errors.checkbox.message}</HelperText>
          )}
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <StyledCheckBox
                type="checkbox"
                id={IDS.signin.form.checkbox}
                {...register("checkbox")}
              />
              <StyledRemeberMeText htmlFor={IDS.signin.form.checkbox}>
                Remember me
              </StyledRemeberMeText>
            </Box>
            <StyledForgotPassword>
              <StyledSignUpButton onClick={handleNavigateToForgotPassword}>
                Forgot Password?
              </StyledSignUpButton>
            </StyledForgotPassword>
          </Box>
          <StyledButton
            variant="contained"
            color="primary"
            disableElevation
            $marginTop={"28px"}
            type="submit"
          >
            <StyledButtonText>Log In</StyledButtonText>
          </StyledButton>
          <Box display="flex" justifyContent="center">
            <StyledSignUpText>
              Don't have an account yet?
              <StyledSignUpButton>
                <StyledSignUpButton onClick={handleNavigateToSignUp}>
                  {" "}
                  Sign Up
                </StyledSignUpButton>
              </StyledSignUpButton>
            </StyledSignUpText>
          </Box>
        </StyledLoginContainer>
      ) : (
        <StyledLoginContainerMobile
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box
            display="flex"
            flexDirection="column"
            maxWidth={rem("375px")}
            mx={"auto"}
          >
            <Box display="flex" justifyContent="center">
              <StyledCardHeader>Login to your account</StyledCardHeader>
            </Box>
            <Box display="flex" flexDirection="column" mb={"16px"}>
              <StyledFieldLabel $isHidden={!getValues("email")}>
                Email Address
              </StyledFieldLabel>
              <Controller
                control={control}
                name="email"
                render={({ field: { value, onChange } }) => (
                  <InputField
                    autoFocus
                    mb={0}
                    type="email"
                    id={IDS.signin.form.email}
                    name={IDS.signin.form.email}
                    placeholder="Enter Email Address"
                    variant="outlined"
                    value={value}
                    onChange={e => {
                      onChange(e)
                      methods.clearErrors("checkbox")
                    }}
                    error={!!errors.email}
                    autoComplete="off"
                    InputProps={{ autoComplete: "off" }}
                  />
                )}
              />
              {errors.email && (
                <HelperText type="large" mt="4px">
                  {errors.email.message}
                </HelperText>
              )}
            </Box>
            <Box display="flex" flexDirection="column" mb={errors.checkbox ? "16px" : "32px"}>
              <StyledFieldLabel $isHidden={!getValues("password")}>
                Password
              </StyledFieldLabel>
              <Controller
                control={control}
                name="password"
                render={({ field: { value, onChange } }) => (
                  <InputField
                    mb="0"
                    id={IDS.signin.form.password}
                    name={IDS.signin.form.password}
                    placeholder="Enter Password"
                    type={isVisible ? "text" : "password"}
                    variant="outlined"
                    value={value}
                    onChange={e => {
                      onChange(e)
                      methods.clearErrors("checkbox")
                    }}
                    error={!!errors.password}
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={() => setIsVisible(prev => !prev)}>
                          {isVisible ? (
                            <VisibilityOffOutlined />
                          ) : (
                            <VisibilityOutlined />
                          )}
                        </IconButton>
                      ),
                    }}
                  />
                )}
              />
              {errors.password && (
                <HelperText type="large" mt="4px">
                  {errors.password.message}
                </HelperText>
              )}
            </Box>
            {errors.checkbox && (
              <HelperText mb={"16px"} type="large" mt="8px">
                {errors.checkbox.message}
              </HelperText>
            )}
            <Box display="flex" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <StyledCheckBox
                  type="checkbox"
                  id={IDS.signin.form.checkbox}
                  {...register("checkbox")}
                />
                <StyledRemeberMeText htmlFor={IDS.signin.form.checkbox}>
                  Remember me
                </StyledRemeberMeText>
              </Box>
              <StyledForgotPassword>
                <StyledSignUpButton onClick={handleNavigateToForgotPassword}>
                  Forgot Password?
                </StyledSignUpButton>
              </StyledForgotPassword>
            </Box>
            <StyledButton
              variant="contained"
              color="primary"
              disableElevation
              $marginTop={errors.checkbox ? "28px" : "56px"}
              type="submit"
            >
              <StyledButtonText>Log In</StyledButtonText>
            </StyledButton>
            <Box
              display="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
            >
              <StyledSignUpText>Don't have an account yet?</StyledSignUpText>
              <StyledSignUpButton>
                <StyledSignUpButton onClick={handleNavigateToSignUp}>
                  {" "}
                  Sign Up
                </StyledSignUpButton>
              </StyledSignUpButton>
            </Box>
          </Box>
        </StyledLoginContainerMobile>
      )}
    </React.Fragment>
  )
}

export default SigninSection
