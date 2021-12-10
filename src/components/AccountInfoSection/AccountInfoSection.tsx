import React, { useEffect, useState } from "react"
import { FormProps } from "../../pages/signup"
import { Box, useMediaQuery } from "@mui/material"
import { makeStyles } from "@mui/styles"
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
import ReactPhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/material.css"
import { devices } from "../../constants/device"

const useStyles = makeStyles({
  timezoneStyles: {
    "& > div": {
      padding: "6px 0",
      borderRadius: "10px !important",
    },
    "& > div > div > span": {
      display: "none",
    },
  },
  telephoneInputContainer: {
    "& > .special-label": {
      display: "none",
    },
    "& > .form-control": {
      width: "100%",
      height: rem("48px"),
      borderRadius: rem("10px"),
    },

    marginBottom: "1rem",
  },
})

const AccountInfoSection: React.FC<FormProps> = ({ setFormStage }) => {
  const classes = useStyles()
  const isWebView = useMediaQuery(devices.web.up)
  const [selectedTimezone, setSelectedTimezone] = useState<ITimezone>(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )
  const [phoneNo, setPhoneNo] = useState("")
  const [firstName, setFirstName] = useState("")
  const [surName, setSurName] = useState("")
  const [isButtonDisable, setIsButtonDisable] = useState<boolean>(true)
  const onSubmit = () => {
    setFormStage(prev => prev + 1)
  }

  useEffect(() => {
    setIsButtonDisable(() => {
      if (
        phoneNo.length &&
        selectedTimezone &&
        firstName.length &&
        surName.length
      ) {
        return false
      }
      return true
    })
  }, [phoneNo, selectedTimezone, firstName, surName])

  return isWebView ? (
    <StyledLoginContainer component="form" onSubmit={onSubmit}>
      <Box display="flex" justifyContent="center">
        <StyledLoginText>Sign up</StyledLoginText>
      </Box>
      <StyledInputField
        type="text"
        placeholder="First Name"
        variant="outlined"
        value={firstName}
        onChange={(e: any) => setFirstName(e.target.value)}
        required
      />
      <StyledInputField
        placeholder="Surname"
        type="text"
        variant="outlined"
        value={surName}
        onChange={(e: any) => setSurName(e.target.value)}
        required
      />
      <ReactPhoneInput
        country={"gb"}
        containerClass={classes.telephoneInputContainer}
        placeholder=""
        value={phoneNo}
        onChange={(phone: any) => setPhoneNo(phone)}
        inputProps={{
          required: true,
        }}
      />
      <TimeZoneSelect
        placeholder="choose timezone"
        className={classes.timezoneStyles}
        value={selectedTimezone}
        onChange={setSelectedTimezone}
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
            <Link to="/signin"> Log In</Link>
          </StyledSignUpButton>
        </StyledSignUpText>
      </Box>
    </StyledLoginContainer>
  ) : (
    <StyledLoginContainerMobile component="form" onSubmit={onSubmit}>
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
          placeholder="First Name"
          value={firstName}
          onChange={(e: any) => setFirstName(e.target.value)}
          variant="outlined"
        />
        <StyledInputField
          placeholder="Surname"
          value={surName}
          onChange={(e: any) => setSurName(e.target.value)}
          variant="outlined"
        />
        <ReactPhoneInput
          country={"gb"}
          containerClass={classes.telephoneInputContainer}
          placeholder=""
          value={phoneNo}
          onChange={(phone: any) => setPhoneNo(phone)}
          inputProps={{
            required: true,
          }}
        />
        <TimeZoneSelect
          placeholder="choose timezone"
          value={selectedTimezone}
          className={classes.timezoneStyles}
          onChange={setSelectedTimezone}
        />
        <StyledButton
          variant="contained"
          color="primary"
          disableElevation
          margintop={rem("56px")}
          type="submit"
          disabled={!!isButtonDisable}
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
