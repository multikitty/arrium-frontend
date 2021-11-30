import { Box } from "@mui/system"
import React, { useState } from "react"
import {
  StyledButton,
  StyledButtonText,
  StyledCheckBox,
  StyledForgotPassword,
  StyledInputField,
  StyledLoginContainer,
  StyledLoginText,
  StyledRemeberMeText,
  StyledSignUpButton,
  StyledSignUpText,
  StyledTitle,
} from "../components/commomComponents"
import Seo from "../components/seo"
import TopLayout from "../components/topLayout"
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { Link } from "gatsby"
import { rem } from "polished"

const signin = () => {
  const [isVisible, SetIsVisible] = useState<boolean>(false)

  return (
    <TopLayout>
      <Seo title="Sign In | Arrium" />
      <Box display="flex" justifyContent="center">
        <StyledTitle>Arrium</StyledTitle>
      </Box>
      <Box display="flex" alignItems="center" flexDirection="column">
        <StyledLoginContainer>
          <Box display="flex" justifyContent="center">
            <StyledLoginText>Login to your account</StyledLoginText>
          </Box>
          <StyledInputField
            placeholder="Enter Email Address"
            variant="outlined"
            type="email"
          />
          <StyledInputField
            placeholder="Enter Password"
            type={isVisible ? "text" : "password"}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => SetIsVisible(prev => !prev)}>
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
              <StyledCheckBox type="checkbox" id="rememberMe" />
              <StyledRemeberMeText htmlFor="rememberMe">
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
            marginBotton={rem("56px")}
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
      </Box>
    </TopLayout>
  )
}

export default signin
