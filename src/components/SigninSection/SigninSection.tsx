import React, { useState } from "react"
import { navigate } from "gatsby"
import { Link } from "@reach/router"
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
import { signIn } from "./SigninSection.mock"

const SigninSection = () => {
  const { userStore } = useStore()
  const isWebView = useMediaQuery(devices.web.up)
  const [isVisible, setIsVisible] = useState(false)

  type formPropType = typeof emailAndPasswordOptions.defaultValues
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<formPropType>(emailAndPasswordOptions)

  const onSubmit = async (data: formPropType) => {
    try {
      const { href, ...response } = await signIn(data.email, data.password)
      userStore.authenticateUser(response)
      navigate(`/${href}`)
    } catch (error) {
      if (error instanceof Error) {
        setError("email", new Error("Invalid email or password"))
        return setError("password", new Error("Invalid email or password"), {
          shouldFocus: true,
        })
      }
      console.error(error)
    }
  }

  return isWebView ? (
    <StyledLoginContainer component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" justifyContent="center">
        <StyledLoginText>Login to your account</StyledLoginText>
      </Box>
      <StyledInputField
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
          <Link to="/forgotPassword">Forgot Password?</Link>
        </StyledForgotPassword>
      </Box>
      <StyledButton
        variant="contained"
        color="primary"
        disableElevation
        margintop={rem("56px")}
        type="submit"
      >
        <StyledButtonText>Log In</StyledButtonText>
      </StyledButton>
      <Box display="flex" justifyContent="center">
        <StyledSignUpText>
          Don't have an account yet?
          <StyledSignUpButton>
            <Link to="/signup"> Sign Up</Link>
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
        {errors.email && (
          <StyledWarningText marginbottom={rem("16px")}>
            {errors.email.message}
          </StyledWarningText>
        )}
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
            <Link to="/forgotPassword">Forgot Password?</Link>
          </StyledForgotPassword>
        </Box>
        <StyledButton
          variant="contained"
          color="primary"
          disableElevation
          margintop={rem("56px")}
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
            <Link to="/signup"> Sign Up</Link>
          </StyledSignUpButton>
        </Box>
      </Box>
    </StyledLoginContainerMobile>
  )
}

export default SigninSection
