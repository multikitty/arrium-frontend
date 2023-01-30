import React, { useState } from "react"
import { Box, useMediaQuery } from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { useForm } from "react-hook-form"

import {
  StyledButton,
  StyledButtonText,
  StyledFieldLabel,
  StyledLoginContainer,
  StyledLoginContainerMobile,
  StyledCardHeader as StyledForgotPasswordCardHeader,
  StyledTitle,
  StyledTitleMobile,
} from "@/components/commons/uiComponents"
import { emailOptions } from "@/validation/emailAndPassword"
import { devices } from "@/constants/device"
import routes from "@/constants/routes"
import useNavigate from "@/hooks/useNavigate"
import { useMutation } from "react-query"
import {
  ForgotPasswordResult,
  ForgotPasswordVariables,
} from "@/lib/interfaces/forgotPassword"
import { forgotPassword } from "@/agent/forgotPassword"
import { useSnackbar } from "notistack"
import { PageProps } from "@/lib/interfaces/common"
import { StyledInstructionsText } from "./ForgotPasswordPage.styled"
import InputField from "@/components/commons/InputField"
import HelperText from "@/components/commons/HelperText"

interface ForgotPasswordPageProps extends PageProps {}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({
  country_code,
}) => {
  const { navigate } = useNavigate({ country_code })
  const { enqueueSnackbar } = useSnackbar()
  const { mutate } = useMutation<
    ForgotPasswordResult,
    Error,
    ForgotPasswordVariables
  >(forgotPassword)

  type FormPropType = typeof emailOptions.defaultValues

  const isWebView = useMediaQuery(devices.web.up)
  const [isClicked, setIsClicked] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
    watch,
  } = useForm<FormPropType>({
    ...emailOptions,
    mode: "onChange",
  })
  watch("email")

  const onSubmit = async (data: FormPropType) => {
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

  const isSubmitDisabled = !getValues("email") || !!errors.email

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
          height={"64px"}
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
                <Box mb={"24px"}>
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
                <InputField
                  placeholder="Enter Email Address"
                  variant="outlined"
                  error={!!errors.email}
                  {...register("email")}
                />
              </React.Fragment>
            )}
            {errors.email && (
              <HelperText type="large" mb={"16px"}>
                {errors.email.message}
              </HelperText>
            )}
            {isClicked ? (
              <StyledButton
                variant="contained"
                color="primary"
                disableElevation
                $marginTop={"32px"}
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
                $marginTop={"44px"}
                disabled={isSubmitDisabled}
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
              maxWidth={"375px"}
              mx={"auto"}
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                {isClicked && (
                  <Box mb={"24px"}>
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
                  <InputField
                    placeholder="Enter Email Address"
                    variant="outlined"
                    error={!!errors.email}
                    {...register("email")}
                  />
                </React.Fragment>
              )}
              {errors.email && (
                <HelperText type="large" mb={"16px"}>
                  {errors.email.message}
                </HelperText>
              )}
              {isClicked ? (
                <StyledButton
                  variant="contained"
                  color="primary"
                  disableElevation
                  type="submit"
                  $marginTop={"32px"}
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
                  $marginTop={"44px"}
                  disabled={isSubmitDisabled}
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
