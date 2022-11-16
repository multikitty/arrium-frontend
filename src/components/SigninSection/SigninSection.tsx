import React, { useState } from "react"
import { Box, IconButton, useMediaQuery } from "@mui/material"
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material"
import { useForm, useWatch } from "react-hook-form"
import { rem } from "polished"

import {
  StyledButton,
  StyledButtonText,
  StyledCheckBox,
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
import { DEFAULT_COUNTRY, DEFAULT_PLAN } from "@/constants/common"

interface ISigninSectionProps extends IPageProps {}

const SigninSection: React.FC<ISigninSectionProps> = ({ country_code }) => {
  const { navigateToDefault, navigate } = useNavigate({ country_code })
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

  const onSubmit = (props: formPropType) => {
    mutate(
      { email: props.email, password: props.password },
      {
        onSuccess({ data, success }) {
          if (!success) {
            setError("password", {
              message: "Your email address or password is incorrect",
              type: "validate",
            })
          }
          if (!data) return
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
          })
          setLocalStorage(TOKEN, data.userData.token)
          navigateToDefault(data.userData.role)
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

  const isLoginDisabled =
    !getValues("email") ||
    !getValues("password") ||
    !!errors.email ||
    !!errors.password

  return isWebView ? (
    <StyledLoginContainer component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" justifyContent="center">
        <StyledLoginText>Login to your account</StyledLoginText>
      </Box>
      <StyledInputField
        autoFocus
        placeholder="Enter Email Address"
        variant="outlined"
        {...register("email")}
      />
      <StyledInputField
        placeholder="Enter Password"
        type={isVisible ? "text" : "password"}
        variant="outlined"
        {...register("password")}
        InputProps={{
          endAdornment: (
            <IconButton onClick={() => setIsVisible(prev => !prev)}>
              {isVisible ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
            </IconButton>
          ),
        }}
      />
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <StyledCheckBox
            type="checkbox"
            id="rememberMe-checkbox"
            {...register("checkbox")}
          />
          <StyledRemeberMeText htmlFor="rememberMe-checkbox">
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
        <StyledWarningText marginTop={rem("20px")} marginbottom={rem("-32px")}>
          {errors.password.message}
        </StyledWarningText>
      )}
      <StyledButton
        variant="contained"
        color="primary"
        disableElevation
        $marginTop={rem("56px")}
        type="submit"
        disabled={isLoginDisabled}
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
        <StyledInputField
          placeholder="Enter Email Address"
          variant="outlined"
          {...register("email")}
        />
        <StyledInputField
          placeholder="Enter Password"
          type={isVisible ? "text" : "password"}
          variant="outlined"
          {...register("password")}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => setIsVisible(prev => !prev)}>
                {isVisible ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
              </IconButton>
            ),
          }}
        />
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <StyledCheckBox
              type="checkbox"
              id="rememberMe-checkbox"
              {...register("checkbox")}
            />
            <StyledRemeberMeText htmlFor="rememberMe-checkbox">
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
          disabled={isLoginDisabled}
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
  )
}

export default SigninSection
