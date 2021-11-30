import { Box, useMediaQuery } from "@mui/material"
import { rem } from "polished"
import React, { useState } from "react"
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
} from "../components/commomComponents"
import Seo from "../components/seo"
import TopLayout from "../components/topLayout"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { Link } from "gatsby"
import { useForm } from "react-hook-form"

const forgotPassword = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const isWebView = useMediaQuery("(min-width:768px")
  const onSubmit = (data: any) => {
    console.log(data)
    setIsClicked(true)
  }
  console.log(errors)
  return (
    <TopLayout>
      <Seo title="Forgot Password | Arrium" />
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
                {...register("Email", {
                  required: true,
                  pattern:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
              />
            )}
            {errors.Email && (
              <StyledWarningText marginbottom={rem("16px")}>
                Please Enter valid Email!
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
                <Link to="/resetPassword">
                  <StyledButtonText>Done</StyledButtonText>
                </Link>
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
                  {...register("Email", {
                    required: true,
                    pattern:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
              )}
              {errors.Email && (
                <StyledWarningText marginbottom={rem("16px")}>
                  Please Enter valid Email!
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
                  <Link to="/resetPassword">
                    <StyledButtonText>Done</StyledButtonText>
                  </Link>
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
    </TopLayout>
  )
}

export default forgotPassword
