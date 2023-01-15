import React, { useState } from "react"
import { Box, useMediaQuery } from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { useForm } from "react-hook-form"
import { rem } from "polished"

import {
  StyledButton,
  StyledButtonText,
  StyledFieldLabel,
  StyledInputField,
  StyledInstructionsText,
  StyledLoginContainer,
  StyledLoginContainerMobile,
  StyledCardHeader as StyledForgotPasswordCardHeader,
  StyledTitle,
  StyledTitleMobile,
  StyledWarningText,
} from "@/components/commons/uiComponents"
import { emailOptions } from "@/validation/emailAndPassword"
import { devices } from "@/constants/device"
import routes from "@/constants/routes"
import useNavigate from "@/hooks/useNavigate"
import { useMutation } from "react-query"
import {
  IForgotPasswordResult,
  IForgotPasswordVariables,
} from "@/lib/interfaces/forgotPassword"
import { forgotPassword } from "@/agent/forgotPassword"
import { useSnackbar } from "notistack"
import { IPageProps } from "@/lib/interfaces/common"

interface IForgotPasswordPageProps extends IPageProps {}

const ForgotPasswordPage: React.FC<IForgotPasswordPageProps> = ({
  country_code,
}) => {
  const { navigate } = useNavigate({ country_code })
  const { enqueueSnackbar } = useSnackbar()
  const { mutate } = useMutation<
    IForgotPasswordResult,
    Error,
    IForgotPasswordVariables
  >(forgotPassword)

  type formPropType = typeof emailOptions.defaultValues

  const isWebView = useMediaQuery(devices.web.up)
  const [isClicked, setIsClicked] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm<formPropType>(emailOptions)

  const onSubmit = async (data: formPropType) => {
    await mutate(
      { email: data.email },
      {
        onSuccess({ message, success, validationError }) {
          if (!success) {
            enqueueSnackbar(validationError?.email || message, {
              variant: "error",
            })
            setError("email", {
              message: "Email does not exist, try another",
            })
            return
          }
          enqueueSnackbar(message, { variant: "success" })
          setIsClicked(true)
        },
        onError(error, variables) {
          enqueueSnackbar(error.message, { variant: "error" })
          console.error("ERROR:", error)
          console.log("VARIABLES USED:", variables)
        },
      }
    )
  }

  const handleNavigateToHome = () => {
    navigate(routes.home)
  }

  const handleNavigateToSignIn = () => {
    navigate(routes.signin)
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
          <StyledLoginContainer onSubmit={handleSubmit(onSubmit)}>
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
              <StyledForgotPasswordCardHeader>
                {isClicked ? "Email Sent" : "Forgot password"}
              </StyledForgotPasswordCardHeader>
              <StyledInstructionsText>
                {isClicked
                  ? "An email has been sent to your email address. Follow the instructions in the email to reset your password"
                  : "Enter email address that you used to register"}
              </StyledInstructionsText>
            </Box>
            {!isClicked && (
              <React.Fragment>
                <StyledFieldLabel $isHidden={!getValues("email")}>
                  Email ID
                </StyledFieldLabel>
                <StyledInputField
                  placeholder="Enter Email Address"
                  variant="outlined"
                  error={!!errors.email}
                  {...register("email")}
                />
              </React.Fragment>
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
                <StyledButtonText onClick={handleNavigateToSignIn}>
                  Done
                </StyledButtonText>
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
          <StyledLoginContainerMobile onSubmit={handleSubmit(onSubmit)}>
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
                <StyledForgotPasswordCardHeader>
                  {isClicked ? "Email Sent" : "Forgot password"}
                </StyledForgotPasswordCardHeader>
                <StyledInstructionsText>
                  {isClicked
                    ? "An email has been sent to your email address. Follow the instructions in the email to reset your password"
                    : "Enter email address that you used to register"}
                </StyledInstructionsText>
              </Box>
              {!isClicked && (
                <React.Fragment>
                  <StyledFieldLabel $isHidden={!getValues("email")}>
                    Email ID
                  </StyledFieldLabel>
                  <StyledInputField
                    placeholder="Enter Email Address"
                    variant="outlined"
                    error={!!errors.email}
                    {...register("email")}
                  />
                </React.Fragment>
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
                  <StyledButtonText onClick={handleNavigateToSignIn}>
                    Done
                  </StyledButtonText>
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
