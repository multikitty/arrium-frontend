import React, { useEffect, useState } from "react"
import { type FormProps } from "@/components/SignUpPage"
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
} from "../commons/uiComponents"
import TimeZoneSelect, { ITimezone } from "react-timezone-select"
import { rem } from "polished"
import { navigate } from "gatsby"
import ReactPhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/material.css"
import { devices } from "@/constants/device"
import { SignupStepsProgressMobile } from "../SignupStepsProgress/SignupStepsProgress"
import { content } from "@/constants/content"
import  { CountryData } from "@/utils/getCountryData"
import AccountInfoCountrySelect from "./AccountInfoCountrySelect"
import routes from "@/constants/routes"
import { observer } from "mobx-react-lite"
import { useStore } from "@/store"

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

const AccountInfoSection: React.FC<FormProps> = ({
  setFormStage,
  stage,
  step,
}) => {
  const {userStore} = useStore()
  const classes = useStyles()
  const isWebView = useMediaQuery(devices.web.up)
  const [selectedTimezone, setSelectedTimezone] = useState<ITimezone>(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )
  const [phoneNo, setPhoneNo] = useState<string>("")
  const [firstName, setFirstName] = useState<string>("")
  const [surName, setSurName] = useState<string>("")
  const [country, setCountry] = useState<CountryData | null>(null)
  const [isButtonDisable, setIsButtonDisable] = useState<boolean>(true)

  const handleNavigateToSignin = () => {
    navigate(routes.signin)
  }

  const onSubmit = () => {
    setFormStage((prev: number) => prev + 1)
  }

  useEffect(() => {
    setIsButtonDisable(() => {
      if (
        phoneNo.length &&
        selectedTimezone &&
        firstName.length &&
        surName.length && country
      ) {
        return false
      }
      return true
    })
  }, [phoneNo, selectedTimezone, firstName, surName, country])

  return isWebView ? (
    <StyledLoginContainer component="form" onSubmit={onSubmit}>
      <Box display="flex" justifyContent="center">
        <StyledLoginText>{content.accountInfoSection.title}</StyledLoginText>
      </Box>
      <StyledInputField
        type="text"
        placeholder="First Name"
        variant="outlined"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        required
      />
      <StyledInputField
        placeholder="Surname"
        type="text"
        variant="outlined"
        value={surName}
        onChange={e => setSurName(e.target.value)}
        required
      />
      <AccountInfoCountrySelect country={country} setCountry={setCountry} label="Choose country"  />
      <ReactPhoneInput
        country={userStore.lowerCaseCountry}
        containerClass={classes.telephoneInputContainer}
        placeholder=""
        value={phoneNo}
        onChange={phone => setPhoneNo(phone)}
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
        <StyledButtonText>
          {content.accountInfoSection.buttonText}
        </StyledButtonText>
      </StyledButton>
      <Box display="flex" justifyContent="center">
        <StyledSignUpText>
          {content.accountInfoSection.alreadyHaveAnAccount}
          <StyledSignUpButton onClick={handleNavigateToSignin}>
            {content.accountInfoSection.logIn}
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
          <StyledLoginText>{content.accountInfoSection.title}</StyledLoginText>
        </Box>
        <StyledInputField
          placeholder="First Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          variant="outlined"
        />
        <StyledInputField
          placeholder="Surname"
          value={surName}
          onChange={e => setSurName(e.target.value)}
          variant="outlined"
        />
        <ReactPhoneInput
          country={userStore.lowerCaseCountry}
          containerClass={classes.telephoneInputContainer}
          placeholder=""
          value={phoneNo}
          onChange={phone => setPhoneNo(phone)}
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
          <StyledButtonText>
            {content.accountInfoSection.buttonText}
          </StyledButtonText>
        </StyledButton>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <StyledSignUpText>
            {content.accountInfoSection.alreadyHaveAnAccount}
          </StyledSignUpText>
          <StyledSignUpButton onClick={handleNavigateToSignin}>
            {content.accountInfoSection.logIn}
          </StyledSignUpButton>
        </Box>
      </Box>
    </StyledLoginContainerMobile>
  )
}

export default observer(AccountInfoSection)
