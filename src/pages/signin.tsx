import { Box } from "@mui/system"
import { rem } from "polished"
import React from "react"
import styled from "styled-components"
import { StyledInputField } from "../components/commons/InputField"
import Seo from "../components/seo"
import TopLayout from "../components/topLayout"

export const StyledTitle = styled.h2`
  font-weight: 700;
  size: ${rem("34px")};
  color: #2453b2;
  line-height: ${rem("32px")};
  letter-spacing: 1.6px;
  text-transform: uppercase;
`

export const StyledLoginContainer = styled(Box)<{ backgroundColor?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: ${rem("20px")};
  background-color: #f2f3f7;
`

export const StyledLoginText = styled.h4`
  font-size: ${rem("28px")};
  font-weight: 400;
  padding: ${rem("40px")};
  color: #0a0a0a;
  line-height: ${rem("32px")};
`

const signin = () => {
  return (
    <TopLayout>
      <Seo title="Sign In | Arrium" />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        height="100vh"
      >
        <StyledTitle>Arrium</StyledTitle>
        <StyledLoginContainer>
          <StyledLoginText>Login to your account</StyledLoginText>
          <StyledInputField
            placeholder="Enter Email Address"
            variant="outlined"
            type="email"
          />
          <StyledInputField
            placeholder="Enter Password"
            type="password"
            variant="outlined"
          />
        </StyledLoginContainer>
      </Box>
    </TopLayout>
  )
}

export default signin
