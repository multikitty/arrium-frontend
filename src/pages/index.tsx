import * as React from "react"
import LandingPage from "@/components/LandingPage"
import SelectCountryModal from "@/components/SelectCountryModal"
import CountryNotListedModal from "@/components/CountryNotListedModal"
import { navigate } from "gatsby-link"
import { useGeolocation } from "@/agent/geolocation"
import LoadingScreen from "@/components/LoadingScreen"
import { countriesToSelectList, DEFAULT_COUNTRY } from "@/constants/common"
import { localStorageUtils } from "@/utils"
import { COUNTRY_CODE } from "@/constants/localStorage"
import { AllowedCountries } from "@/types/common"
import FormSuccessModal from "@/components/FormSuccessModal"

const IndexPage = () => {
  const [selectCountryModalOpen, setSelectCountryModalOpen] =
    React.useState(false)
  const [countryNotListedModalOpen, setCountryNotListedModalOpen] =
    React.useState(false)
  const [formSuccessModalOpen, setFormSuccessModalOpen] = React.useState(false)
  const {
    data: geolocationData,
    isLoading,
    isError,
  } = useGeolocation({ enabled: !!localStorageUtils.get(COUNTRY_CODE) })

  const handleSelectCountryModalClose = () => {
    setSelectCountryModalOpen(false)
  }

  const handleCountryNotListedModalOpen = () => {
    setCountryNotListedModalOpen(true)
  }

  const handleCountryNotListedModalClose = () => {
    setCountryNotListedModalOpen(false)
  }

  const handleFormSuccessModalOpen = () => {
    setFormSuccessModalOpen(true)
  }

  const handleFormSuccessModalClose = () => {
    setFormSuccessModalOpen(false)
    localStorageUtils.set(COUNTRY_CODE, DEFAULT_COUNTRY)
    navigate(`/${DEFAULT_COUNTRY}/en`)
  }

  const handleSelectCountryModalSave = () => {
    handleSelectCountryModalClose()
    handleCountryNotListedModalOpen()
  }

  const handleCountryNotListedModalContinue = () => {
    handleCountryNotListedModalClose()
    handleFormSuccessModalOpen()
  }

  React.useEffect(() => {
    const codeInStorage = localStorageUtils.get(COUNTRY_CODE)

    if (codeInStorage) {
      navigate(`/${codeInStorage}/en`)
      return
    }

    if (geolocationData === undefined || isError) {
      setSelectCountryModalOpen(true)
      return
    }

    const countryCode =
      geolocationData.country_code.toLowerCase() as AllowedCountries
    if (countriesToSelectList.includes(countryCode)) {
      localStorageUtils.set(COUNTRY_CODE, countryCode)
      navigate(`/${countryCode}/en`)
    } else {
      setSelectCountryModalOpen(true)
    }
  }, [geolocationData, isError])

  if (isLoading) return <LoadingScreen />

  return (
    <React.Fragment>
      <SelectCountryModal
        open={selectCountryModalOpen}
        handleClose={handleSelectCountryModalClose}
        handleSave={handleSelectCountryModalSave}
      />
      <CountryNotListedModal
        open={countryNotListedModalOpen}
        handleContinue={handleCountryNotListedModalContinue}
        handleClose={handleCountryNotListedModalClose}
      />
      <FormSuccessModal
        open={formSuccessModalOpen}
        handleClose={handleFormSuccessModalClose}
        title="Added to waitlist!"
        text={
          <span>
            We’ve added you to our waiting list.
            <br />
            <br />
            As soon as we arrive in your area, we’ll send you an email to let
            you know!
          </span>
        }
      />
      <LandingPage country_code={""} />
    </React.Fragment>
  )
}

export default IndexPage
