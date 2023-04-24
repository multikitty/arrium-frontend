import React, { useCallback, useState } from "react"
import { useLocation } from "@reach/router"
import { Box, useMediaQuery } from "@mui/material"
import queryString from "query-string"

import RegistrationSection from "@/components/RegistrationSection"
import AccountInfoSection from "@/components/AccountInfoSection"
import OtpConfirmationSection from "@/components/OtpConfirmationSection"
import SignupStepsProgress from "@/components/SignupStepsProgress"
import { devices } from "@/constants/device"
import AmazonFlexInfo from "@/components/AmazonFlexInfo"
import FinishPage from "@/components/FinishPage"
import HoldingPage from "@/components/HoldingPage"
import routes from "@/constants/routes"
import useNavigate from "@/hooks/useNavigate"
import { PageProps } from "@/lib/interfaces/common"
import LoadingScreen from "@/components/LoadingScreen"
import { localStorageUtils } from "@/utils"
import { TOKEN } from "@/constants/localStorage"
import { REGISTRATION_STEP_MAP } from "@/constants/common"
import { fetchCurrentUserData } from "@/agent/user"
import brandLogo from "@/assets/icons/arrium_logo.png"
import { ZendeskAPI } from "react-zendesk"

export interface FormProps {
  setFormStage: React.Dispatch<React.SetStateAction<number>>
  stage: number
  step: string
}

const steps = [
  "Registration",
  "Account Info",
  "OTP Confirmation",
  "Amazon Flex Info",
  "Finish",
] as const

export type AccountInfoData = {
  firstname: string
  lastname: string
  tzName: string
  countryCode: string
  phoneNumber: string
  dialCode: string
}

interface SignUpPageProps extends PageProps { }

const SignUpPage: React.FC<SignUpPageProps> = ({ country_code }) => {
  const {
    navigate,
    navigateWithQuery: { navigateToSignup },
  } = useNavigate({ country_code })
  const location = useLocation()
  const isWebView = useMediaQuery(devices.web.up)
  const [formStage, setFormStage] = useState(0)
  const [showOnHold] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [accountInfoData, setAccountInfoData] =
    useState<null | AccountInfoData>(null)

  const handleNavigateToHome = () => {
    ZendeskAPI("webWidget", "hide")
    navigate(routes.home)
  }

  const handleNavigateToCurrentStep = useCallback(async (step: string) => {
    const { data } = await fetchCurrentUserData()
    if (!data || step === REGISTRATION_STEP_MAP[data.currentSteps].toString()) {
      setFormStage(+step)
      setIsLoading(false)
      return
    }
    if (step === REGISTRATION_STEP_MAP["account_info"].toString()) {
      setFormStage(+step)
      setIsLoading(false)
      setAccountInfoData({
        firstname: data.firstname,
        lastname: data.lastname,
        tzName: data.tzName,
        countryCode: data.country,
        phoneNumber: data.phoneNumber,
        dialCode: data.dialCode,
      })
      return
    }
    const currentStep = REGISTRATION_STEP_MAP[data.currentSteps]
    navigateToSignup(currentStep)
    setFormStage(currentStep)
    setIsLoading(false)
  }, [])

  React.useEffect(() => {
    setAccountInfoData(null)
    const { step } = queryString.parse(location.search)
    if (!step || Array.isArray(step) || Number.isNaN(parseInt(step, 10))) {
      setFormStage(0)
      setIsLoading(false)
      return
    }
    if (!localStorageUtils.get(TOKEN)) {
      setFormStage(+step)
      setIsLoading(false)
      return
    }
    handleNavigateToCurrentStep(step)
  }, [location])

  if (isLoading) return <LoadingScreen />
  console.log("formStage", formStage)
  return (
    <React.Fragment>
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
            style={{
              cursor: "pointer",
              marginBottom: "15px",
            }}
            height="69px"
            width="238px"
          />
          <SignupStepsProgress stage={formStage} steps={steps} />
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
      <Box display="flex" alignItems="center" flexDirection="column">
        {formStage === 0 && (
          <RegistrationSection
            setFormStage={setFormStage}
            stage={formStage}
            step="Registration"
            country_code={country_code}
          />
        )}
        {formStage === 1 && (
          <AccountInfoSection
            setFormStage={setFormStage}
            stage={formStage}
            step="Account Info"
            country_code={country_code}
            data={accountInfoData}
          />
        )}
        {formStage === 2 && (
          <OtpConfirmationSection
            setFormStage={setFormStage}
            stage={formStage}
            step="OTP Confirmation"
            country_code={country_code}
          />
        )}
        {formStage === 3 && (
          <AmazonFlexInfo
            setFormStage={setFormStage}
            stage={formStage}
            step="Amazon Flex Info"
            country_code={country_code}
          />
        )}
        {formStage === 4 &&
          (showOnHold ? (
            <HoldingPage
              stage={formStage}
              step="Finish"
              country_code={country_code}
            />
          ) : (
            <FinishPage
              stage={formStage}
              step="Finish"
              country_code={country_code}
            />
          ))}
      </Box>
    </React.Fragment>
  )
}

export default SignUpPage
