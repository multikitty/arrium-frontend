import React from "react"
import { Box, useMediaQuery } from "@mui/material"

import SigninSection from "@/components/SigninSection"
import { devices } from "@/constants/device"
import routes from "@/constants/routes"
import useNavigate from "@/hooks/useNavigate"
import { PageProps } from "@/lib/interfaces/common"
import brandLogo from "@/assets/icons/arrium_logo.png"

interface SignInPageProps extends PageProps {}

const SignInPage: React.FC<SignInPageProps> = ({ country_code }) => {
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
          my="80px"
        >
          <img
            src={brandLogo}
            style={{ cursor: "pointer" }}
            height="69px"
            width="238px"
          />
        </Box>
      ) : (
        <Box
          height="64px"
          pl="20px"
          display="flex"
          alignItems="center"
          onClick={handleNavigateToHome}
        >
          <img
            src={brandLogo}
            style={{ cursor: "pointer" }}
            height="36px"
            width="126px"
          />
        </Box>
      )}
      <Box display="flex" alignItems="center" flexDirection="column">
        <SigninSection country_code={country_code} />
      </Box>
    </React.Fragment>
  )
}

export default SignInPage
