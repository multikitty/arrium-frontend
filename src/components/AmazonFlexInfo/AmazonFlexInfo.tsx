import { Box, IconButton, useMediaQuery } from "@mui/material"
import React, { useEffect, useState } from "react"
import { devices } from "@/constants/device"
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material"
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
import { rem } from "polished"
import { SignupStepsProgressMobile } from "../SignupStepsProgress/SignupStepsProgress"
import { StyledText } from "../RegistrationSection/RegistrationSection.styled"
import { Link } from "gatsby"
import { FormProps } from "../SignUpPage/SignUpPage"

const AmazonFlexInfo: React.FC<FormProps> = ({ setFormStage, stage, step }) => {
  const isWebView = useMediaQuery(devices.web.up)
  const [userName, setUserName] = useState<string>("")
  const [isVisible, SetIsVisible] = useState<boolean>(false)
  const [password, setPassword] = useState<string>("")
  const [isButtonDisable, setIsButtonDisable] = useState<boolean>(true)

  const onSubmit = () => {
    setFormStage((prev: number) => prev + 1)
  }

  useEffect(() => {
    setIsButtonDisable(() => {
      if (password.length && userName.length) {
        return false
      }
      return true
    })
  }, [password, userName])

  return isWebView ? (
    <StyledLoginContainer component="form" onSubmit={onSubmit}>
      <Box display="flex" justifyContent="center">
        <StyledLoginText>Sign up</StyledLoginText>
      </Box>
      <StyledText>Please, enter your Amazon Flex account details</StyledText>
      <StyledInputField
        placeholder="Amazon Flex Username"
        variant="outlined"
        type="email"
        value={userName}
        onChange={e => setUserName(e.target.value)}
        required
        sx={{ marginTop: "1rem" }}
      />
      <StyledInputField
        placeholder="Amazon Flex Password"
        type={isVisible ? "text" : "password"}
        value={password}
        onChange={e => setPassword(e.target.value)}
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
      <StyledButton
        variant="contained"
        color="primary"
        disableElevation
        margintop={rem("56px")}
        type="submit"
        disabled={isButtonDisable}
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
          placeholder="Amazon Flex Username"
          variant="outlined"
          value={userName}
          type="email"
          required
        />
        <StyledInputField
          placeholder="Amazon Flex Password"
          type={isVisible ? "text" : "password"}
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => SetIsVisible(prev => !prev)}>
                {isVisible ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
              </IconButton>
            ),
          }}
        />
        <StyledButton
          variant="contained"
          color="primary"
          disableElevation
          margintop={rem("56px")}
          type="submit"
          disabled={isButtonDisable}
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

export default AmazonFlexInfo
