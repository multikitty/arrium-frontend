import React, { useEffect, useState } from "react"
import { Box, IconButton, Modal } from "@mui/material"
import { rem } from "polished"
import {
  StyledAddCountryModal as StyledUpdatePhoneNumberModal,
  StyledAddCountryModalCloseIconContainer as StyledUpdatePhoneNumberModalCloseIconContainer,
  StyledAddCountryModalForm as StyledUpdatePhoneNumberModalForm,
  StyledAddCountryModalTitle as StyledUpdatePhoneNumberModalTitle,
  StyledDeleteConfirmationModalSubTitle as StyledUpdatePhoneNumberModalSubTitle,
} from "../SettingsPage/SettingsPage.styled"
import CloseIcon from "@mui/icons-material/Close"
import { ContainedButton, LinkButton } from "../commons/Button"
import { StyledOtpInput } from "../OtpConfirmationSection/OtpConfirmationSection.styled"
import maskPhoneNumber from "@/utils/maskPhoneNumber"
import { useMutation } from "react-query"
import {
  AccountInfoResult,
  AccountInfoVariables,
  OtpConfirmationResult,
  OtpConfirmationVariables,
  ResendOtpResult,
} from "@/lib/interfaces/signup"
import { confirmOtp, resendOtp, updatePhoneNumber } from "@/agent/signup"
// import { useSnackbar } from "notistack"
import { removeAllWhiteSpaces, timeFromNowInMs } from "@/utils"
import useCountDown from "@/hooks/useCountDown"
import { formatToMMSS } from "@/utils/formatToMMSS"
import LinkButtonResendCode from "../commons/Button/LinkButtonResendCode"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastNotification} from '@/components/ToastNotification/ToastNotification';


interface UpdatePhoneNumberModalProps
  extends Omit<AccountInfoVariables, "phoneNumber"> {
  open: boolean
  handleClose: () => void
  handlePhoneNumberChange: () => void
  newPhoneNumber: string
  refetchCurrentUser: () => void
}

const UpdatePhoneNumberModal = (props: UpdatePhoneNumberModalProps) => {
  // const { enqueueSnackbar } = useSnackbar()
  const [otp, setOtp] = useState("")
  const [countOtpResent, setCountOtpResent] = useState(0)
  const [countSubmitError, setCountSubmitError] = useState(0)
  const [thirdSecondsFromNow, setThirdSecondsFromNow] = useState(
    timeFromNowInMs(30 * 1000)
  )
  const { seconds } = useCountDown(thirdSecondsFromNow)
  const { mutate: updateAccountInfoMutate } = useMutation<
    AccountInfoResult,
    Error,
    AccountInfoVariables
  >(updatePhoneNumber)
  const { mutate } = useMutation<
    OtpConfirmationResult,
    Error,
    OtpConfirmationVariables
  >(confirmOtp)
  const { mutate: resendOtpMutate } = useMutation<ResendOtpResult, Error>(
    resendOtp
  )

  const handleOtpFieldChange = (otpValue: string) => {
    setOtp(otpValue)
  }

  const handleConfirm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newCountSubmitError = countSubmitError + 1
    if (newCountSubmitError === 3) {
      toast.error("Incorrect passcode for a 3rd time! Press 'resend code' to get a new passcode")
      setTimeout(() => {
        props.handleClose()
      }, 3000)
      setCountSubmitError(0)
      return
    }
    await mutate(
      { otp },
      {
        onSuccess({ success, message, validationError }) {
          if (!success) {
            toast.error(validationError?.otp || message)
            setCountSubmitError(newCountSubmitError)
            setOtp("")
            return
          }
          toast.success(message)
          props.refetchCurrentUser()
          props.handlePhoneNumberChange()
          props.handleClose()
        },
      }
    )
  }

  const handleResendOtp = async () => {
    const newCount = countOtpResent + 1
    if (newCount > 3) {
      toast.error("You have exceeded the number of attempts to resend a code. Try again in a short while.")
      setTimeout(() => {
        props.handleClose()
      }, 3000)
      setCountOtpResent(0)
      return
    }
    await resendOtpMutate(undefined, {
      onSuccess({ success, message }) {
        if (!success) {
          toast.error(message)
          return
        }
        setCountOtpResent(newCount)
        setThirdSecondsFromNow(timeFromNowInMs(30 * 1000))
      },
    })
  }
  const handleSendOtp = async () => {
    const variables: AccountInfoVariables = {
      country: props.country,
      phoneNumber: removeAllWhiteSpaces(props.newPhoneNumber.replaceAll("-", "")).replaceAll("+", "").slice(props.dialCode.length).replace(' ', ""),
      dialCode: props.dialCode.replaceAll("+", ""),
      firstname: props.firstname,
      lastname: props.lastname,
      tzName: props.tzName,
    }

    updateAccountInfoMutate(variables, {
      onSuccess({ success, message, validationError }) {
        if (!success) {
          toast.error(
            validationError?.country ||
            validationError?.phoneNumber ||
            validationError?.dialCode ||
            validationError?.firstname ||
            validationError?.lastname ||
            validationError?.tzName ||
            message
          )
          return
        }
      },
    })
  }

  useEffect(() => {
    handleSendOtp()
  }, [])

  return (
    <Modal open={props.open} onClose={props.handleClose} sx={{ display: 'flex', alignItems: 'center' }}>
      <ToastNotification/>
      <StyledUpdatePhoneNumberModal>
        <StyledUpdatePhoneNumberModalCloseIconContainer>
          <IconButton size="small" onClick={props.handleClose}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </StyledUpdatePhoneNumberModalCloseIconContainer>
        <StyledUpdatePhoneNumberModalTitle>
          Phone number change confirmation
        </StyledUpdatePhoneNumberModalTitle>
        <StyledUpdatePhoneNumberModalSubTitle updatePhoneNumber>
          Enter a 4-digit code that we've sent you on{" "}
          {maskPhoneNumber(props.newPhoneNumber)} in SMS
        </StyledUpdatePhoneNumberModalSubTitle>
        <StyledUpdatePhoneNumberModalForm onSubmit={handleConfirm}>
          <Box display="flex" justifyContent="center" marginTop={rem("16px")}>
            <StyledOtpInput
              isInputNum
              shouldAutoFocus
              value={otp}
              onChange={handleOtpFieldChange}
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
            <LinkButtonResendCode
              sx={{
                marginBottom: rem("44px"),
                color: seconds < 0 ? "#3071F2" : "inherit"
              }}
              variant="text"
              onClick={handleResendOtp}
              disabled={seconds > 0}
            >
              Resend Code{" "}
              {seconds > 0 ? `(${formatToMMSS(seconds.toString())})` : ""}
            </LinkButtonResendCode>
            <ContainedButton
              sx={{ width: "100%" }}
              disabled={otp.length !== 4}
              type="submit"
            >
              Confirm
            </ContainedButton>
          </Box>
        </StyledUpdatePhoneNumberModalForm>
      </StyledUpdatePhoneNumberModal>
    </Modal >
  )
}

export default UpdatePhoneNumberModal
