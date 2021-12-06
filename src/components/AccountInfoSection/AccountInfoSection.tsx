import React, { useState } from "react"
import { FormProps } from "../../pages/signup"
import { useForm } from "react-hook-form"
import { Box, useMediaQuery } from "@mui/material"
import { makeStyles } from "@mui/styles"
import ReactPhoneInput from "react-phone-input-2"

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
import TimeZoneSelect, { ITimezone } from "react-timezone-select"
import { rem } from "polished"
import { Link } from "gatsby"

const useStyles = makeStyles({
  timezoneStyles: {
    "& > div": {
      padding: "6px 0",
      borderRadius: "10px !important",
    },
  },
})

const AccountInfoSection: React.FC<FormProps> = ({ setFormStage }) => {
  const classes = useStyles()
  const isWebView = useMediaQuery("(min-width:768px)")
  const [selectedTimezone, setSelectedTimezone] = useState<ITimezone>("")
  const [phoneNo, setPhoneNo] = useState("")

  const onSubmit = (data: any) => {
    console.log(data)
    setFormStage(prev => prev + 1)
  }

  const { handleSubmit } = useForm()

  return isWebView ? (
    <StyledLoginContainer component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" justifyContent="center">
        <StyledLoginText>Sign up</StyledLoginText>
      </Box>
      <StyledInputField
        type="text"
        placeholder="First Name"
        variant="outlined"
      />

      <StyledInputField placeholder="Surname" type="text" variant="outlined" />
      <ReactPhoneInput
        value={phoneNo}
        onChange={(e: any) => setPhoneNo(e.target.value)}
      />
      <TimeZoneSelect
        className={classes.timezoneStyles}
        placeholder="choose timezone"
        value={selectedTimezone}
        onChange={setSelectedTimezone}
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
    <StyledLoginContainerMobile
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box
        display="flex"
        flexDirection="column"
        maxWidth={rem("375px")}
        mx={"auto"}
      >
        <Box display="flex" justifyContent="center">
          <StyledLoginText>Sign up</StyledLoginText>
        </Box>
        <StyledInputField placeholder="First Name" variant="outlined" />
        <StyledInputField placeholder="Surname" variant="outlined" />
        <StyledInputField placeholder="6-digit code" variant="outlined" />

        <TimeZoneSelect
          placeholder="choose timezone"
          value={selectedTimezone}
          onChange={setSelectedTimezone}
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

export default AccountInfoSection
