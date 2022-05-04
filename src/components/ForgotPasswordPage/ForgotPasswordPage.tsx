import React, { useState } from "react"
import { navigate } from "gatsby"
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
} from "@/components/commons/commonComponents"
import formOptions from "@/validation/emailAndPasswordValidation"
import { devices } from "@/constants/device"

const ForgotPasswordPage = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions.emailFormOptions)
  const isWebView = useMediaQuery(devices.web.up)
  const onSubmit = (data: any) => {
    console.log(data)
    setIsClicked(true)
    isClicked && navigate("/resetPassword")
  }

  return (
    <React.Fragment>
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
                margintop={rem("32px")}
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
                margintop={rem("44px")}
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
                  margintop={rem("32px")}
                >
                  <StyledButtonText>Done</StyledButtonText>
                </StyledButton>
              ) : (
                <StyledButton
                  variant="contained"
                  color="primary"
                  disableElevation
                  type="submit"
                  margintop={rem("44px")}
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
