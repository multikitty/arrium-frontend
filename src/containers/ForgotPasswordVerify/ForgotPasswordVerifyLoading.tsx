import React from "react"
import { Box, useMediaQuery } from "@mui/material"

import { StyledText } from "@/components/RegistrationSection/RegistrationSection.styled"
import {
  StyledLoginContainer,
  StyledLoginContainerMobile,
} from "@/components/commons/uiComponents"
import Spinner from "@/components/lottie/Spinner/Spinner"
import { devices } from "@/constants/device"

const SignUpEmailVerifyLoading = () => {
  const isWebView = useMediaQuery(devices.web.up)

  return (
    <React.Fragment>
      {isWebView ? (
        <StyledLoginContainer>
          <Box display="flex" justifyContent="center" marginTop="28px">
            <Spinner />
          </Box>
          <StyledText>Verifying...</StyledText>
        </StyledLoginContainer>
      ) : (
        <StyledLoginContainerMobile>
          <Box display="flex" flexDirection="column" maxWidth="375px" mx="auto">
            <Box display="flex" justifyContent="center">
              <Box display="flex" justifyContent="center" marginTop="28px">
                <Spinner />
              </Box>
            </Box>
            <StyledText>Verifying...</StyledText>
          </Box>
        </StyledLoginContainerMobile>
      )}
    </React.Fragment>
  )
}

export default SignUpEmailVerifyLoading
