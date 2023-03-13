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
import { confirmOtp, resendOtp, updateAccountInfo } from "@/agent/signup"
import { useSnackbar } from "notistack"
import { timeFromNowInMs } from "@/utils"
import useCountDown from "@/hooks/useCountDown"
import { formatToMMSS } from "@/utils/formatToMMSS"
import { getRawPhoneNumber } from "@/utils/getRawPhoneNumber"

interface UpdatePhoneNumberModalProps
  extends Omit<AccountInfoVariables, "phoneNumber"> {
  open: boolean
  handleClose: () => void
  handlePhoneNumberChange: () => void
  newPhoneNumber: string
  refetchCurrentUser: () => void
}

const UpdatePhoneNumberModal = (props: UpdatePhoneNumberModalProps) => {
  const { enqueueSnackbar } = useSnackbar()
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
  >(updateAccountInfo)
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
      enqueueSnackbar(
        "Please go back to re-enter your number or provide the correct number.",
        {
          variant: "error",
        }
      )
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
            enqueueSnackbar(validationError?.otp || message, {
              variant: "error",
            })
            setCountSubmitError(newCountSubmitError)
            setOtp("")
            return
          }
          enqueueSnackbar(message, {
            variant: "success",
          })
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
      enqueueSnackbar("You have exceeded your number of maximum attempts.", {
        variant: "error",
      })
      setTimeout(() => {
        props.handleClose()
      }, 3000)
      setCountOtpResent(0)
      return
    }
    await resendOtpMutate(undefined, {
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

  const handleSendOtp = async () => {
    const phoneNumber = props.newPhoneNumber

    const variables: AccountInfoVariables = {
      country: props.country,
      phoneNumber,
      dialCode: props.dialCode.replaceAll("+", ""),
      firstname: props.firstname,
      lastname: props.lastname,
      tzName: props.tzName,
    }

    updateAccountInfoMutate(variables, {
      onSuccess({ success, message, validationError }) {
        if (!success) {
          enqueueSnackbar(
            validationError?.country ||
            validationError?.phoneNumber ||
            validationError?.dialCode ||
            validationError?.firstname ||
            validationError?.lastname ||
            validationError?.tzName ||
            message,
            { variant: "error" }
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
    <Modal open={props.open} onClose={props.handleClose}>
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
            <LinkButton
              sx={{ marginBottom: rem("44px") }}
              variant="text"
              onClick={handleResendOtp}
            >
              Resend Code{" "}
              {seconds > 0 ? `(${formatToMMSS(seconds.toString())})` : ""}
            </LinkButton>
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
    </Modal>
  )
}

export default UpdatePhoneNumberModal
