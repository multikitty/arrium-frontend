import React, { useCallback } from "react"
import { useLocation } from "@reach/router"
import queryString from "query-string"
import { useMutation } from "react-query"
import { Box, useMediaQuery } from "@mui/material"

import { devices } from "@/constants/device"
import routes from "@/constants/routes"
import useNavigate from "@/hooks/useNavigate"
import { PageProps } from "@/lib/interfaces/common"
import brandLogo from "@/assets/icons/arrium_logo.png"

import ForgotPasswordVerifyLoading from "@/containers/ForgotPasswordVerify/ForgotPasswordVerifyLoading"
import ForgotPasswordVerifySuccess from "@/containers/ForgotPasswordVerify/ForgotPasswordVerifySuccess"
import ForgotPasswordVerifyFailed from "@/containers/ForgotPasswordVerify/ForgotPasswordVerifyFailed"
import {
  ForgotPasswordVerifyTokenResult,
  ForgotPasswordVerifyTokenVariables,
} from "@/lib/interfaces/forgotPassword"
import { forgotPasswordVerifyToken } from "@/agent/forgotPassword"

interface ForgotPasswordVerifyProps extends PageProps {}

const ForgotPasswordVerify: React.FC<ForgotPasswordVerifyProps> = ({
  country_code,
}) => {
  const { navigate } = useNavigate({ country_code })
  const isWebView = useMediaQuery(devices.web.up)
  const location = useLocation()
  const { mutate } = useMutation<
    ForgotPasswordVerifyTokenResult,
    Error,
    ForgotPasswordVerifyTokenVariables
  >(forgotPasswordVerifyToken)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [isFailed, setIsFailed] = React.useState(false)
  const [token, setToken] = React.useState("")

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
    setToken(token)
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
        {isLoading && <ForgotPasswordVerifyLoading />}
        {isSuccess && (
          <ForgotPasswordVerifySuccess
            country_code={country_code}
            token={token}
          />
        )}
        {isFailed && <ForgotPasswordVerifyFailed country_code={country_code} />}
      </Box>
    </React.Fragment>
  )
}

export default ForgotPasswordVerify
