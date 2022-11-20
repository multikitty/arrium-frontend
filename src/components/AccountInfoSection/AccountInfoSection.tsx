import React, { useEffect, useState } from "react"
import { Box, useMediaQuery } from "@mui/material"
import { makeStyles } from "@mui/styles"
import TimeZoneSelect, { ITimezone } from "react-timezone-select"
import { rem } from "polished"
import { observer } from "mobx-react-lite"
import { useMutation } from "react-query"
import { useSnackbar } from "notistack"
import ReactPhoneInput, { CountryData } from "react-phone-input-2"
import "react-phone-input-2/lib/material.css"

import { FormProps } from "@/components/SignUpPage"
import {
  StyledButton,
  StyledButtonText,
  StyledFieldLabel,
  StyledInputField,
  StyledLoginContainer,
  StyledLoginContainerMobile,
  StyledLoginText,
  StyledSignUpButton,
  StyledSignUpText,
} from "../commons/uiComponents"
import { devices } from "@/constants/device"
import { SignupStepsProgressMobile } from "../SignupStepsProgress/SignupStepsProgress"
import { content } from "@/constants/content"
import { CountryData as CountryDataType } from "@/utils/getCountryData"
import AccountInfoCountrySelect from "./AccountInfoCountrySelect"
import routes from "@/constants/routes"
import {
  IAccountInfoResult,
  IAccountInfoVariables,
} from "@/lib/interfaces/signup"
import { updateAccountInfo } from "@/agent/signup"
import useNavigate from "@/hooks/useNavigate"
import { IPageProps } from "@/lib/interfaces/common"
import { useGeolocation } from "@/agent/geolocation"
import LoadingScreen from "../LoadingScreen"
import { getFilteredCountries } from "@/utils/getCountryData"
import { localStorageUtils } from "@/utils"
import { COUNTRY_CODE } from "@/constants/localStorage"
import { DEFAULT_COUNTRY } from "@/constants/common"

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

interface IAccountInfoSection extends FormProps, IPageProps {}

const AccountInfoSection: React.FC<IAccountInfoSection> = ({
  setFormStage,
  stage,
  step,
  country_code,
}) => {
  const {
    navigate,
    navigateWithQuery: { navigateToSignup },
  } = useNavigate({ country_code })
  const { enqueueSnackbar } = useSnackbar()

  const classes = useStyles()
  const isWebView = useMediaQuery(devices.web.up)
  const [selectedTimezone, setSelectedTimezone] = useState<ITimezone>(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )
  const [phoneNo, setPhoneNo] = useState("")
  const [phoneCountry, setPhoneCountry] = useState(
    localStorageUtils.get(COUNTRY_CODE) || DEFAULT_COUNTRY
  )
  const [dialCode, setDialCode] = useState("")
  const [firstName, setFirstName] = useState("")
  const [surName, setSurName] = useState("")
  const [country, setCountry] = useState<CountryDataType | null>(null)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const { mutate } = useMutation<
    IAccountInfoResult,
    Error,
    IAccountInfoVariables
  >(updateAccountInfo)
  const { data: geolocationData, isLoading } = useGeolocation()

  const handleNavigateToSignin = () => {
    navigate(routes.signin)
  }

  const onSubmit = (e: React.FormEvent<HTMLDivElement | null>) => {
    e.preventDefault()
    const phoneNumber = phoneNo.slice(dialCode.length || 0)

    const variables: IAccountInfoVariables = {
      country: country?.countryShortName
        ? country?.countryShortName.toUpperCase()
        : DEFAULT_COUNTRY.toUpperCase(),
      phoneNumber,
      dialCode,
      firstname: firstName,
      lastname: surName,
      tzName: selectedTimezone.toString(),
    }

    mutate(variables, {
      onSuccess({ success, message, validationError }) {
        if (!success) {
          enqueueSnackbar(
            validationError?.country ||
              validationError?.phoneNumber ||
              validationError?.dialCode ||
              validationError?.firstname ||
              validationError?.lastname ||
              validationError?.tzName ||
              message,
            { variant: "error" }
          )
          return
        }
        setFormStage((prev: number) => prev + 1)
        navigateToSignup(stage + 1)
      },
    })
  }

  const handlePhoneNoField = (phone: string, data: CountryData | {}) => {
    const countryDialCode = (data as CountryData).dialCode
    const countryCode = (data as CountryData).countryCode
    setPhoneNo(phone)
    setPhoneCountry(countryCode)
    setDialCode(countryDialCode)
  }

  useEffect(() => {
    setIsButtonDisabled(() => {
      if (
        phoneNo.length &&
        selectedTimezone &&
        firstName.length &&
        surName.length &&
        !!country
      ) {
        return false
      }
      return true
    })
  }, [phoneNo, selectedTimezone, firstName, surName, country])

  useEffect(() => {
    if (!geolocationData) return
    const countryData = getFilteredCountries([
      geolocationData.country_code.toLowerCase(),
    ])[0]
    setCountry(countryData)
    setPhoneCountry(countryData.countryShortName.toLowerCase())
    setDialCode(geolocationData.calling_code)
    setSelectedTimezone(geolocationData.timezone.id)
  }, [geolocationData])

  if (isLoading) return <LoadingScreen />

  return (
    <React.Fragment>
      {isWebView ? (
        <StyledLoginContainer component="form" onSubmit={onSubmit}>
          <Box display="flex" justifyContent="center">
            <StyledLoginText>
              {content.accountInfoSection.title}
            </StyledLoginText>
          </Box>
          <StyledFieldLabel $isHidden={!firstName}>First Name</StyledFieldLabel>
          <StyledInputField
            type="text"
            placeholder="First Name"
            variant="outlined"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
          <StyledFieldLabel $isHidden={!surName}>Surname</StyledFieldLabel>
          <StyledInputField
            type="text"
            placeholder="Surname"
            variant="outlined"
            value={surName}
            onChange={e => setSurName(e.target.value)}
            required
          />
          <StyledFieldLabel $isHidden={!country}>Country</StyledFieldLabel>
          <AccountInfoCountrySelect
            country={country}
            setCountry={setCountry}
            label="Choose country"
          />
          <StyledFieldLabel $isHidden={!phoneNo}>Phone Number</StyledFieldLabel>
          <ReactPhoneInput
            country={phoneCountry}
            containerClass={classes.telephoneInputContainer}
            placeholder=""
            value={phoneNo}
            onChange={handlePhoneNoField}
            inputProps={{
              required: true,
            }}
          />
          <StyledFieldLabel $isHidden={!selectedTimezone}>
            Timezone
          </StyledFieldLabel>
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
            $marginTop={rem("56px")}
            type="submit"
            disabled={isButtonDisabled}
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
              <StyledLoginText>
                {content.accountInfoSection.title}
              </StyledLoginText>
            </Box>
            <StyledFieldLabel $isHidden={!firstName}>
              First Name
            </StyledFieldLabel>
            <StyledInputField
              placeholder="First Name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              variant="outlined"
            />
            <StyledFieldLabel $isHidden={!surName}>Surname</StyledFieldLabel>
            <StyledInputField
              placeholder="Surname"
              value={surName}
              onChange={e => setSurName(e.target.value)}
              variant="outlined"
            />
            <StyledFieldLabel $isHidden={!country}>Country</StyledFieldLabel>
            <AccountInfoCountrySelect
              country={country}
              setCountry={setCountry}
              label="Choose country"
            />
            <StyledFieldLabel $isHidden={!phoneNo}>
              Phone Number
            </StyledFieldLabel>
            <ReactPhoneInput
              country={phoneCountry}
              containerClass={classes.telephoneInputContainer}
              placeholder=""
              value={phoneNo}
              onChange={handlePhoneNoField}
              inputProps={{
                required: true,
              }}
            />
            <StyledFieldLabel $isHidden={!selectedTimezone}>
              Timezone
            </StyledFieldLabel>
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
              $marginTop={rem("56px")}
              type="submit"
              disabled={isButtonDisabled}
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
      )}
    </React.Fragment>
  )
}

export default observer(AccountInfoSection)
