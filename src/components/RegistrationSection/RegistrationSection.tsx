import React, { useEffect, useState } from "react"
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material"
import { Link } from "gatsby"
import { Box, IconButton, useMediaQuery } from "@mui/material"
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
} from "../commons/commonComponents"
import {
  StyledPasswordValidationContainer,
  StyledTextBox,
  StyledValidationText,
  StyledValidationTextWrapper,
} from "./RegistrationSection.styled"
import { FormProps } from "../../pages/signup"
import RightCheckMarkIcon from "../../assets/icons/checkmark_icon.svg"
import RightCheckGreenMarkIcon from "../../assets/icons/checkmark-green_icon.svg"
import { devices } from "../../constants/device"
import { SignupStepsProgressMobile } from "../SignupStepsProgress/SignupStepsProgress"

interface IStateProps {
  lowercase: boolean
  uppercase: boolean
  minEightChar: boolean
  digit: boolean
}

const SignupSection: React.FC<FormProps> = ({ setFormStage, stage, step }) => {
  const [email, setEmail] = useState<string>("")
  const [isVisible, SetIsVisible] = useState<boolean>(false)
  const [password, setPassword] = useState<string>("")
  const [referral, setReferral] = useState<string>("")
  const isWebView = useMediaQuery(devices.web.up)
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [isRequiredSet, SetIsRequiredSet] = useState<IStateProps>({
    digit: true,
    lowercase: true,
    minEightChar: true,
    uppercase: true,
  })

  const atLeastALowercase = new RegExp(/(?=.*[a-z])/)
  const atLeastAnUppercase = new RegExp(/(?=.*[A-Z])/)
  const atLeastANumber = new RegExp(/(?=.*\d)/)
  const minEightChar = new RegExp(/.{8,}/)

  useEffect(() => {
    SetIsRequiredSet({
      digit: atLeastANumber.test(password),
      lowercase: atLeastALowercase.test(password),
      minEightChar: minEightChar.test(password),
      uppercase: atLeastAnUppercase.test(password),
    })
  }, [password])

  const handleInputFocus = () => setIsFocused(true)
  const handleInputBlur = () => setIsFocused(false)

  const onSubmit = (e: any) => {
    if (
      isRequiredSet.minEightChar &&
      isRequiredSet.digit &&
      isRequiredSet.lowercase &&
      isRequiredSet.uppercase
    ) {
      console.log(email, password, referral)
      setFormStage(prev => prev + 1)
    }

    if (
      !(
        isRequiredSet.digit &&
        isRequiredSet.lowercase &&
        isRequiredSet.minEightChar &&
        isRequiredSet.uppercase
      )
    )
      handleInputFocus()
    e.preventDefault()
    return
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
        value={referral}
        onChange={e => setReferral(e.target.value)}
      />
      <StyledButton
        variant="contained"
        color="primary"
        disableElevation
        margintop={rem("56px")}
        type="submit"
      >
        <StyledButtonText>Continue</StyledButtonText>
      </StyledButton>
      <Box display="flex" justifyContent="center">
        <StyledSignUpText>
          Already have an account?
          <StyledSignUpButton>
            <Link to="/signin"> Log in</Link>
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
          value={referral}
          onChange={e => setReferral(e.target.value)}
        />
        <StyledButton
          variant="contained"
          color="primary"
          disableElevation
          margintop={rem("56px")}
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
          <StyledSignUpButton>
            <Link to="/signin">Log In</Link>
          </StyledSignUpButton>
        </Box>
      </Box>
    </StyledLoginContainerMobile>
  )
}
export default SignupSection
