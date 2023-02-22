import React from "react"
import { Box, useMediaQuery } from "@mui/material"

import { StyledText } from "@/components/RegistrationSection/RegistrationSection.styled"
import {
  StyledCardHeader,
  StyledLoginContainer,
  StyledLoginContainerMobile,
} from "@/components/commons/uiComponents"
import { devices } from "@/constants/device"
import VerificationSuccessIcon from "@/assets/icons/verification-success.inline.svg"
import { ContainedButton } from "@/components/commons/Button"
import useNavigate from "@/hooks/useNavigate"
import { PageProps } from "@/lib/interfaces/common"
import routes from "@/constants/routes"

interface SignUpEmailVerifySuccessProps extends PageProps {
  token: string
}

const SignUpEmailVerifySuccess: React.FC<SignUpEmailVerifySuccessProps> = ({
  country_code,
  token,
}) => {
  const { navigate } = useNavigate({ country_code })
  const isWebView = useMediaQuery(devices.web.up)

  const handleResetPassword = () => {
    navigate(routes.resetPassword(token))
  }

  return (
    <React.Fragment>
      {isWebView ? (
        <StyledLoginContainer>
          <Box display="flex" justifyContent="center" mt="28px" mb="24px">
            <VerificationSuccessIcon />
          </Box>
          <StyledCardHeader>Account Verified</StyledCardHeader>
          <StyledText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. At sit at
            lobortis mattis massa enim pellentesque tellus vel.
          </StyledText>
          <ContainedButton sx={{ mt: "40px" }} onClick={handleResetPassword}>
            Reset Password
          </ContainedButton>
        </StyledLoginContainer>
      ) : (
        <StyledLoginContainerMobile>
          <Box display="flex" flexDirection="column" maxWidth="375px" mx="auto">
            <Box display="flex" justifyContent="center">
              <Box display="flex" justifyContent="center" mt="28px" mb="24px">
                <VerificationSuccessIcon />
              </Box>
            </Box>
            <StyledCardHeader>Account Verified</StyledCardHeader>
            <StyledText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. At sit at
              lobortis mattis massa enim pellentesque tellus vel.
            </StyledText>
            <ContainedButton sx={{ mt: "40px" }} onClick={handleResetPassword}>
              Reset Password
            </ContainedButton>
          </Box>
        </StyledLoginContainerMobile>
      )}
    </React.Fragment>
  )
}

export default SignUpEmailVerifySuccess
