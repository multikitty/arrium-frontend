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
  StyledCardHeader,
  StyledSignUpButton,
  StyledSignUpText,
} from "@/components/commons/uiComponents"
import { SignupStepsProgressMobile } from "@/components/SignupStepsProgress/SignupStepsProgress"
import { StyledText } from "@/components/RegistrationSection/RegistrationSection.styled"
import { StyledOtpInput } from "@/components/OtpConfirmationSection/OtpConfirmationSection.styled"
import { LinkButton } from "@/components/commons/Button"
import { FormProps } from "@/components/SignUpPage/SignUpPage"
import routes from "@/constants/routes"
import useCountDown from "@/hooks/useCountDown"
import { timeFromNowInMs } from "@/utils"
import {
  OtpConfirmationResult,
  OtpConfirmationVariables,
  ResendOtpResult,
} from "@/lib/interfaces/signup"
import { confirmOtp, resendOtp } from "@/agent/signup"
import useNavigate from "@/hooks/useNavigate"
import { PageProps } from "@/lib/interfaces/common"
import { REGISTRATION_STEP_MAP } from "@/constants/common"
import { formatToMMSS } from "@/utils/formatToMMSS"
import LinkButtonResendCode from "../commons/Button/LinkButtonResendCode"

interface OtpConfirmationSectionProps extends FormProps, PageProps { }

const OtpConfirmationSection: React.FC<OtpConfirmationSectionProps> = ({
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
  const [countOtpResent, setCountOtpResent] = useState(0)
  const [countSubmitError, setCountSubmitError] = useState(0)
  const [thirdSecondsFromNow, setThirdSecondsFromNow] = useState(
    timeFromNowInMs(30 * 1000)
  )
  const { seconds } = useCountDown(thirdSecondsFromNow)
  const { mutate } = useMutation<
    OtpConfirmationResult,
    Error,
    OtpConfirmationVariables
  >(confirmOtp)
  const { mutate: resendOtpMutate } = useMutation<ResendOtpResult, Error>(
    resendOtp
  )

  const handleNavigateToSignIn = () => {
    navigate(routes.signin)
  }

  const handlePhoneNumberChange = () => {
    setFormStage(prev => prev - 1)
    navigateToSignup(REGISTRATION_STEP_MAP["account_info"])
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement | null>) => {
    e.preventDefault()
    const newCountSubmitError = countSubmitError + 1
    if (newCountSubmitError === 3) {
      enqueueSnackbar(
        "Please go back to re-enter your number or provide the correct number.",
        {
          variant: "error",
        }
      )
      setTimeout(() => {
        navigateToSignup(REGISTRATION_STEP_MAP["account_info"])
      }, 3000)
      setCountSubmitError(0)
      return
    }

    mutate(
      { otp },
      {
        onSuccess({ success, message, validationError }) {
          if (!success) {
            setOtp("")
            enqueueSnackbar(validationError?.otp || message, {
              variant: "error",
            })
            setCountSubmitError(newCountSubmitError)
            setOtp("")
            return
          }
          setFormStage(prev => prev + 1)
          setOtp("")
          navigateToSignup(stage + 1)
        },
      }
    )
  }

  const handleResendOtp = () => {
    const newCount = countOtpResent + 1
    if (newCount > 3) {
      enqueueSnackbar("You have exceeded your number of maximum attempts.", {
        variant: "error",
      })
      setTimeout(() => {
        navigateToSignup(REGISTRATION_STEP_MAP["account_info"])
      }, 3000)
      setCountOtpResent(0)
      return
    }
    resendOtpMutate(undefined, {
      onSuccess({ success, message }) {
        if (!success) {
          enqueueSnackbar(message, {
            variant: "error",
          })
          return
        }
        setCountOtpResent(newCount)
        setThirdSecondsFromNow(timeFromNowInMs(30 * 1000))
      },
    })
  }

  const isContinueDisabled = otp.length !== 4

  return (
    <React.Fragment>
      {isWebView ? (
        <StyledLoginContainer onSubmit={onSubmit} noValidate>
          <Box display="flex" justifyContent="center">
            <StyledCardHeader>Sign up</StyledCardHeader>
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
            <LinkButtonResendCode
              sx={{
                marginBottom: "0.5rem",
                color: seconds < 0 ? "#3071F2" : "inherit"
              }}
              variant="text"
              onClick={handleResendOtp}
              disabled={seconds > 0}
            >
              Resend Code{" "}
              {seconds > 0 ? `(${formatToMMSS(seconds.toString())})` : ""}
            </LinkButtonResendCode>
            <LinkButton variant="text" onClick={handlePhoneNumberChange} style={{ color: "#3071F2" }}>
              Change Phone Number
            </LinkButton>
          </Box>
          <StyledButton
            disabled={isContinueDisabled}
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
        <StyledLoginContainerMobile onSubmit={onSubmit} noValidate>
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
              <StyledCardHeader>Sign up</StyledCardHeader>
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
                Resend Code {seconds > 0 ? `(${seconds})` : ""}
              </LinkButton>
              <LinkButton variant="text" onClick={handlePhoneNumberChange} style={{ color: "#3071F2" }}>
                Change Phone Number
              </LinkButton>
            </Box>
            <StyledButton
              disabled={isContinueDisabled}
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
