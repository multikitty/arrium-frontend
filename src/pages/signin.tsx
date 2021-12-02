import { Box } from "@mui/system"
import React from "react"
import Seo from "../components/seo"
import TopLayout from "../components/topLayout"
import { rem } from "polished"
import { StyledTitle, StyledTitleMobile } from "../components/commomComponents"
import { useMediaQuery } from "@mui/material"
import SigninSection from "../components/SigninSection"

const signin = () => {
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
        <SigninSection />
      </Box>
    </TopLayout>
  )
}

export default signin
