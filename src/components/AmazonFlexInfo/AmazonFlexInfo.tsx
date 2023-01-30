import React, { useEffect, useState } from "react"
import { Box, IconButton, useMediaQuery } from "@mui/material"
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material"
import { rem } from "polished"
import { useMutation } from "react-query"
import { useSnackbar } from "notistack"

import { devices } from "@/constants/device"
import {
  StyledButton,
  StyledButtonText,
  StyledFieldLabel,
  StyledInputField,
  StyledLoginContainer,
  StyledLoginContainerMobile,
  StyledLoginText,
  StyledSignUpButton,
  StyledSignUpText,
} from "../commons/uiComponents"
import { SignupStepsProgressMobile } from "../SignupStepsProgress/SignupStepsProgress"
import { StyledText } from "../RegistrationSection/RegistrationSection.styled"
import { FormProps } from "../SignUpPage/SignUpPage"
import routes from "@/constants/routes"
import { IFlexInfoResult, IFlexInfoVariables } from "@/lib/interfaces/signup"
import { updateFlexInfo } from "@/agent/signup"
import useNavigate from "@/hooks/useNavigate"
import { IPageProps } from "@/lib/interfaces/common"

interface IAmazonFlexInfoProps extends FormProps, IPageProps {}

const AmazonFlexInfo: React.FC<IAmazonFlexInfoProps> = ({
  setFormStage,
  stage,
  step,
  country_code,
}) => {
  const {
    navigate,
    navigateWithQuery: { navigateToSignup },
  } = useNavigate({ country_code })
  const { enqueueSnackbar } = useSnackbar()
  const isWebView = useMediaQuery(devices.web.up)
  const [userName, setUserName] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [password, setPassword] = useState("")
  const [isButtonDisable, setIsButtonDisable] = useState(true)
  const { mutate } = useMutation<IFlexInfoResult, Error, IFlexInfoVariables>(
    updateFlexInfo
  )

  const handleNavigateToSignIn = () => {
    navigate(routes.signin)
  }

  const onSubmit = (e: React.FormEvent<HTMLDivElement | null>) => {
    e.preventDefault()

    mutate(
      { amznFlexUser: userName, amznFlexPassword: password },
      {
        onSuccess({ success, message, validationError }) {
          if (!success) {
            enqueueSnackbar(
              validationError?.amznFlexUser ||
                validationError?.amznFlexPassword ||
                message,
              {
                variant: "error",
              }
            )
            return
          }
          setFormStage((prev: number) => prev + 1)
          navigateToSignup(stage + 1)
        },
      }
    )
  }

  useEffect(() => {
    setIsButtonDisable(() => {
      if (password.length && userName.length) {
        return false
      }
      return true
    })
  }, [password, userName])

  return (
    <React.Fragment>
      {isWebView ? (
        <StyledLoginContainer component="form" onSubmit={onSubmit}>
          <Box display="flex" justifyContent="center">
            <StyledLoginText>Sign up</StyledLoginText>
          </Box>
          <StyledText>Please enter your Amazon Flex account details</StyledText>
          <Box mt={2}>
            <StyledFieldLabel $isHidden={!userName}>
              Amazon Flex Username
            </StyledFieldLabel>
          </Box>
          <StyledInputField
            autoComplete="amazon-flex-username"
            name="amazon-flex-username"
            placeholder="Amazon Flex Username"
            variant="outlined"
            type="email"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            required
          />
          <StyledFieldLabel $isHidden={!password}>
            Amazon Flex Password
          </StyledFieldLabel>
          <StyledInputField
            autoComplete="amazon-flex-password"
            name="amazon-flex-password"
            placeholder="Amazon Flex Password"
            type={isVisible ? "text" : "password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
            variant="outlined"
            required
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
          <StyledButton
            variant="contained"
            color="primary"
            disableElevation
            $marginTop={rem("56px")}
            type="submit"
            disabled={isButtonDisable}
          >
            <StyledButtonText>Continue</StyledButtonText>
          </StyledButton>
          <Box display="flex" justifyContent="center">
            <StyledSignUpText>
              Already have an account?
              <StyledSignUpButton onClick={handleNavigateToSignIn}>
                Log in
              </StyledSignUpButton>
            </StyledSignUpText>
          </Box>
        </StyledLoginContainer>
      ) : (
        <StyledLoginContainerMobile component="form" onSubmit={onSubmit}>
          {!isWebView && (
            <SignupStepsProgressMobile stage={stage} steps={step} />
          )}
          <Box
            display="flex"
            flexDirection="column"
            maxWidth={rem("375px")}
            mx={"auto"}
          >
            <Box display="flex" justifyContent="center">
              <StyledLoginText>Sign up</StyledLoginText>
            </Box>
            <StyledFieldLabel $isHidden={!userName}>
              Amazon Flex Username
            </StyledFieldLabel>
            <StyledInputField
              autoComplete="amazon-flex-username"
              name="amazon-flex-username"
              placeholder="Amazon Flex Username"
              variant="outlined"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              type="email"
              required
            />
            <StyledFieldLabel $isHidden={!password}>
              Amazon Flex Password
            </StyledFieldLabel>
            <StyledInputField
              autoComplete="amazon-flex-password"
              name="amazon-flex-password"
              placeholder="Amazon Flex Password"
              type={isVisible ? "text" : "password"}
              value={password}
              required
              onChange={e => setPassword(e.target.value)}
              variant="outlined"
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
            <StyledButton
              variant="contained"
              color="primary"
              disableElevation
              $marginTop={rem("56px")}
              type="submit"
              disabled={isButtonDisable}
            >
              <StyledButtonText>Continue</StyledButtonText>
            </StyledButton>
            <Box
              display="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
            >
              <StyledSignUpText>Already have an account?</StyledSignUpText>
              <StyledSignUpButton onClick={handleNavigateToSignIn}>
                Log In
              </StyledSignUpButton>
            </Box>
          </Box>
        </StyledLoginContainerMobile>
      )}
    </React.Fragment>
  )
}

export default AmazonFlexInfo
