import React from "react"
import { Box, useMediaQuery } from "@mui/material"
import { rem } from "polished"

import { devices } from "@/constants/device"
import EmailSvg from "@/assets/icons/signup_email.inline.svg"
import {
  StyledButton,
  StyledButtonText,
  StyledLoginContainer,
  StyledLoginContainerMobile,
  StyledLoginText,
  StyledSignUpButton,
} from "../commons/uiComponents"
import { StyledText } from "../RegistrationSection/RegistrationSection.styled"
import { SignupStepsProgressMobile } from "../SignupStepsProgress/SignupStepsProgress"

import { FormProps } from "../SignUpPage/SignUpPage"
import routes from "@/constants/routes"
import useNavigate from "@/hooks/useNavigate"
import { IPageProps } from "@/lib/interfaces/common"

interface IHoldingPageProps extends FormProps, IPageProps {}

const HoldingPage: React.FC<IHoldingPageProps> = ({
  stage,
  step,
  country_code,
}) => {
  const { navigate } = useNavigate({ country_code })
  const isWebView = useMediaQuery(devices.web.up)

  const onSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault()
    navigate(routes.signin)
  }

  return (
    <React.Fragment>
      {isWebView ? (
        <StyledLoginContainer component="form" onSubmit={onSubmit}>
          <Box display="flex" justifyContent="center">
            <StyledLoginText>We are setting your account up</StyledLoginText>
          </Box>
          <StyledText>
            You&apos;ll receive a confirmation email within 24 hours.
          </StyledText>
          <Box display="flex" justifyContent="center" marginTop={rem("28px")}>
            <EmailSvg />
          </Box>
          <StyledButton
            variant="contained"
            color="primary"
            disableElevation
            $marginTop={rem("56px")}
            type="submit"
          >
            <StyledSignUpButton>
              <StyledButtonText>OK</StyledButtonText>
            </StyledSignUpButton>
          </StyledButton>
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
              <StyledLoginText>We are setting your account up</StyledLoginText>
            </Box>
            <StyledText>
              You&apos;ll receive a confirmation email within 24 hours.
            </StyledText>
            <Box display="flex" justifyContent="center" marginTop={rem("28px")}>
              <EmailSvg />
            </Box>
            <StyledButton
              variant="contained"
              color="primary"
              disableElevation
              $marginTop={rem("56px")}
              type="submit"
            >
              <StyledSignUpButton>
                <StyledButtonText>OK</StyledButtonText>
              </StyledSignUpButton>
            </StyledButton>
          </Box>
        </StyledLoginContainerMobile>
      )}
    </React.Fragment>
  )
}

export default HoldingPage
