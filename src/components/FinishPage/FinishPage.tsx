import { Box, useMediaQuery } from "@mui/material"
import { rem } from "polished"
import React from "react"
import { devices } from "../../constants/device"
import HandsSvg from "../../assets/icons/signup_hands.inline.svg"
import {
  StyledButton,
  StyledButtonText,
  StyledLoginContainer,
  StyledLoginContainerMobile,
  StyledLoginText,
} from "../commons/commonComponents"
import { StyledText } from "../RegistrationSection/RegistrationSection.styled"
import { SignupStepsProgressMobile } from "../SignupStepsProgress/SignupStepsProgress"

export interface FinishPageProps {
  stage: number
  step: string
  setShowOnHold: React.Dispatch<React.SetStateAction<boolean>>
}

const FinishPage: React.FC<FinishPageProps> = ({
  setShowOnHold,
  stage,
  step,
}) => {
  const isWebView = useMediaQuery(devices.web.up)
  const onSubmit = () => {
    setShowOnHold(true)
  }

  return isWebView ? (
    <StyledLoginContainer component="form" onSubmit={onSubmit}>
      <Box display="flex" justifyContent="center">
        <StyledLoginText>Account succesfully created</StyledLoginText>
      </Box>
      <StyledText>
        Go to main page and start searching for your next delivery
      </StyledText>
      <Box display="flex" justifyContent="center" marginTop={rem("28px")}>
        <HandsSvg />
      </Box>
      <StyledButton
        variant="contained"
        color="primary"
        disableElevation
        margintop={rem("56px")}
        type="submit"
      >
        <StyledButtonText>Main Page</StyledButtonText>
      </StyledButton>
    </StyledLoginContainer>
  ) : (
    <StyledLoginContainerMobile component="form" onSubmit={onSubmit}>
      {!isWebView && <SignupStepsProgressMobile stage={stage} steps={step} />}
      <Box
        display="flex"
        flexDirection="column"
        maxWidth={rem("375px")}
        mx={"auto"}
      >
        <Box display="flex" justifyContent="center">
          <StyledLoginText>Account succesfully created</StyledLoginText>
        </Box>
        <StyledText>
          Go to main page and start searching for your next delivery
        </StyledText>
        <Box display="flex" justifyContent="center" marginTop={rem("28px")}>
          <HandsSvg />
        </Box>
        <StyledButton
          variant="contained"
          color="primary"
          disableElevation
          margintop={rem("56px")}
          type="submit"
        >
          <StyledButtonText>Main Page</StyledButtonText>
        </StyledButton>
      </Box>
    </StyledLoginContainerMobile>
  )
}

export default FinishPage
