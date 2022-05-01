import React, { useState } from "react"
import { Box, useMediaQuery } from "@mui/material"
import { rem } from "polished"
import {
  StyledTitle,
  StyledTitleMobile,
} from "@/components/commons/commonComponents"
import RegistrationSection from "@/components/RegistrationSection"
import AccountInfoSection from "@/components/AccountInfoSection"
import OtpConfirmationSection from "@/components/OtpConfirmationSection"
import SignupStepsProgress from "@/components/SignupStepsProgress"
import { devices } from "@/constants/device"
import AmazonFlexInfo from "@/components/AmazonFlexInfo"
import FinishPage from "@/components/FinishPage"
import HoldingPage from "@/components/HoldingPage"

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
]

const SignUpPage = () => {
  const isWebView = useMediaQuery(devices.web.up)
  const [formStage, setFormStage] = useState<number>(0)
  const [showOnHold, setShowOnHold] = useState<boolean>(false)

  return (
    <React.Fragment>
      {isWebView ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <StyledTitle>Arrium</StyledTitle>
          <SignupStepsProgress stage={formStage} steps={steps} />
        </Box>
      ) : (
        <Box height={rem("64px")} display="flex" alignItems="center">
          <StyledTitleMobile>Arrium</StyledTitleMobile>
        </Box>
      )}
      <Box display="flex" alignItems="center" flexDirection="column">
        {formStage === 0 && (
          <RegistrationSection
            setFormStage={setFormStage}
            stage={formStage}
            step="Registration"
          />
        )}
        {formStage === 1 && (
          <AccountInfoSection
            setFormStage={setFormStage}
            stage={formStage}
            step="Account Info"
          />
        )}
        {formStage === 2 && (
          <OtpConfirmationSection
            setFormStage={setFormStage}
            stage={formStage}
            step="OTP Confirmation"
          />
        )}
        {formStage === 3 && (
          <AmazonFlexInfo
            setFormStage={setFormStage}
            stage={formStage}
            step="Amazon Flex Info"
          />
        )}
        {formStage === 4 &&
          (!showOnHold ? (
            <FinishPage
              stage={formStage}
              step="Finish"
              setShowOnHold={setShowOnHold}
            />
          ) : (
            <HoldingPage
              setFormStage={setFormStage}
              stage={formStage}
              step="Finish"
            />
          ))}
      </Box>
    </React.Fragment>
  )
}

export default SignUpPage
