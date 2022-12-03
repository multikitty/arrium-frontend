import React, { useState } from "react"
import { Box, IconButton, useMediaQuery } from "@mui/material"
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material"
import { useForm, useWatch } from "react-hook-form"
import { rem } from "polished"

import {
  StyledButton,
  StyledButtonText,
  StyledCheckBox,
  StyledFieldLabel,
  StyledForgotPassword,
  StyledInputField,
  StyledLoginContainer,
  StyledLoginContainerMobile,
  StyledLoginText,
  StyledRemeberMeText,
  StyledSignUpButton,
  StyledSignUpText,
  StyledWarningText,
} from "@/components/commons/uiComponents"
import emailAndPasswordOptions from "@/validation/emailAndPassword"
import { devices } from "@/constants/device"
import { useStore } from "@/store"
import { useMutation } from "react-query"
import { signinUser } from "@/agent/signin"
import {
  ISigninUserResult,
  ISigninUserVariables,
} from "@/lib/interfaces/signin"
import routes from "@/constants/routes"
import useNavigate from "@/hooks/useNavigate"
import { setLocalStorage } from "@/utils/localStorage"
import { IPageProps } from "@/lib/interfaces/common"
import { TOKEN } from "@/constants/localStorage"
import {
  DEFAULT_COUNTRY,
  DEFAULT_PLAN,
  REGISTRATION_STEP_MAP,
} from "@/constants/common"
import { RegistrationStepsType } from "@/types/common"

interface ISigninSectionProps extends IPageProps {}

const SigninSection: React.FC<ISigninSectionProps> = ({ country_code }) => {
  const {
    navigateToDefault,
    navigate,
    navigateWithQuery: { navigateToSignup },
  } = useNavigate({ country_code })
  const { userStore } = useStore()
  const isWebView = useMediaQuery(devices.web.up)
  const [isVisible, setIsVisible] = useState(false)
  const { mutate } = useMutation<
    ISigninUserResult,
    Error,
    ISigninUserVariables
  >(signinUser)

  type formPropType = typeof emailAndPasswordOptions.defaultValues
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors },
    getValues,
  } = useForm<formPropType>(emailAndPasswordOptions)

  useWatch({ name: "email", control })
  useWatch({ name: "password", control })

  const handleNavigateToSignupStep = (step: RegistrationStepsType) => {
    navigateToSignup(REGISTRATION_STEP_MAP[step])
  }

  const onSubmit = (props: formPropType) => {
    mutate(
      {
        email: props.email,
        password: props.password,
      },
      {
        onSuccess({ data, success }) {
          if (!success) {
            setError("password", {
              message: "Your email address or password is incorrect",
              type: "validate",
            })
          }
          if (!data) return
          if (data.userData.currentSteps !== "finished") {
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
            endDate: data.userData.endDate
          })
          setLocalStorage(TOKEN, data.userData.token)
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
            pk: data.flexData.pk
          })
        },
        onError(error) {
          console.log(error)
          setError("email", new Error("Invalid email or password"))
          setError("password", new Error("Invalid email or password"), {
            shouldFocus: true,
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
        <StyledLoginContainer
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box display="flex" justifyContent="center">
            <StyledLoginText>Login to your account</StyledLoginText>
          </Box>
          <StyledFieldLabel $isHidden={!getValues("email")}>
            Email ID
          </StyledFieldLabel>
          <StyledInputField
            autoFocus
            placeholder="Enter Email Address"
            variant="outlined"
            {...register("email")}
          />
          <StyledFieldLabel $isHidden={!getValues("password")}>
            Password
          </StyledFieldLabel>
          <StyledInputField
            placeholder="Enter Password"
            type={isVisible ? "text" : "password"}
            variant="outlined"
            {...register("password")}
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
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <StyledCheckBox
                type="checkbox"
                id="remember-me-checkbox"
                {...register("checkbox")}
              />
              <StyledRemeberMeText htmlFor="remember-me-checkbox">
                Remember me
              </StyledRemeberMeText>
            </Box>
            <StyledForgotPassword>
              <StyledSignUpButton onClick={handleNavigateToForgotPassword}>
                Forgot Password?
              </StyledSignUpButton>
            </StyledForgotPassword>
          </Box>
          {errors.password && (
            <StyledWarningText
              marginTop={rem("20px")}
              marginbottom={rem("-32px")}
            >
              {errors.password.message}
            </StyledWarningText>
          )}
          <StyledButton
            variant="contained"
            color="primary"
            disableElevation
            $marginTop={rem("56px")}
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
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box
            display="flex"
            flexDirection="column"
            maxWidth={rem("375px")}
            mx={"auto"}
          >
            <Box display="flex" justifyContent="center">
              <StyledLoginText>Login to your account</StyledLoginText>
            </Box>
            <StyledFieldLabel $isHidden={!getValues("email")}>
              Email ID
            </StyledFieldLabel>
            <StyledInputField
              placeholder="Enter Email Address"
              variant="outlined"
              {...register("email")}
            />
            <StyledFieldLabel $isHidden={!getValues("password")}>
              Password
            </StyledFieldLabel>
            <StyledInputField
              placeholder="Enter Password"
              type={isVisible ? "text" : "password"}
              variant="outlined"
              {...register("password")}
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
            <Box display="flex" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <StyledCheckBox
                  type="checkbox"
                  id="remember-me-checkbox"
                  {...register("checkbox")}
                />
                <StyledRemeberMeText htmlFor="remember-me-checkbox">
                  Remember me
                </StyledRemeberMeText>
              </Box>
              <StyledForgotPassword>
                <StyledSignUpButton onClick={handleNavigateToForgotPassword}>
                  Forgot Password?
                </StyledSignUpButton>
              </StyledForgotPassword>
            </Box>
            {errors.password && (
              <StyledWarningText
                marginTop={rem("16px")}
                marginbottom={rem("-32px")}
              >
                {errors.password.message}
              </StyledWarningText>
            )}
            <StyledButton
              variant="contained"
              color="primary"
              disableElevation
              $marginTop={rem("56px")}
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
