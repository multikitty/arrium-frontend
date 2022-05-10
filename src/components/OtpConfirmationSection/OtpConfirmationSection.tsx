import React, { useState } from "react"
import { Box, useMediaQuery } from "@mui/material"
import { devices } from "@/constants/device"
import {
  StyledButton,
  StyledButtonText,
  StyledLoginContainer,
  StyledLoginContainerMobile,
  StyledLoginText,
  StyledSignUpButton,
  StyledSignUpText,
} from "../commons/commonComponents"
import { rem } from "polished"
import { Link } from "gatsby"
import { SignupStepsProgressMobile } from "../SignupStepsProgress/SignupStepsProgress"
import { StyledText } from "../RegistrationSection/RegistrationSection.styled"
import { StyledOtpInput } from "./OtpConfirmationSection.styled"
import { LinkButton } from "../commons/Button"
import { FormProps } from "../SignUpPage/SignUpPage"

const OtpConfirmationSection: React.FC<FormProps> = ({
  setFormStage,
  stage,
  step,
}) => {
  const isWebView = useMediaQuery(devices.web.up)
  const [otp, setOtp] = useState<string>("")

  const handlePhoneNumberChange = () => {
    setFormStage(prev => prev - 1)
  }

  const handleSubmit = () => {
    console.log(otp)
    setFormStage(prev => prev + 1)
  }

  return isWebView ? (
    <StyledLoginContainer component="form" onSubmit={handleSubmit}>
      <Box display="flex" justifyContent="center">
        <StyledLoginText>Sign up</StyledLoginText>
      </Box>
      <StyledText>Enter a 4-digit code that we’ve sent you in SMS</StyledText>
      <Box display="flex" justifyContent="center" marginTop={rem("16px")}>
        <StyledOtpInput
          value={otp}
          onChange={e => setOtp(e)}
          numInputs={4}
          isInputNum
          shouldAutoFocus
        />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        marginTop={rem("32px")}
      >
        <LinkButton sx={{ marginBottom: "0.5rem" }} variant="text">
          Resend Code
        </LinkButton>
        <LinkButton variant="text" onClick={handlePhoneNumberChange}>
          Change Phone Number
        </LinkButton>
      </Box>
      <StyledButton
        variant="contained"
        color="primary"
        disableElevation
        margintop={rem("56px")}
        type="submit"
      >
        <StyledButtonText>Continue</StyledButtonText>
      </StyledButton>
      <Box display="flex" justifyContent="center">
        <StyledSignUpText>
          Already have an account?
          <StyledSignUpButton>
            <Link to="/signin"> Log In</Link>
          </StyledSignUpButton>
        </StyledSignUpText>
      </Box>
    </StyledLoginContainer>
  ) : (
    <StyledLoginContainerMobile component="form" onSubmit={handleSubmit}>
      {!isWebView && <SignupStepsProgressMobile stage={stage} steps={step} />}
      <Box
        display="flex"
        flexDirection="column"
        maxWidth={rem("375px")}
        mx={"auto"}
      >
        <Box display="flex" justifyContent="center">
          <StyledLoginText>Sign up</StyledLoginText>
        </Box>
        <StyledText>Enter a 4-digit code that we’ve sent you in SMS</StyledText>
        <Box display="flex" justifyContent="center" marginTop={rem("16px")}>
          <StyledOtpInput value={otp} onChange={e => setOtp(e)} numInputs={4} />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          marginTop={rem("32px")}
        >
          <LinkButton sx={{ marginBottom: "0.5rem" }} variant="text">
            Resend Code
          </LinkButton>
          <LinkButton variant="text" onClick={handlePhoneNumberChange}>
            Change Phone Number
          </LinkButton>
        </Box>
        <StyledButton
          variant="contained"
          color="primary"
          disableElevation
          margintop={rem("56px")}
          type="submit"
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
          <StyledSignUpButton>
            <Link to="/signin">Log In</Link>
          </StyledSignUpButton>
        </Box>
      </Box>
    </StyledLoginContainerMobile>
  )
}

export default OtpConfirmationSection
