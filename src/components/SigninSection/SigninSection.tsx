import React, { useState } from "react"
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material"
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material"
import { Controller, useForm, useWatch } from "react-hook-form"
import { rem } from "polished"

import {
  StyledButton,
  StyledButtonText,
  StyledCheckBox,
  StyledFieldLabel,
  StyledForgotPassword,
  StyledLoginContainer,
  StyledLoginContainerMobile,
  StyledCardHeader,
  StyledRemeberMeText,
  StyledSignUpButton,
  StyledSignUpText,
} from "@/components/commons/uiComponents"
import emailAndPasswordOptions from "@/validation/emailAndPassword"
import { devices } from "@/constants/device"
import { useStore } from "@/store"
import { useMutation } from "react-query"
import { signinUser } from "@/agent/signin"
import { SigninUserResult, SigninUserVariables } from "@/lib/interfaces/signin"
import routes from "@/constants/routes"
import useNavigate from "@/hooks/useNavigate"
import { setLocalStorage } from "@/utils/localStorage"
import { PageProps } from "@/lib/interfaces/common"
import { TOKEN } from "@/constants/localStorage"
import {
  DEFAULT_COUNTRY,
  DEFAULT_PLAN,
  REGISTRATION_STEP_MAP,
} from "@/constants/common"
import { RegistrationStepsType } from "@/types/common"
import InputField from "../commons/InputField"
import HelperText from "../commons/HelperText"
import IDS from "@/constants/ids"

interface SigninSectionProps extends PageProps {}

const SigninSection: React.FC<SigninSectionProps> = ({ country_code }) => {
  const theme = useTheme()
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
    navigateToSignup(REGISTRATION_STEP_MAP[step])
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
          setLocalStorage(TOKEN, data.userData.token)
          if (
            data.userData.role !== "admin" &&
            data.userData.currentSteps !== "finished"
          ) {
            handleNavigateToSignupStep(data.userData.currentSteps)
            return
          }
          userStore.authenticateUser({
            id: data.userData.customerID,
            firstName: data.userData.firstname,
            lastName: data.userData.lastname,
            country: country_code || DEFAULT_COUNTRY,
            phoneNumber: data.userData.phoneNumber,
            isPhoneVerified: data.userData.phoneVerified,
            email: data.userData.email,
            isEmailVerified: data.userData.emailVerified,
            role: data.userData.role,
            plan: data.userData.planType || DEFAULT_PLAN,
            tzName: data.userData.tzName,
            amznFlexUser: data.userData.amznFlexUser,
            refCode: data.userData.refCode,
            currentSteps: data.userData.currentSteps,
            sk: data.userData.sk,
            pk: data.userData.pk,
            accountStatus: data.userData.accountStatus,
            flexCountry: data.userData.flexCountry,
            stationType: data.userData.stationType,
            startDate: data.userData.startDate,
            endDate: data.userData.endDate,
          })
          navigateToDefault(data.userData.role)

          userStore.setUserFlexData({
            flexID: data.flexData.flexID,
            devModel: data.flexData.devModel,
            devSerial: data.flexData.devSerial,
            devID: data.flexData.devID,
            country: data.flexData.country,
            amznFlexUser: data.flexData.amznFlexUser,
            amznFlexPassword: data.flexData.amznFlexPassword,
            amznID: data.flexData.amznID,
            flexVersion: data.flexData.flexVersion,
            osVersion: data.flexData.osVersion,
            region: data.flexData.region,
            devType: data.flexData.devType,
            sk: data.flexData.sk,
            pk: data.flexData.pk,
          })
        },
        onError(error) {
          console.log(error)
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
              Email ID
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
              <HelperText
                type="large"
                ml="0"
                mt="4px"
                color={theme.palette.error.main}
              >
                {errors.email.message}
              </HelperText>
            )}
          </Box>
          <Box display="flex" flexDirection="column" mb="16px">
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
              <HelperText
                type="large"
                ml="0"
                mt="4px"
                color={theme.palette.error.main}
              >
                {errors.password.message}
              </HelperText>
            )}
          </Box>
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
          {errors.checkbox && (
            <HelperText
              type="large"
              ml="0"
              mt="8px"
              color={theme.palette.error.main}
            >
              {errors.checkbox.message}
            </HelperText>
          )}
          <StyledButton
            variant="contained"
            color="primary"
            disableElevation
            $marginTop={errors.checkbox ? "28px" : "56px"}
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
                Email ID
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
                <HelperText
                  type="large"
                  ml="0"
                  mt="4px"
                  color={theme.palette.error.main}
                >
                  {errors.email.message}
                </HelperText>
              )}
            </Box>
            <Box display="flex" flexDirection="column" mb="16px">
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
                <HelperText
                  type="large"
                  ml="0"
                  mt="4px"
                  color={theme.palette.error.main}
                >
                  {errors.password.message}
                </HelperText>
              )}
            </Box>
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
            {errors.checkbox && (
              <HelperText
                type="large"
                ml="0"
                mt="8px"
                color={theme.palette.error.main}
              >
                {errors.checkbox.message}
              </HelperText>
            )}
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
