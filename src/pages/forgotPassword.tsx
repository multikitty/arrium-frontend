import { Box } from "@mui/material"
import { rem } from "polished"
import React, { useState } from "react"
import {
  StyledButton,
  StyledButtonText,
  StyledInputField,
  StyledInstructionsText,
  StyledLoginContainer,
  StyledLoginText as StyledForgotPasswordText,
  StyledTitle,
} from "../components/commomComponents"
import Seo from "../components/seo"
import TopLayout from "../components/topLayout"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { Link } from "gatsby"

const forgotPassword = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false)

  const handleClick = () => {
    setIsClicked(true)
  }

  return (
    <TopLayout>
      <Seo title="Forgot Password | Arrium" />
      <Box display="flex" justifyContent="center">
        <StyledTitle>Arrium</StyledTitle>
      </Box>
      <Box display="flex" alignItems="center" flexDirection="column">
        <StyledLoginContainer>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            {isClicked && (
              <Box mb={rem("24px")}>
                <CheckCircleIcon
                  style={{ color: "#2DB560", fontSize: "56px" }}
                />
              </Box>
            )}
            <StyledForgotPasswordText>
              {isClicked ? "Email Sent" : "Forgot password"}
            </StyledForgotPasswordText>
            <StyledInstructionsText>
              {isClicked
                ? "An email has been sent to your email address. Follow the instructions in the email to reset your password"
                : "Enter email address that you used to register"}
            </StyledInstructionsText>
          </Box>
          {!isClicked && (
            <StyledInputField
              placeholder="Enter Email Address"
              variant="outlined"
              type="email"
            />
          )}
          {isClicked ? (
            <StyledButton
              variant="contained"
              color="primary"
              disableElevation
              marginBotton={rem("32px")}
              onClick={handleClick}
            >
              <Link to="/resetPassword">
                <StyledButtonText>Done</StyledButtonText>
              </Link>
            </StyledButton>
          ) : (
            <StyledButton
              variant="contained"
              color="primary"
              disableElevation
              marginBotton={rem("44px")}
              onClick={handleClick}
            >
              <StyledButtonText>Send Instruction</StyledButtonText>
            </StyledButton>
          )}
        </StyledLoginContainer>
      </Box>
    </TopLayout>
  )
}

export default forgotPassword
