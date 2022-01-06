import React from "react"
import { Box, useMediaQuery } from "@mui/material"
import { rem } from "polished"
import { devices } from "../../constants/device"
import EmailSvg from "../../assets/icons/signup_email.inline.svg"
import {
  StyledButton,
  StyledButtonText,
  StyledLoginContainer,
  StyledLoginContainerMobile,
  StyledLoginText,
  StyledSignUpButton,
} from "../commons/commonComponents"
import { StyledText } from "../RegistrationSection/RegistrationSection.styled"
import { SignupStepsProgressMobile } from "../SignupStepsProgress/SignupStepsProgress"
import { FormProps } from "../../pages/signup"
import { Link } from "gatsby"

const HoldingPage: React.FC<FormProps> = ({ stage, step }) => {
  const isWebView = useMediaQuery(devices.web.up)

  return isWebView ? (
    <StyledLoginContainer>
      <Box display="flex" justifyContent="center">
        <StyledLoginText>We are setting your account up</StyledLoginText>
      </Box>
      <StyledText>
        You’ll receive a confirmation email withing 24 hours.
      </StyledText>
      <Box display="flex" justifyContent="center" marginTop={rem("28px")}>
        <EmailSvg />
      </Box>
      <StyledButton
        variant="contained"
        color="primary"
        disableElevation
        margintop={rem("56px")}
      >
        <StyledSignUpButton>
          <Link to="/signin">
            <StyledButtonText>OK</StyledButtonText>
          </Link>
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
          You’ll receive a confirmation email withing 24 hours.
        </StyledText>
        <Box display="flex" justifyContent="center" marginTop={rem("28px")}>
          <EmailSvg />
        </Box>
        <StyledButton
          variant="contained"
          color="primary"
          disableElevation
          margintop={rem("56px")}
        >
          <StyledSignUpButton>
            <Link to="/signin">
              <StyledButtonText>OK</StyledButtonText>
            </Link>
          </StyledSignUpButton>
        </StyledButton>
      </Box>
    </StyledLoginContainerMobile>
  )
}

export default HoldingPage
