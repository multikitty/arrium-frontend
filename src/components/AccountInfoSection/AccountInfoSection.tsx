import React, { useEffect, useState } from "react"
import { Box, useMediaQuery } from "@mui/material"
import { makeStyles } from "@mui/styles"
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
  StyledLoginContainer,
  StyledLoginContainerMobile,
  StyledCardHeader,
  StyledSignUpButton,
  StyledSignUpText,
} from "@/components/commons/uiComponents"
import { devices } from "@/constants/device"
import { SignupStepsProgressMobile } from "@/components/SignupStepsProgress/SignupStepsProgress"
import { content } from "@/constants/content"
import { CountryData as CountryDataType } from "@/utils/getCountryData"
import AccountInfoCountrySelect from "@/components/AccountInfoSection/AccountInfoCountrySelect"
import routes from "@/constants/routes"
import {
  AccountInfoResult,
  AccountInfoVariables,
} from "@/lib/interfaces/signup"
import { updateAccountInfo } from "@/agent/signup"
import useNavigate from "@/hooks/useNavigate"
import { PageProps } from "@/lib/interfaces/common"
import { useGeolocation } from "@/agent/geolocation"
import LoadingScreen from "@/components/LoadingScreen"
import { getFilteredCountries } from "@/utils/getCountryData"
import { localStorageUtils } from "@/utils"
import { COUNTRY_CODE } from "@/constants/localStorage"
import { DEFAULT_COUNTRY } from "@/constants/common"
import { AccountInfoData } from "@/components/SignUpPage/SignUpPage"
import InputField from "@/components/commons/InputField"
import { getRawPhoneNumber } from "@/utils/getRawPhoneNumber"
import HelperText from "@/components/commons/HelperText"
import TimezoneAutocomplete from "@/components/TimezoneAutocomplete"

const useStyles = makeStyles({
  timezoneStyles: {
    "& > div": {
      padding: "6px 0",
    },
    "& .MuiInputBase-root": {
      borderRadius: "10px !important",
      background: "white",
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

interface AccountInfoSection extends FormProps, PageProps {
  data: AccountInfoData | null
}

const AccountInfoSection: React.FC<AccountInfoSection> = ({
  setFormStage,
  stage,
  step,
  country_code,
  data,
}) => {
  const {
    navigate,
    navigateWithQuery: { navigateToSignup },
  } = useNavigate({ country_code })
  const { enqueueSnackbar } = useSnackbar()

  const classes = useStyles()
  const isWebView = useMediaQuery(devices.web.up)
  const [selectedTimezone, setSelectedTimezone] = useState(
    data?.tzName || Intl.DateTimeFormat().resolvedOptions().timeZone
  )
  const [phoneNo, setPhoneNo] = useState(data?.phoneNumber || "")
  const [phoneCountry, setPhoneCountry] = useState(
    data?.countryCode || localStorageUtils.get(COUNTRY_CODE) || DEFAULT_COUNTRY
  )
  const [dialCode, setDialCode] = useState(data?.dialCode || "")
  const [phoneNumberError, setPhoneNumberError] = useState(false)
  const [isPhoneInputDirty, setIsPhoneInputDirty] = useState(false)
  const [firstName, setFirstName] = useState(data?.firstname || "")
  const [surName, setSurName] = useState(data?.lastname || "")
  const [country, setCountry] = useState<CountryDataType | null>(
    data?.countryCode
      ? getFilteredCountries([data.countryCode.toLowerCase()])[0]
      : null
  )
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const { mutate } = useMutation<
    AccountInfoResult,
    Error,
    AccountInfoVariables
  >(updateAccountInfo)
  const { data: geolocationData, isLoading } = useGeolocation()

  const handleNavigateToSignin = () => {
    navigate(routes.signin)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement | null>) => {
    e.preventDefault()
    const phoneNumber = getRawPhoneNumber(phoneNo, dialCode)

    const variables: AccountInfoVariables = {
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

  const validateRawPhoneNumber = () => {
    const rawPhoneNumber = getRawPhoneNumber(phoneNo, dialCode)
    setPhoneNumberError(rawPhoneNumber.length < 9)
  }

  const handlePhoneNoField = (phone: string, data: CountryData | {}) => {
    const countryDialCode = (data as CountryData).dialCode
    const countryCode = (data as CountryData).countryCode
    setPhoneNo(phone)
    setPhoneCountry(countryCode)
    setDialCode(countryDialCode)
    setIsPhoneInputDirty(true)
  }

  useEffect(validateRawPhoneNumber, [phoneNo])

  useEffect(() => {
    const rawPhoneNumber = getRawPhoneNumber(phoneNo, dialCode)

    const disableButtonCondition =
      phoneNumberError ||
      !rawPhoneNumber.length ||
      !selectedTimezone ||
      !firstName.length ||
      !surName.length ||
      !country

    setIsButtonDisabled(disableButtonCondition)
  }, [phoneNo, selectedTimezone, firstName, surName, country])

  useEffect(() => {
    if (!!data) {
      const countryData = getFilteredCountries([
        data.countryCode.toLowerCase(),
      ])[0]
      setCountry(countryData)
      setPhoneCountry(countryData.countryShortName.toLowerCase())
      setPhoneNo(data.dialCode + data.phoneNumber)
      setDialCode(data.dialCode)
      setSelectedTimezone(data.tzName)
      setFirstName(data.firstname)
      setSurName(data.lastname)
      return
    }
    if (!geolocationData) return
    const countryData = getFilteredCountries([
      geolocationData.country_code.toLowerCase(),
    ])[0]
    setCountry(countryData)
    setPhoneCountry(countryData.countryShortName.toLowerCase())
    setDialCode(geolocationData.calling_code)
    setSelectedTimezone(geolocationData.timezone.id)
  }, [geolocationData, data])

  if (isLoading) return <LoadingScreen />

  return (
    <React.Fragment>
      {isWebView ? (
        <StyledLoginContainer onSubmit={onSubmit} noValidate>
          <Box display="flex" justifyContent="center">
            <StyledCardHeader>
              {content.accountInfoSection.title}
            </StyledCardHeader>
          </Box>
          <StyledFieldLabel $isHidden={!firstName}>First Name</StyledFieldLabel>
          <InputField
            allowNumbers={false}
            type="text"
            placeholder="First Name"
            variant="outlined"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
          <StyledFieldLabel $isHidden={!surName}>Surname</StyledFieldLabel>
          <InputField
            allowNumbers={false}
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
          {phoneNumberError && isPhoneInputDirty && (
            <HelperText type="large" mt="-8px" mb="16px">
              Please enter valid phone number
            </HelperText>
          )}
          <StyledFieldLabel $isHidden={!selectedTimezone}>
            Timezone
          </StyledFieldLabel>
          <TimezoneAutocomplete
            size="medium"
            placeholder="Choose timezone"
            className={classes.timezoneStyles}
            timezone={selectedTimezone}
            setTimezone={(tz: string | null) => setSelectedTimezone(tz || "")}
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
        <StyledLoginContainerMobile onSubmit={onSubmit} noValidate>
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
                {content.accountInfoSection.title}
              </StyledCardHeader>
            </Box>
            <StyledFieldLabel $isHidden={!firstName}>
              First Name
            </StyledFieldLabel>
            <InputField
              allowNumbers={false}
              type="text"
              placeholder="First Name"
              variant="outlined"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
            />
            <StyledFieldLabel $isHidden={!surName}>Surname</StyledFieldLabel>
            <InputField
              allowNumbers={false}
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
            {phoneNumberError && (
              <HelperText type="large" mt="-8px" mb="16px">
                Please enter valid phone number
              </HelperText>
            )}
            <StyledFieldLabel $isHidden={!selectedTimezone}>
              Timezone
            </StyledFieldLabel>
            <TimezoneAutocomplete
              size="medium"
              placeholder="Choose timezone"
              className={classes.timezoneStyles}
              timezone={selectedTimezone}
              setTimezone={(tz: string | null) => setSelectedTimezone(tz || "")}
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
