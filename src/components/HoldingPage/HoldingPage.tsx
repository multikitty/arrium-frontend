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
  lang,
}) => {
  const { navigate } = useNavigate({ country_code, lang })
  const isWebView = useMediaQuery(devices.web.up)

  const handleNavigateToSignIn = () => {
    navigate(routes.signin)
  }

  return isWebView ? (
    <StyledLoginContainer>
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
      >
        <StyledSignUpButton onClick={handleNavigateToSignIn}>
          <StyledButtonText>OK</StyledButtonText>
        </StyledSignUpButton>
      </StyledButton>
    </StyledLoginContainer>
  ) : (
    <StyledLoginContainerMobile>
      {!isWebView && <SignupStepsProgressMobile stage={stage} steps={step} />}
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
        >
          <StyledSignUpButton onClick={handleNavigateToSignIn}>
            <StyledButtonText>OK</StyledButtonText>
          </StyledSignUpButton>
        </StyledButton>
      </Box>
    </StyledLoginContainerMobile>
  )
}

export default HoldingPage
