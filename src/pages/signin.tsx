import { Box } from "@mui/system"
import React from "react"
import Seo from "../components/Seo"
import TopLayout from "../components/TopLayout"
import { rem } from "polished"
import {
  StyledTitle,
  StyledTitleMobile,
} from "../components/commons/commonComponents"
import { useMediaQuery } from "@mui/material"
import SigninSection from "../components/SigninSection"
import { devices } from "../constants/device"

const signin = () => {
  const isWebView = useMediaQuery(devices.web.up)

  return (
    <TopLayout>
      <Seo title="Sign In | Arrium" />
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
    </TopLayout>
  )
}

export default signin
