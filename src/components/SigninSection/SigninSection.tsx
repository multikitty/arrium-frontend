import React, { useState } from "react"
import { useParams } from "@reach/router"
import { Box, IconButton, useMediaQuery } from "@mui/material"
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material"
import { useForm } from "react-hook-form"
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
import useNavigate, { ParamType } from "@/hooks/useNavigate"

const SigninSection = () => {
  const params = useParams()
  const { navigateToDefault, navigate } = useNavigate(params as ParamType)
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
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<formPropType>(emailAndPasswordOptions)

  const onSubmit = (data: formPropType) => {
    mutate(
      { email: data.email, password: data.password },
      {
        onSuccess({ data, success }) {
          if (!success) {
            setError("email", {
              type: "invalid_credentials",
              message: "Invalid email or password",
            })
            return setError(
              "password",
              {
                type: "invalid_credentials",
                message: "Invalid email or password",
              },
              {
                shouldFocus: true,
              }
            )
          }
          if (!data) return
          userStore.authenticateUser({
            id: data.customerID,
            firstName: data.firstname,
            lastName: data.lastname,
            country: "GB",
            phoneNumber: data.phoneNumber,
            isPhoneVerified: data.phoneVerified,
            email: data.email,
            isEmailVerified: data.emailVerified,
            role: data.role,
            plan: data.role === "admin" ? undefined : "basic",
            tzName: data.tzName,
            amznFlexUser: data.amznFlexUser,
            refCode: data.refCode,
            currentSteps: data.currentSteps,
          })
          navigateToDefault(data.role)
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
    // const { href, ...response } = await signIn(data.email, data.password)
    // userStore.authenticateUser(response)
    // navigate(`/${href}`)
  }

  const handleNavigateToSignUp = () => {
    navigate(routes.signup)
  }

  const handleNavigateToForgotPassword = () => {
    navigate(routes.forgotPassword)
  }

  return isWebView ? (
    <StyledLoginContainer component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" justifyContent="center">
        <StyledLoginText>Login to your account</StyledLoginText>
      </Box>
      <StyledInputField
        error={!!errors.email}
        placeholder="Enter Email Address"
        variant="outlined"
        {...register("email")}
      />
      {errors.email && (
        <StyledWarningText marginbottom={rem("16px")}>
          {errors.email.message}
        </StyledWarningText>
      )}
      <StyledInputField
        error={!!errors.password}
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
      {errors.password && (
        <StyledWarningText marginbottom={rem("16px")}>
          Please enter password
        </StyledWarningText>
      )}
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
        <StyledInputField
          error={!!errors.email}
          placeholder="Enter Email Address"
          variant="outlined"
          {...register("email")}
        />
        {errors.email && (
          <StyledWarningText marginbottom={rem("16px")}>
            {errors.email.message}
          </StyledWarningText>
        )}
        <StyledInputField
          error={!!errors.password}
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
        {errors.password && (
          <StyledWarningText marginbottom={rem("16px")}>
            {errors.password.message}
          </StyledWarningText>
        )}
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
  )
}

export default SigninSection
