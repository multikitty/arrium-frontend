import React, { useEffect, useMemo, useState } from "react"
import { Box, IconButton, useMediaQuery } from "@mui/material"
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
import { StyledTextBox } from "./RegistrationSection.styled"
import { devices } from "@/constants/device"
import { SignupStepsProgressMobile } from "@/components/SignupStepsProgress/SignupStepsProgress"
import { RequiredSet } from "./RegistrationSection.types"
import { FormProps } from "@/components/SignUpPage/SignUpPage"
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
import InputField from "@/components/commons/InputField"
import HelperText from "@/components/commons/HelperText"
import {
  atLeastEightChar,
  atLeastOneLowercase,
  atLeastOneNumber,
  atLeastOneUppercase,
} from "@/constants/regex"
import PasswordValidationPopUp from "@/components/PasswordValidationPopUp/PasswordValidationPopUp"

export const REQUIRED_SET_DEFAULT: RequiredSet = {
  atLeastOneLowercase: true,
  atLeastOneUppercase: true,
  atLeastEightChar: true,
  atLeastOneNumber: true,
}

interface RegistrationSectionProps extends FormProps, PageProps { }

const RegistrationSection: React.FC<RegistrationSectionProps> = ({
  setFormStage,
  stage,
  step,
  country_code,
}) => {
  const isWebView = useMediaQuery(devices.web.up)
  const { enqueueSnackbar } = useSnackbar()
  const {
    navigate,
    navigateWithQuery: { navigateToSignup },
  } = useNavigate({ country_code })

  const [email, setEmail] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [password, setPassword] = useState("")
  const [refCode, setRefCode] = useState()
  const [isFocused, setIsFocused] = useState(false)
  const [isPasswordFieldDirty, setIsPasswordFieldDirty] = useState(false)
  const [errors, setErrors] = useState<Record<string, string> | null>(null)

  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const [requiredSet, setRequiredSet] =
    useState<RequiredSet>(REQUIRED_SET_DEFAULT)
  const { mutate } = useMutation<
    RegistrationUserResult,
    Error,
    RegistrationUserVariables
  >(registerUser)

  useEffect(() => {
    setRequiredSet({
      atLeastOneNumber: atLeastOneNumber.test(password),
      atLeastOneLowercase: atLeastOneLowercase.test(password),
      atLeastEightChar: atLeastEightChar.test(password),
      atLeastOneUppercase: atLeastOneUppercase.test(password),
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

  const onlyNumber = new RegExp(/^[0-9\b]+$/)
  const handleRefCodeField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value !== "" && e.target.value.length >= 3 && e.target.value.length <= 9 && onlyNumber.test(e.target.value.slice(3))) {
      setRefCode(`${value}`);
    }
  };
  const handleBlur = () => {
    if (refCode === "") {
      setShowPlaceholder(true);
    }
  };

  const isPasswordValid = useMemo(
    () =>
      requiredSet.atLeastOneNumber &&
      requiredSet.atLeastOneLowercase &&
      requiredSet.atLeastEightChar &&
      requiredSet.atLeastOneUppercase,
    [requiredSet]
  )

  const isSubmitDisabled = !email || !password || !isPasswordValid

  return (
    <React.Fragment>
      {isWebView ? (
        <StyledLoginContainer onSubmit={onSubmit} noValidate>
          <Box display="flex" justifyContent="center">
            <StyledCardHeader>Sign up</StyledCardHeader>
          </Box>
          <StyledFieldLabel $isHidden={!email}>Email Address*</StyledFieldLabel>
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
              <PasswordValidationPopUp
                isWebView
                atLeastEightChar={requiredSet.atLeastEightChar}
                atLeastOneLowercase={requiredSet.atLeastOneLowercase}
                atLeastOneUppercase={requiredSet.atLeastOneUppercase}
                atLeastOneNumber={requiredSet.atLeastOneNumber}
              />
            )}
            {!!errors?.password && (
              <HelperText type="large" mt="-8px">
                {errors.password}
              </HelperText>
            )}
          </Box>
          <StyledTextBox>
            If you have a referral code, enter it below
          </StyledTextBox>

          {showPlaceholder && (
            <InputField
              mb={"0"}
              placeholder={`${country_code ||
                localStorageUtils.get(COUNTRY_CODE) ||
                DEFAULT_COUNTRY}-256734`}
              variant="outlined"
              value={""}
              onFocus={() => setShowPlaceholder(false)}
            />
          )}
          {!showPlaceholder && (
            <InputField
              mb={"0"}
              placeholder=""
              variant="outlined"
              value={refCode}
              onChange={handleRefCodeField}
              onBlur={handleBlur}
            />
          )}
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
        <StyledLoginContainerMobile onSubmit={onSubmit} noValidate>
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
            <StyledFieldLabel $isHidden={!email}>
              Email Address*
            </StyledFieldLabel>
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
                <PasswordValidationPopUp
                  isWebView={false}
                  atLeastEightChar={requiredSet.atLeastEightChar}
                  atLeastOneLowercase={requiredSet.atLeastOneLowercase}
                  atLeastOneUppercase={requiredSet.atLeastOneUppercase}
                  atLeastOneNumber={requiredSet.atLeastOneNumber}
                />
              )}
              {!!errors?.password && (
                <HelperText type="large" mt="-8px">
                  {errors.password}
                </HelperText>
              )}
            </Box>
            <StyledTextBox>
              If you have a referral code, enter it below
            </StyledTextBox>

            {showPlaceholder && (
              <InputField
                mb={"0"}
                placeholder={`${country_code ||
                  localStorageUtils.get(COUNTRY_CODE) ||
                  DEFAULT_COUNTRY}-256734`}
                variant="outlined"
                value={""}
                onFocus={() => setShowPlaceholder(false)}
              />
            )}
            {!showPlaceholder && (
              <InputField
                mb={"0"}
                placeholder=""
                variant="outlined"
                value={`GB-${refCode}`}
                onChange={handleRefCodeField}
                onBlur={handleBlur}
              />
            )}
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
export default RegistrationSection
