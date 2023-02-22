import React, { useCallback } from "react"
import { useLocation } from "@reach/router"
import { useMutation } from "react-query"
import { Box, useMediaQuery } from "@mui/material"
import queryString from "query-string"

import { devices } from "@/constants/device"
import routes from "@/constants/routes"
import useNavigate from "@/hooks/useNavigate"
import { PageProps } from "@/lib/interfaces/common"
import brandLogo from "@/assets/icons/arrium_logo.png"
import { VerifyEmailResult, VerifyEmailVariables } from "@/lib/interfaces/user"
import { verifyEmail } from "@/agent/user"
import SignUpEmailVerifyLoading from "@/containers/SignUpEmailVerify/SignUpEmailVerifyLoading"
import SignUpEmailVerifySuccess from "@/containers/SignUpEmailVerify/SignUpEmailVerifySuccess"
import SignUpEmailVerifyFailed from "@/containers/SignUpEmailVerify/SignUpEmailVerifyFailed"

interface SignUpEmailVerifyProps extends PageProps {}

const SignUpEmailVerify: React.FC<SignUpEmailVerifyProps> = ({
  country_code,
}) => {
  const { navigate } = useNavigate({ country_code })
  const isWebView = useMediaQuery(devices.web.up)
  const location = useLocation()
  const { mutate } = useMutation<
    VerifyEmailResult,
    Error,
    VerifyEmailVariables
  >(verifyEmail)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [isFailed, setIsFailed] = React.useState(false)

  const handleNavigateToHome = () => {
    navigate(routes.home)
  }

  const verifyEmailMutation = useCallback(async (token: string) => {
    await mutate(
      { verficationToken: token },
      {
        onSuccess({ success }) {
          if (!success) {
            setIsFailed(true)
            return
          }
          setIsSuccess(true)
        },
      }
    )
  }, [])

  React.useEffect(() => {
    if (!location.search) return
    const parsedQuery = queryString.parse(location.search)
    const token = parsedQuery?.token as string | null
    if (!token) return
    verifyEmailMutation(token)
  }, [location, verifyEmailMutation])

  const isLoading = !isFailed && !isSuccess

  return (
    <React.Fragment>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        mt="84px"
        mb="77px"
      >
        {isWebView ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            mt="84px"
            mb="40px"
          >
            <img
              onClick={handleNavigateToHome}
              src={brandLogo}
              style={{ cursor: "pointer", marginBottom: "15px" }}
              height="69px"
              width="238px"
            />
          </Box>
        ) : (
          <Box height="64px" pl="20px" display="flex" alignItems="center">
            <img
              onClick={handleNavigateToHome}
              src={brandLogo}
              style={{ cursor: "pointer" }}
              height="36px"
              width="126px"
            />
          </Box>
        )}
      </Box>
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        minHeight="458px"
      >
        {isLoading && <SignUpEmailVerifyLoading />}
        {isSuccess && <SignUpEmailVerifySuccess country_code={country_code} />}
        {isFailed && <SignUpEmailVerifyFailed country_code={country_code} />}
      </Box>
    </React.Fragment>
  )
}

export default SignUpEmailVerify
