import React from "react"
import { Box, useMediaQuery } from "@mui/material"

import { StyledText } from "@/components/RegistrationSection/RegistrationSection.styled"
import {
  StyledCardHeader,
  StyledLoginContainer,
  StyledLoginContainerMobile,
} from "@/components/commons/uiComponents"
import { devices } from "@/constants/device"
import VerificationFailedIcon from "@/assets/icons/verification-failed.inline.svg"
import { PageProps } from "@/lib/interfaces/common"
import useNavigate from "@/hooks/useNavigate"
import routes from "@/constants/routes"
import { useStore } from "@/store"
import { ContainedButton } from "@/components/commons/Button"

interface SignUpEmailVerifyFailedProps extends PageProps {}

const SignUpEmailVerifyFailed: React.FC<SignUpEmailVerifyFailedProps> = ({
  country_code,
}) => {
  const { navigateToDefault, navigate } = useNavigate({ country_code })
  const isWebView = useMediaQuery(devices.web.up)
  const {
    userStore: { currentUser, isAuthenticated },
  } = useStore()

  const handleNavigate = () => {
    if (isAuthenticated) {
      navigateToDefault(currentUser?.role)
      return
    }
    navigate(routes.signin)
  }

  return (
    <React.Fragment>
      {isWebView ? (
        <StyledLoginContainer>
          <Box display="flex" justifyContent="center" mt="28px" mb="24px">
            <VerificationFailedIcon />
          </Box>
          <StyledCardHeader>Failed</StyledCardHeader>
          <StyledText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. At sit at
            lobortis mattis massa enim pellentesque tellus vel.
          </StyledText>
          <ContainedButton sx={{ mt: "40px" }} onClick={handleNavigate}>
            Ok
          </ContainedButton>
        </StyledLoginContainer>
      ) : (
        <StyledLoginContainerMobile>
          <Box display="flex" flexDirection="column" maxWidth="375px" mx="auto">
            <Box display="flex" justifyContent="center">
              <Box display="flex" justifyContent="center" mt="28px" mb="24px">
                <VerificationFailedIcon />
              </Box>
            </Box>
            <StyledCardHeader>Failed</StyledCardHeader>
            <StyledText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. At sit at
              lobortis mattis massa enim pellentesque tellus vel.
            </StyledText>
            <ContainedButton sx={{ mt: "40px" }} onClick={handleNavigate}>
              Ok
            </ContainedButton>
          </Box>
        </StyledLoginContainerMobile>
      )}
    </React.Fragment>
  )
}

export default SignUpEmailVerifyFailed
