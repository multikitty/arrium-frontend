import React, { useState } from "react"
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material"
import { Link } from "gatsby"
import { Box, IconButton, useMediaQuery } from "@mui/material"
import { rem } from "polished"
import {
  StyledButton,
  StyledButtonText,
  StyledInputField,
  StyledLoginContainer,
  StyledLoginContainerMobile,
  StyledLoginText,
  StyledSignUpButton,
  StyledSignUpText,
  StyledWarningText,
} from "../commons/commonComponents"
import { useForm } from "react-hook-form"
import { emailAndPasswordFormOptions } from "../../validation"
import { StyledTextBox } from "./RegistrationSection.styled"
import { FormProps } from "../../pages/signup"

const SignupSection: React.FC<FormProps> = ({ setFormStage }) => {
  const [isVisible, SetIsVisible] = useState<boolean>(false)
  const isWebView = useMediaQuery("(min-width:768px)")

  const onSubmit = (data: any) => {
    console.log(data)
    setFormStage(prev => prev + 1)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(emailAndPasswordFormOptions)

  return isWebView ? (
    <StyledLoginContainer component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" justifyContent="center">
        <StyledLoginText>Sign up</StyledLoginText>
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
      <StyledTextBox>If you have a 6-digit code, enter it below</StyledTextBox>
      <StyledInputField
        mb={"0"}
        placeholder="6-digit code"
        variant="outlined"
        {...register("referral")}
      />
      <StyledButton
        variant="contained"
        color="primary"
        disableElevation
        margintop={rem("56px")}
        type="submit"
      >
        <StyledButtonText>Continue</StyledButtonText>
      </StyledButton>
      <Box display="flex" justifyContent="center">
        <StyledSignUpText>
          Already have an account?
          <StyledSignUpButton>
            <Link to="/signin"> Log in</Link>
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
          <StyledLoginText>Sign up</StyledLoginText>
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
        <Box minWidth={rem("250px")}>
          <StyledTextBox>
            If you have a 6-digit code, enter it below
          </StyledTextBox>
        </Box>
        <StyledInputField
          mb={"0"}
          placeholder="6-digit code"
          variant="outlined"
        />
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
          <StyledSignUpText>Already have an account?</StyledSignUpText>
          <StyledSignUpButton>
            <Link to="/signin">Log In</Link>
          </StyledSignUpButton>
        </Box>
      </Box>
    </StyledLoginContainerMobile>
  )
}
export default SignupSection
