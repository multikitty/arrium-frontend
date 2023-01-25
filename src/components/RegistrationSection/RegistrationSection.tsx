import React, { useEffect, useMemo, useState } from "react"
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material"
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material"

import {
  StyledButton,
  StyledButtonText,
  StyledFieldLabel,
  StyledLoginContainer,
  StyledLoginContainerMobile,
  StyledCardHeader,
  StyledSignUpButton,
  StyledSignUpText,
} from "@/components/commons/uiComponents"
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
import { RequiredSet } from "./RegistrationSection.types"
import { FormProps } from "../SignUpPage/SignUpPage"
import routes from "@/constants/routes"
import { useMutation } from "react-query"
import { registerUser } from "@/agent/signup"
import {
  RegistrationUserVariables,
  RegistrationUserResult,
} from "@/lib/interfaces/signup"
import { useSnackbar } from "notistack"
import localStorageUtils, { setLocalStorage } from "@/utils/localStorage"
import useNavigate from "@/hooks/useNavigate"
import { PageProps } from "@/lib/interfaces/common"
import { COUNTRY_CODE, TOKEN } from "@/constants/localStorage"
import { DEFAULT_COUNTRY } from "@/constants/common"
import InputField from "../commons/InputField"
import HelperText from "../commons/HelperText"

interface SignupSectionProps extends FormProps, PageProps {}

const SignupSection: React.FC<SignupSectionProps> = ({
  setFormStage,
  stage,
  step,
  country_code,
}) => {
  const theme = useTheme()
  const isWebView = useMediaQuery(devices.web.up)
  const { enqueueSnackbar } = useSnackbar()
  const {
    navigate,
    navigateWithQuery: { navigateToSignup },
  } = useNavigate({ country_code })

  const [email, setEmail] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [password, setPassword] = useState("")
  const [refCode, setRefCode] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [isPasswordFieldDirty, setIsPasswordFieldDirty] = useState(false)
  const [errors, setErrors] = useState<Record<string, string> | null>(null)
  const [isRequiredSet, setIsRequiredSet] = useState<RequiredSet>({
    digit: true,
    lowercase: true,
    minEightChar: true,
    uppercase: true,
  })
  const { mutate } = useMutation<
    RegistrationUserResult,
    Error,
    RegistrationUserVariables
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

  const handlePasswordFieldChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPassword(e.target.value)
    setIsPasswordFieldDirty(true)
    if (!isPasswordValid && !!errors?.password) {
      setErrors(errs => ({
        ...errs,
        password: "Please choose a stronger password",
      }))
    } else {
      setErrors(null)
    }
  }

  const handleInputFocus = () => {
    setIsFocused(true)
  }
  const handleInputBlur = () => {
    setIsFocused(false)
    if (!isPasswordValid && isPasswordFieldDirty) {
      setErrors(errs => ({
        ...errs,
        password: "Please choose a stronger password",
      }))
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement | null>) => {
    e.preventDefault()
    if (!isPasswordValid) {
      handleInputFocus()
      return
    }

    const variables: RegistrationUserVariables = {
      email,
      password,
      refCode,
      country: (
        country_code ||
        localStorageUtils.get(COUNTRY_CODE) ||
        DEFAULT_COUNTRY
      ).toUpperCase(),
    }

    mutate(variables, {
      onSuccess({ data, success, message, validationError }) {
        if (!success) {
          enqueueSnackbar(
            validationError?.email ||
              validationError?.password ||
              validationError?.refCode ||
              validationError?.country ||
              message,
            { variant: "error" }
          )
          return
        }
        if (!data) return
        setLocalStorage(TOKEN, data.token)
        setFormStage(prev => prev + 1)
        navigateToSignup(stage + 1)
      },
    })
  }

  const handleNavigateToSignIn = () => {
    navigate(routes.signin)
  }

  const isPasswordValid = useMemo(
    () =>
      isRequiredSet.digit &&
      isRequiredSet.lowercase &&
      isRequiredSet.minEightChar &&
      isRequiredSet.uppercase,
    [isRequiredSet]
  )

  const isSubmitDisabled = !email || !password || !isPasswordValid

  return (
    <React.Fragment>
      {isWebView ? (
        <StyledLoginContainer onSubmit={onSubmit}>
          <Box display="flex" justifyContent="center">
            <StyledCardHeader>Sign up</StyledCardHeader>
          </Box>
          <StyledFieldLabel $isHidden={!email}>Email ID*</StyledFieldLabel>
          <InputField
            placeholder="Enter Email Address"
            variant="outlined"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <StyledFieldLabel $isHidden={!password}>Password*</StyledFieldLabel>
          <Box position="relative">
            <InputField
              placeholder="Enter Password"
              type={isVisible ? "text" : "password"}
              value={password}
              onChange={handlePasswordFieldChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              variant="outlined"
              required
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setIsVisible(prev => !prev)}>
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
            {!!errors?.password && (
              <HelperText
                type="large"
                ml="0"
                mt="-8px"
                color={theme.palette.error.main}
              >
                {errors.password}
              </HelperText>
            )}
          </Box>
          <StyledTextBox>
            If you have a 6-digit code, enter it below
          </StyledTextBox>
          <InputField
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
            $marginTop={"40px"}
            type="submit"
            disabled={isSubmitDisabled}
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
        <StyledLoginContainerMobile onSubmit={onSubmit}>
          {!isWebView && (
            <SignupStepsProgressMobile stage={stage} steps={step} />
          )}
          <Box
            display="flex"
            flexDirection="column"
            maxWidth={"375px"}
            mx={"auto"}
          >
            <Box display="flex" justifyContent="center">
              <StyledCardHeader>Sign up</StyledCardHeader>
            </Box>
            <StyledFieldLabel $isHidden={!email}>Email ID*</StyledFieldLabel>
            <InputField
              placeholder="Enter Email Address"
              variant="outlined"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <StyledFieldLabel $isHidden={!password}>Password*</StyledFieldLabel>
            <Box position="relative">
              <InputField
                placeholder="Enter Password"
                type={isVisible ? "text" : "password"}
                value={password}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
                onChange={handlePasswordFieldChange}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setIsVisible(prev => !prev)}>
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
                  <StyledValidationTextWrapper
                    isRequired={!isRequiredSet.digit}
                  >
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
            <InputField
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
              $marginTop={"40px"}
              type="submit"
              disabled={isSubmitDisabled}
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
export default SignupSection
