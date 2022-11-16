import React from "react"
import { Box, useMediaQuery } from "@mui/material"
import { rem } from "polished"

import {
  StyledTitle,
  StyledTitleMobile,
} from "@/components/commons/uiComponents"
import SigninSection from "@/components/SigninSection"
import { devices } from "@/constants/device"
import routes from "@/constants/routes"
import useNavigate from "@/hooks/useNavigate"
import { IPageProps } from "@/lib/interfaces/common"

interface ISignInPageProps extends IPageProps {}

const SignInPage: React.FC<ISignInPageProps> = ({ country_code }) => {
  const { navigate } = useNavigate({ country_code })
  const isWebView = useMediaQuery(devices.web.up)

  const handleNavigateToHome = () => {
    navigate(routes.home)
  }

  return (
    <React.Fragment>
      {isWebView ? (
        <Box
          display="flex"
          justifyContent="center"
          onClick={handleNavigateToHome}
        >
          <StyledTitle>Arrium</StyledTitle>
        </Box>
      ) : (
        <Box
          height={rem("64px")}
          display="flex"
          alignItems="center"
          onClick={handleNavigateToHome}
        >
          <StyledTitleMobile>Arrium</StyledTitleMobile>
        </Box>
      )}
      <Box display="flex" alignItems="center" flexDirection="column">
        <SigninSection country_code={country_code} />
      </Box>
    </React.Fragment>
  )
}

export default SignInPage
