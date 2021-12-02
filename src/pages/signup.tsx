import React from "react"
import { Box, useMediaQuery } from "@mui/material"
import { rem } from "polished"
import { StyledTitle, StyledTitleMobile } from "../components/commomComponents"
import Seo from "../components/seo"
import TopLayout from "../components/topLayout"
import SignupSection from "../components/SignupSection"

const signup = () => {
  const isWebView = useMediaQuery("(min-width:768px)")

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
        <SignupSection />
      </Box>
    </TopLayout>
  )
}

export default signup
