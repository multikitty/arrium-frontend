import { Box, IconButton } from "@mui/material"
import { rem } from "polished"
import React, { useState } from "react"
import {
  StyledButton,
  StyledButtonText,
  StyledInputField,
  StyledLoginContainer,
  StyledLoginText,
  StyledTitle,
} from "../components/commomComponents"
import Seo from "../components/seo"
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material"
import TopLayout from "../components/topLayout"

const resetPassword = () => {
  const [isPasswordVisible, SetIsPasswordVisible] = useState<boolean>(false)
  const [isConfirmPasswordVisible, SetIsConfirmPasswordVisible] =
    useState<boolean>(false)

  return (
    <TopLayout>
      <Seo title="Reset Password | Arrium" />
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
            <StyledLoginText>Reset Password</StyledLoginText>
          </Box>

          <StyledInputField
            placeholder="New password"
            type={isPasswordVisible ? "text" : "password"}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => SetIsPasswordVisible(prev => !prev)}>
                  {isPasswordVisible ? (
                    <VisibilityOffOutlined />
                  ) : (
                    <VisibilityOutlined />
                  )}
                </IconButton>
              ),
            }}
          />
          <StyledInputField
            placeholder="Confirm new password"
            type={isConfirmPasswordVisible ? "text" : "password"}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => SetIsConfirmPasswordVisible(prev => !prev)}
                >
                  {isConfirmPasswordVisible ? (
                    <VisibilityOffOutlined />
                  ) : (
                    <VisibilityOutlined />
                  )}
                </IconButton>
              ),
            }}
          />
          <StyledButton
            variant="contained"
            color="primary"
            disableElevation
            marginBotton={rem("32px")}
          >
            <StyledButtonText>Save</StyledButtonText>
          </StyledButton>
        </StyledLoginContainer>
      </Box>
    </TopLayout>
  )
}

export default resetPassword
