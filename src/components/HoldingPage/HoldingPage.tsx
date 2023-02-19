import React from "react"
import { Box, useMediaQuery } from "@mui/material"
import { rem } from "polished"

import { devices } from "@/constants/device"
import EmailSvg from "@/assets/icons/signup_email.inline.svg"
import {
  StyledButton,
  StyledButtonText,
  StyledLoginContainer,
  StyledLoginContainerMobile,
  StyledCardHeader,
  StyledSignUpButton,
} from "../commons/uiComponents"
import { StyledText } from "../RegistrationSection/RegistrationSection.styled"
import { SignupStepsProgressMobile } from "../SignupStepsProgress/SignupStepsProgress"

import { FormProps } from "../SignUpPage/SignUpPage"
import routes from "@/constants/routes"
import useNavigate from "@/hooks/useNavigate"
import { PageProps } from "@/lib/interfaces/common"
import { Helmet } from "react-helmet"

interface HoldingPageProps extends FormProps, PageProps {}

const HoldingPage: React.FC<HoldingPageProps> = ({
  stage,
  step,
  country_code,
}) => {
  const { navigate } = useNavigate({ country_code })
  const isWebView = useMediaQuery(devices.web.up)

  const onSubmit = (e: React.FormEvent<HTMLFormElement | null>) => {
    e.preventDefault()
    navigate(routes.signin)
  }

  return (
    <React.Fragment>
      <Helmet>
        <script
          id="ze-snippet"
          src="https://static.zdassets.com/ekr/snippet.js?key=a4713c23-7381-41e4-bfdb-8d6c4d38cd0b"
        />
      </Helmet>
      {isWebView ? (
        <StyledLoginContainer onSubmit={onSubmit}>
          <Box display="flex" justifyContent="center">
            <StyledCardHeader>We are setting your account up</StyledCardHeader>
          </Box>
          <StyledText>
            You&apos;ll receive a confirmation email within 24 hours.
          </StyledText>
          <Box display="flex" justifyContent="center" marginTop={rem("28px")}>
            <EmailSvg />
          </Box>
          <StyledButton
            variant="contained"
            color="primary"
            disableElevation
            $marginTop={rem("56px")}
            type="submit"
          >
            <StyledSignUpButton>
              <StyledButtonText>OK</StyledButtonText>
            </StyledSignUpButton>
          </StyledButton>
        </StyledLoginContainer>
      ) : (
        <StyledLoginContainerMobile onSubmit={onSubmit}>
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
              <StyledCardHeader>
                We are setting your account up
              </StyledCardHeader>
            </Box>
            <StyledText>
              You&apos;ll receive a confirmation email within 24 hours.
            </StyledText>
            <Box display="flex" justifyContent="center" marginTop={rem("28px")}>
              <EmailSvg />
            </Box>
            <StyledButton
              variant="contained"
              color="primary"
              disableElevation
              $marginTop={rem("56px")}
              type="submit"
            >
              <StyledSignUpButton>
                <StyledButtonText>OK</StyledButtonText>
              </StyledSignUpButton>
            </StyledButton>
          </Box>
        </StyledLoginContainerMobile>
      )}
    </React.Fragment>
  )
}

export default HoldingPage
