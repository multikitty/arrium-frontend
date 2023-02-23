import React from "react"
import { Box, useMediaQuery } from "@mui/material"

import { devices } from "@/constants/device"
import HandsSvg from "@/assets/icons/signup_hands.inline.svg"
import {
  StyledButton,
  StyledButtonText,
  StyledLoginContainer,
  StyledLoginContainerMobile,
  StyledCardHeader,
} from "@/components/commons/uiComponents"
import { StyledText } from "@/components/RegistrationSection/RegistrationSection.styled"
import { SignupStepsProgressMobile } from "@/components/SignupStepsProgress/SignupStepsProgress"
import { PageProps } from "@/lib/interfaces/common"
import useNavigate from "@/hooks/useNavigate"
import routes from "@/constants/routes"

interface FinishPageProps extends PageProps {
  stage: number
  step: string
}

const FinishPage: React.FC<FinishPageProps> = ({
  stage,
  step,
  country_code,
}) => {
  const { navigate } = useNavigate({ country_code })
  const isWebView = useMediaQuery(devices.web.up)
  const onSubmit = (e: React.FormEvent<HTMLFormElement | null>) => {
    e.preventDefault()
    navigate(routes.availability)
  }

  return isWebView ? (
    <StyledLoginContainer onSubmit={onSubmit}>
      <Box display="flex" justifyContent="center">
        <StyledCardHeader>Account succesfully created</StyledCardHeader>
      </Box>
      <StyledText>
        Go to main page and start searching for your next delivery
      </StyledText>
      <Box display="flex" justifyContent="center" marginTop="28px">
        <HandsSvg />
      </Box>
      <StyledButton
        autoFocus
        variant="contained"
        color="primary"
        disableElevation
        $marginTop="56px"
        type="submit"
      >
        <StyledButtonText>Main Page</StyledButtonText>
      </StyledButton>
    </StyledLoginContainer>
  ) : (
    <StyledLoginContainerMobile onSubmit={onSubmit}>
      {!isWebView && <SignupStepsProgressMobile stage={stage} steps={step} />}
      <Box display="flex" flexDirection="column" maxWidth="375px" mx={"auto"}>
        <Box display="flex" justifyContent="center">
          <StyledCardHeader>Account succesfully created</StyledCardHeader>
        </Box>
        <StyledText>
          Go to main page and start searching for your next delivery
        </StyledText>
        <Box display="flex" justifyContent="center" marginTop="28px">
          <HandsSvg />
        </Box>
        <StyledButton
          autoFocus
          variant="contained"
          color="primary"
          disableElevation
          $marginTop="56px"
          type="submit"
        >
          <StyledButtonText>Main Page</StyledButtonText>
        </StyledButton>
      </Box>
    </StyledLoginContainerMobile>
  )
}

export default FinishPage
