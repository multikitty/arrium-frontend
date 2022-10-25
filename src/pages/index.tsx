import * as React from "react"
import LandingPage from "@/components/LandingPage"
import SelectCountryModal from "@/components/SelectCountryModal"
import CountryNotListedModal from "@/components/CountryNotListedModal"
import { navigate } from "gatsby-link"
import { scroller } from "react-scroll"
import { useGeolocation } from "@/agent/geolocation"
import LoadingScreen from "@/components/LoadingScreen"
import { countriesToSelectList } from "@/constants/common"
import { localStorageUtils } from "@/utils"
import { COUNTRY_CODE } from "@/constants/localStorage"

const IndexPage = () => {
  const [selectCountryModalOpen, setSelectCountryModalOpen] =
    React.useState(false)
  const [countryNotListedModalOpen, setCountryNotListedModalOpen] =
    React.useState(false)
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

  const handleSelectCountryModalSave = () => {
    handleSelectCountryModalClose()
    handleCountryNotListedModalOpen()
  }

  const handleCountryNotListedModalContinue = () => {
    handleCountryNotListedModalClose()
    navigate("/gb/en")
    scroller.scrollTo("contact-us-section", {
      delay: 300,
      offset: -150,
      spy: true,
      smooth: true,
    })
  }

  React.useEffect(() => {
    const codeInStorage = localStorageUtils.get(COUNTRY_CODE)
    if (codeInStorage) {
      navigate(`/${codeInStorage}/en`)
      return
    }
    if (!geolocationData) return
    if (
      countriesToSelectList.includes(geolocationData.country_code.toLowerCase())
    ) {
      const countryCode = geolocationData.country_code.toLowerCase()
      localStorageUtils.set(COUNTRY_CODE, countryCode)
      navigate(`/${countryCode}/en`)
    } else setSelectCountryModalOpen(true)

    if (isError) setSelectCountryModalOpen(true)
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
      />
      <LandingPage country_code={""} lang={""} />
    </React.Fragment>
  )
}

export default IndexPage
