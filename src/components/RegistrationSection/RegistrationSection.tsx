import React, { useEffect, useState } from "react"
import { Box, IconButton, useMediaQuery } from "@mui/material"
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material"
import { rem } from "polished"

import {
  StyledButton,
  StyledButtonText,
  StyledInputField,
  StyledLoginContainer,
  StyledLoginContainerMobile,
  StyledLoginText,
  StyledSignUpButton,
  StyledSignUpText,
} from "../commons/uiComponents"
import {
  StyledPasswordValidationContainer,
  StyledTextBox,
  StyledValidationText,
  StyledValidationTextWrapper,
} from "./RegistrationSection.styled"
import RightCheckMarkIcon from "@/assets/icons/checkmark_icon.svg"
import RightCheckGreenMarkIcon from "@/assets/icons/checkmark-green_icon.svg"
import { devices } from "@/constants/device"
import { SignupStepsProgressMobile } from "../SignupStepsProgress/SignupStepsProgress"
import { IRequiredSet } from "./RegistrationSection.types"
import { FormProps } from "../SignUpPage/SignUpPage"
import routes from "@/constants/routes"
import { useMutation } from "react-query"
import { registerUser } from "@/agent/signup"
import {
  IRegistrationUserVariables,
  IRegistrationUserResult,
} from "@/lib/interfaces/signup"
import { useSnackbar } from "notistack"
import { setLocalStorage } from "@/utils/localStorage"
import useNavigate from "@/hooks/useNavigate"
import { IPageProps } from "@/lib/interfaces/common"

interface ISignupSectionProps extends FormProps, IPageProps {}

const SignupSection: React.FC<ISignupSectionProps> = ({
  setFormStage,
  stage,
  step,
  country_code,
  lang,
}) => {
  const isWebView = useMediaQuery(devices.web.up)
  const { enqueueSnackbar } = useSnackbar()
  const {
    navigate,
    navigateWithQuery: { navigateToSignup },
  } = useNavigate({ country_code, lang })

  const [email, setEmail] = useState("")
  const [isVisible, SetIsVisible] = useState(false)
  const [password, setPassword] = useState("")
  const [refCode, setRefCode] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [isRequiredSet, setIsRequiredSet] = useState<IRequiredSet>({
    digit: true,
    lowercase: true,
    minEightChar: true,
    uppercase: true,
  })
  const { mutate } = useMutation<
    IRegistrationUserResult,
    Error,
    IRegistrationUserVariables
  >(registerUser)

  const atLeastALowercase = new RegExp(/(?=.*[a-z])/)
  const atLeastAnUppercase = new RegExp(/(?=.*[A-Z])/)
  const atLeastANumber = new RegExp(/(?=.*\d)/)
  const minEightChar = new RegExp(/.{8,}/)

  useEffect(() => {
    setIsRequiredSet({
      digit: atLeastANumber.test(password),
      lowercase: atLeastALowercase.test(password),
      minEightChar: minEightChar.test(password),
      uppercase: atLeastAnUppercase.test(password),
    })
  }, [password])

  const handleInputFocus = () => {
    setIsFocused(true)
  }
  const handleInputBlur = () => {
    setIsFocused(false)
  }

  const onSubmit = (e: any) => {
    e.preventDefault()
    if (
      !(
        isRequiredSet.digit &&
        isRequiredSet.lowercase &&
        isRequiredSet.minEightChar &&
        isRequiredSet.uppercase
      )
    ) {
      handleInputFocus()
      return
    }

    const variables: IRegistrationUserVariables = {
      email,
      password,
      refCode,
      countryCode: (country_code || "UK").toUpperCase(),
    }

    mutate(variables, {
      onSuccess({ data, success, message, validationError }) {
        if (!success) {
          enqueueSnackbar(
            validationError?.email ||
              validationError?.password ||
              validationError?.refCode ||
              validationError?.countryCode ||
              message,
            { variant: "error" }
          )
          return
        }
        if (!data) return
        setLocalStorage("token", data.token)
        setFormStage(prev => prev + 1)
        navigateToSignup(stage + 1)
      },
    })
  }

  const handleNavigateToSignIn = () => {
    navigate(routes.signin)
  }

  return isWebView ? (
    <StyledLoginContainer component="form" onSubmit={onSubmit}>
      <Box display="flex" justifyContent="center">
        <StyledLoginText>Sign up</StyledLoginText>
      </Box>
      <StyledInputField
        placeholder="Enter Email Address"
        variant="outlined"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <Box position="relative">
        <StyledInputField
          placeholder="Enter Password"
          type={isVisible ? "text" : "password"}
          value={password}
          onChange={e => setPassword(e.target.value)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          variant="outlined"
          required
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => SetIsVisible(prev => !prev)}>
                {isVisible ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
              </IconButton>
            ),
          }}
        />
        {isFocused && (
          <StyledPasswordValidationContainer isWebView={isWebView}>
            <StyledValidationTextWrapper
              isRequired={!isRequiredSet.minEightChar}
            >
              {!isRequiredSet.minEightChar ? (
                <img src={RightCheckMarkIcon} />
              ) : (
                <img src={RightCheckGreenMarkIcon} />
              )}
              <StyledValidationText>minimum 8 characters</StyledValidationText>
            </StyledValidationTextWrapper>
            <StyledValidationTextWrapper isRequired={!isRequiredSet.uppercase}>
              {!isRequiredSet.uppercase ? (
                <img src={RightCheckMarkIcon} />
              ) : (
                <img src={RightCheckGreenMarkIcon} />
              )}
              <StyledValidationText>1 uppercase</StyledValidationText>
            </StyledValidationTextWrapper>
            <StyledValidationTextWrapper isRequired={!isRequiredSet.lowercase}>
              {!isRequiredSet.lowercase ? (
                <img src={RightCheckMarkIcon} />
              ) : (
                <img src={RightCheckGreenMarkIcon} />
              )}
              <StyledValidationText>1 lowercase</StyledValidationText>
            </StyledValidationTextWrapper>
            <StyledValidationTextWrapper isRequired={!isRequiredSet.digit}>
              {!isRequiredSet.digit ? (
                <img src={RightCheckMarkIcon} />
              ) : (
                <img src={RightCheckGreenMarkIcon} />
              )}
              <StyledValidationText>1 number</StyledValidationText>
            </StyledValidationTextWrapper>
          </StyledPasswordValidationContainer>
        )}
      </Box>
      <StyledTextBox>If you have a 6-digit code, enter it below</StyledTextBox>
      <StyledInputField
        mb={"0"}
        placeholder="6-digit code"
        variant="outlined"
        value={refCode}
        onChange={e => setRefCode(e.target.value)}
      />
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
    <StyledLoginContainerMobile component="form" onSubmit={onSubmit}>
      {!isWebView && <SignupStepsProgressMobile stage={stage} steps={step} />}
      <Box
        display="flex"
        flexDirection="column"
        maxWidth={rem("375px")}
        mx={"auto"}
      >
        <Box display="flex" justifyContent="center">
          <StyledLoginText>Sign up</StyledLoginText>
        </Box>
        <StyledInputField
          placeholder="Enter Email Address"
          variant="outlined"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <Box position="relative">
          <StyledInputField
            placeholder="Enter Password"
            type={isVisible ? "text" : "password"}
            value={password}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            required
            onChange={e => setPassword(e.target.value)}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => SetIsVisible(prev => !prev)}>
                  {isVisible ? (
                    <VisibilityOffOutlined />
                  ) : (
                    <VisibilityOutlined />
                  )}
                </IconButton>
              ),
            }}
          />
          {isFocused && (
            <StyledPasswordValidationContainer isWebView={isWebView}>
              <StyledValidationTextWrapper
                isRequired={!isRequiredSet.minEightChar}
              >
                {!isRequiredSet.minEightChar ? (
                  <img src={RightCheckMarkIcon} />
                ) : (
                  <img src={RightCheckGreenMarkIcon} />
                )}
                <StyledValidationText>
                  minimum 8 characters
                </StyledValidationText>
              </StyledValidationTextWrapper>
              <StyledValidationTextWrapper
                isRequired={!isRequiredSet.uppercase}
              >
                {!isRequiredSet.uppercase ? (
                  <img src={RightCheckMarkIcon} />
                ) : (
                  <img src={RightCheckGreenMarkIcon} />
                )}
                <StyledValidationText>1 uppercase</StyledValidationText>
              </StyledValidationTextWrapper>
              <StyledValidationTextWrapper
                isRequired={!isRequiredSet.lowercase}
              >
                {!isRequiredSet.lowercase ? (
                  <img src={RightCheckMarkIcon} />
                ) : (
                  <img src={RightCheckGreenMarkIcon} />
                )}
                <StyledValidationText>1 lowercase</StyledValidationText>
              </StyledValidationTextWrapper>
              <StyledValidationTextWrapper isRequired={!isRequiredSet.digit}>
                {!isRequiredSet.digit ? (
                  <img src={RightCheckMarkIcon} />
                ) : (
                  <img src={RightCheckGreenMarkIcon} />
                )}
                <StyledValidationText>1 number</StyledValidationText>
              </StyledValidationTextWrapper>
            </StyledPasswordValidationContainer>
          )}
        </Box>
        <StyledTextBox>
          If you have a 6-digit code, enter it below
        </StyledTextBox>
        <StyledInputField
          mb={"0"}
          placeholder="6-digit code"
          variant="outlined"
          value={refCode}
          onChange={e => setRefCode(e.target.value)}
        />
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
  )
}
export default SignupSection
