import React, { useState } from "react"
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
} from "../commons/commonComponents"
import { useForm, Controller } from "react-hook-form"
import formOptions from "@/validation/emailAndPasswordValidation"
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material"
import { Box, IconButton, useMediaQuery } from "@mui/material"
import { navigate } from "gatsby"
import { rem } from "polished"
import { devices } from "@/constants/device"
import { useStore } from "@/store"
import { Link } from "@reach/router"
import { UserRoles } from "@/types/common"

const SigninSection = () => {
  const { userStore } = useStore()
  const [isVisible, SetIsVisible] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm(formOptions.emailAndPasswordFormOptions)
  const isWebView = useMediaQuery(devices.web.up)
  const [isError] = useState(false)

  const onSubmit = (data: any) => {
    if (data.email === "mhussain@gmail.com" && data.password === "#h3!!O!23") {
      userStore.authenticateUser({
        firstName: "Mo",
        lastName: "Hussain",
        phoneNumber: "+44 12 34 5678",
        email: "mhussain@gmail.com",
        isPhoneVerified: true,
        isEmailVerified: true,
        role: UserRoles.admin,
      })
      navigate("/customers")
    } else {
      userStore.authenticateUser({
        firstName: "Eliza",
        lastName: "Doolittle",
        phoneNumber: "+44 12 34 5678",
        email: "eliza.doolittle@gmail.com",
        isPhoneVerified: true,
        isEmailVerified: false,
        role: UserRoles.driver,
      })
      navigate("/")
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
            <IconButton onClick={() => SetIsVisible(prev => !prev)}>
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
          <Controller
            control={control}
            name="rememberMe"
            render={({ field }) => (
              <StyledCheckBox type="checkbox" id="rememberMe" {...field} />
            )}
          />
          <StyledRemeberMeText htmlFor="rememberMe">
            Remember me
          </StyledRemeberMeText>
        </Box>
        <StyledForgotPassword>
          <Link to="/forgotPassword">Forgot Password?</Link>
        </StyledForgotPassword>
      </Box>
      <Box display="flex" justifyContent="center" mt={rem("16px")}>
        {isError && (
          <StyledWarningText>
            Your email address or password is incorrect
          </StyledWarningText>
        )}
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
              <IconButton onClick={() => SetIsVisible(prev => !prev)}>
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
            <Controller
              control={control}
              name="rememberMe"
              render={({ field }) => (
                <StyledCheckBox type="checkbox" id="rememberMe" {...field} />
              )}
            />
            <StyledRemeberMeText htmlFor="rememberMe">
              Remember me
            </StyledRemeberMeText>
          </Box>
          <StyledForgotPassword>
            <Link to="/forgotPassword">Forgot Password?</Link>
          </StyledForgotPassword>
        </Box>
        <Box display="flex" justifyContent="center" mt={rem("16px")}>
          {isError && (
            <StyledWarningText>
              Your email address or password is incorrect
            </StyledWarningText>
          )}
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
