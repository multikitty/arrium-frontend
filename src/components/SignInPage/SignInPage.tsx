import React from "react"
import { Box, useMediaQuery } from "@mui/material"
import { rem } from "polished"

import {
  StyledTitle,
  StyledTitleMobile,
} from "@/components/commons/commonComponents"
import SigninSection from "@/components/SigninSection"
import { devices } from "@/constants/device"

const SignInPage = () => {
  const isWebView = useMediaQuery(devices.web.up)

  return (
    <React.Fragment>
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
        <SigninSection />
      </Box>
    </React.Fragment>
  )
}

export default SignInPage
