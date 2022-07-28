import React, { useState } from "react"
import { useParams } from "@reach/router"
import { Box, useMediaQuery } from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { useForm } from "react-hook-form"
import { rem } from "polished"

import {
  StyledButton,
  StyledButtonText,
  StyledInputField,
  StyledInstructionsText,
  StyledLoginContainer,
  StyledLoginContainerMobile,
  StyledLoginText as StyledForgotPasswordText,
  StyledTitle,
  StyledTitleMobile,
  StyledWarningText,
} from "@/components/commons/uiComponents"
import { emailOptions } from "@/validation/emailAndPassword"
import { devices } from "@/constants/device"
import routes from "@/constants/routes"
import useNavigate, { ParamType } from "@/hooks/useNavigate"

const ForgotPasswordPage = () => {
  const params = useParams()
  const { navigate } = useNavigate(params as ParamType)

  type formPropType = typeof emailOptions.defaultValues

  const isWebView = useMediaQuery(devices.web.up)
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formPropType>(emailOptions)

  const onSubmit = () =>
    // data: formPropType
    {
      setIsClicked(true)
      isClicked && navigate(routes.resetPassword)
    }

  const handleNavigateToHome = () => {
    navigate(routes.home)
  }

  return (
    <React.Fragment>
      {isWebView ? (
        <Box
          display="flex"
          justifyContent="center"
          onClick={handleNavigateToHome}
        >
          <StyledTitle>Arrium</StyledTitle>
        </Box>
      ) : (
        <Box
          height={rem("64px")}
          display="flex"
          alignItems="center"
          onClick={handleNavigateToHome}
        >
          <StyledTitleMobile>Arrium</StyledTitleMobile>
        </Box>
      )}
      <Box display="flex" alignItems="center" flexDirection="column">
        {isWebView ? (
          <StyledLoginContainer
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                {...register("email")}
              />
            )}
            {errors.email && (
              <StyledWarningText marginbottom={rem("16px")}>
                {errors.email.message}
              </StyledWarningText>
            )}
            {isClicked ? (
              <StyledButton
                variant="contained"
                color="primary"
                disableElevation
                $marginTop={rem("32px")}
                type="submit"
              >
                <StyledButtonText>Done</StyledButtonText>
              </StyledButton>
            ) : (
              <StyledButton
                variant="contained"
                color="primary"
                disableElevation
                type="submit"
                $marginTop={rem("44px")}
              >
                <StyledButtonText>Send Instruction</StyledButtonText>
              </StyledButton>
            )}
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
                  {...register("email")}
                />
              )}
              {errors.email && (
                <StyledWarningText marginbottom={rem("16px")}>
                  {errors.email.message}
                </StyledWarningText>
              )}
              {isClicked ? (
                <StyledButton
                  variant="contained"
                  color="primary"
                  disableElevation
                  type="submit"
                  $marginTop={rem("32px")}
                >
                  <StyledButtonText>Done</StyledButtonText>
                </StyledButton>
              ) : (
                <StyledButton
                  variant="contained"
                  color="primary"
                  disableElevation
                  type="submit"
                  $marginTop={rem("44px")}
                >
                  <StyledButtonText>Send Instruction</StyledButtonText>
                </StyledButton>
              )}
            </Box>
          </StyledLoginContainerMobile>
        )}
      </Box>
    </React.Fragment>
  )
}

export default ForgotPasswordPage
