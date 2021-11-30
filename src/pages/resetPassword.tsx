import { Box, IconButton, useMediaQuery } from "@mui/material"
import { rem } from "polished"
import React, { useEffect, useState } from "react"
import {
  StyledButton,
  StyledButtonText,
  StyledInputField,
  StyledLoginContainer,
  StyledLoginContainerMobile,
  StyledLoginText,
  StyledTitle,
  StyledTitleMobile,
  StyledWarningText,
} from "../components/commomComponents"
import Seo from "../components/seo"
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material"
import TopLayout from "../components/topLayout"

const resetPassword = () => {
  const [isPasswordVisible, SetIsPasswordVisible] = useState<boolean>(false)
  const [isConfirmPasswordVisible, SetIsConfirmPasswordVisible] =
    useState<boolean>(false)
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [isMatches, setIsMatches] = useState<boolean>(false)

  useEffect(() => {
    if (password?.length > 0 || confirmPassword?.length > 0)
      setIsMatches(password === confirmPassword)
  }, [password, confirmPassword])

  const isWebView = useMediaQuery("(min-width:768px")

  return (
    <TopLayout>
      <Seo title="Reset Password | Arrium" />
      {isWebView ? (
        <Box display="flex" justifyContent="center">
          <StyledTitle>Arrium</StyledTitle>
        </Box>
      ) : (
        <Box height={rem("64px")} display="flex" alignItems="center">
          <StyledTitleMobile>Arrium</StyledTitleMobile>
        </Box>
      )}
      <Box display="flex" alignItems="center" flexDirection="column">
        {isWebView ? (
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
              value={password}
              onChange={e => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => SetIsPasswordVisible(prev => !prev)}
                  >
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
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
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
            {password.length > 0 && !isMatches ? (
              <StyledWarningText>Both Passwords should match</StyledWarningText>
            ) : null}
            <StyledButton
              variant="contained"
              color="primary"
              disableElevation
              disabled={!isMatches}
              margintop={rem("32px")}
            >
              <StyledButtonText>Save</StyledButtonText>
            </StyledButton>
          </StyledLoginContainer>
        ) : (
          <StyledLoginContainerMobile>
            <Box
              display="flex"
              flexDirection="column"
              maxWidth={rem("375px")}
              mx={"auto"}
            >
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
                value={password}
                onChange={e => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => SetIsPasswordVisible(prev => !prev)}
                    >
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
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
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
              {password.length > 0 && !isMatches ? (
                <StyledWarningText>
                  Both Passwords should match
                </StyledWarningText>
              ) : null}
              <StyledButton
                variant="contained"
                color="primary"
                disableElevation
                disabled={!isMatches}
                margintop={rem("32px")}
              >
                <StyledButtonText>Save</StyledButtonText>
              </StyledButton>
            </Box>
          </StyledLoginContainerMobile>
        )}
      </Box>
    </TopLayout>
  )
}

export default resetPassword
