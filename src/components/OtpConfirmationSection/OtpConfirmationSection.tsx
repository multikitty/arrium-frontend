import React, { useState } from "react"
import { Box, useMediaQuery } from "@mui/material"
import { rem } from "polished"
import { useMutation } from "react-query"
import { useSnackbar } from "notistack"

import { devices } from "@/constants/device"
import {
  StyledButton,
  StyledButtonText,
  StyledLoginContainer,
  StyledLoginContainerMobile,
  StyledLoginText,
  StyledSignUpButton,
  StyledSignUpText,
} from "../commons/uiComponents"
import { SignupStepsProgressMobile } from "../SignupStepsProgress/SignupStepsProgress"
import { StyledText } from "../RegistrationSection/RegistrationSection.styled"
import { StyledOtpInput } from "./OtpConfirmationSection.styled"
import { LinkButton } from "../commons/Button"
import { FormProps } from "../SignUpPage/SignUpPage"
import routes from "@/constants/routes"
import useCountDown from "@/hooks/useCountDown"
import { timeFromNowInMs } from "@/utils"
import {
  IOtpConfirmationResult,
  IOtpConfirmationVariables,
} from "@/lib/interfaces/signup"
import { confirmOtp } from "@/agent/signup"
import useNavigate from "@/hooks/useNavigate"
import { IPageProps } from "@/lib/interfaces/common"
import { REGISTRATION_STEP_MAP } from "@/constants/common"

const THIRTY_SECONDS_FROM_NOW = timeFromNowInMs(30 * 1000)

interface IOtpConfirmationSectionProps extends FormProps, IPageProps {}

const OtpConfirmationSection: React.FC<IOtpConfirmationSectionProps> = ({
  setFormStage,
  stage,
  step,
  country_code,
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const {
    navigate,
    navigateWithQuery: { navigateToSignup },
  } = useNavigate({ country_code })
  const isWebView = useMediaQuery(devices.web.up)
  const [otp, setOtp] = useState("")
  const [thirdSecondsFromNow, setThirdSecondsFromNow] = useState(
    THIRTY_SECONDS_FROM_NOW
  )
  const { minutes, seconds } = useCountDown(thirdSecondsFromNow)
  const { mutate } = useMutation<
    IOtpConfirmationResult,
    Error,
    IOtpConfirmationVariables
  >(confirmOtp)

  const handleNavigateToSignIn = () => {
    navigate(routes.signin)
  }

  const handlePhoneNumberChange = () => {
    setFormStage(prev => prev - 1)
    navigateToSignup(REGISTRATION_STEP_MAP["account_info"])
  }

  const handleSubmit = (e: React.FormEvent<HTMLDivElement | null>) => {
    e.preventDefault()

    mutate(
      { otp },
      {
        onSuccess({ success, message, validationError }) {
          if (!success) {
            enqueueSnackbar(validationError?.otp || message, {
              variant: "error",
            })
            return
          }
          setFormStage(prev => prev + 1)
          navigateToSignup(stage + 1)
        },
      }
    )
  }

  const handleResendOtp = () => {
    setThirdSecondsFromNow(THIRTY_SECONDS_FROM_NOW)
  }

  return (
    <React.Fragment>
      {isWebView ? (
        <StyledLoginContainer component="form" onSubmit={handleSubmit}>
          <Box display="flex" justifyContent="center">
            <StyledLoginText>Sign up</StyledLoginText>
          </Box>
          <StyledText>
            Enter a 4-digit code that we&apos;ve sent you in SMS
          </StyledText>
          <Box display="flex" justifyContent="center" marginTop={rem("16px")}>
            <StyledOtpInput
              value={otp}
              onChange={(e: string) => setOtp(e)}
              numInputs={4}
              isInputNum
              shouldAutoFocus
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            marginTop={rem("32px")}
          >
            <LinkButton
              sx={{ marginBottom: "0.5rem" }}
              variant="text"
              onClick={handleResendOtp}
              disabled={seconds > 0}
            >
              Resend Code
            </LinkButton>
            <LinkButton variant="text" onClick={handlePhoneNumberChange}>
              Change Phone Number
            </LinkButton>
          </Box>
          <StyledButton
            variant="contained"
            color="primary"
            disableElevation
            $marginTop={rem("56px")}
            type="submit"
          >
            <StyledButtonText>Continue</StyledButtonText>
          </StyledButton>
          <Box display="flex" justifyContent="center">
            <StyledSignUpText>
              Already have an account?
              <StyledSignUpButton onClick={handleNavigateToSignIn}>
                Log In
              </StyledSignUpButton>
            </StyledSignUpText>
          </Box>
        </StyledLoginContainer>
      ) : (
        <StyledLoginContainerMobile component="form" onSubmit={handleSubmit}>
          {!isWebView && (
            <SignupStepsProgressMobile stage={stage} steps={step} />
          )}
          <Box
            display="flex"
            flexDirection="column"
            maxWidth={rem("375px")}
            mx={"auto"}
          >
            <Box display="flex" justifyContent="center">
              <StyledLoginText>Sign up</StyledLoginText>
            </Box>
            <StyledText>
              Enter a 4-digit code that we&apos;ve sent you in SMS
            </StyledText>
            <Box display="flex" justifyContent="center" marginTop={rem("16px")}>
              <StyledOtpInput
                value={otp}
                onChange={(e: string) => setOtp(e)}
                numInputs={4}
              />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              marginTop={rem("32px")}
            >
              <LinkButton
                sx={{ marginBottom: "0.5rem" }}
                variant="text"
                disabled={seconds > 0}
                onClick={handleResendOtp}
              >
                Resend Code
              </LinkButton>
              {seconds > 0 && (
                <Box component="span" ml={-0.5}>
                  in{" "}
                  {`${minutes.toString().padStart(2, "0")}: ${seconds
                    .toString()
                    .padStart(2, "0")}`}{" "}
                </Box>
              )}
              <LinkButton variant="text" onClick={handlePhoneNumberChange}>
                Change Phone Number
              </LinkButton>
            </Box>
            <StyledButton
              variant="contained"
              color="primary"
              disableElevation
              $marginTop={rem("56px")}
              type="submit"
            >
              <StyledButtonText>Continue</StyledButtonText>
            </StyledButton>
            <Box
              display="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
            >
              <StyledSignUpText>Already have an account?</StyledSignUpText>
              <StyledSignUpButton onClick={handleNavigateToSignIn}>
                Log In
              </StyledSignUpButton>
            </Box>
          </Box>
        </StyledLoginContainerMobile>
      )}
    </React.Fragment>
  )
}

export default OtpConfirmationSection
