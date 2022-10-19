import * as React from "react"
import LandingPage from "@/components/LandingPage"
import SelectCountryModal from "@/components/SelectCountryModal"
import CountryNotListedModal from "@/components/CountryNotListedModal"
import { navigate } from "gatsby-link"
import { scroller } from "react-scroll"
import { useGeolocation } from "@/agent/geolocation"
import LoadingScreen from "@/components/LoadingScreen"
import { countriesToSelectList } from "@/constants/common"

const IndexPage = () => {
  const [selectCountryModalOpen, setSelectCountryModalOpen] =
    React.useState(false)
  const [countryNotListedModalOpen, setCountryNotListedModalOpen] =
    React.useState(false)
  const { data: geolocationData, isLoading } = useGeolocation()

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
    if (!geolocationData) return
    if (
      countriesToSelectList.includes(
        geolocationData.country_code2.toLowerCase()
      )
    ) {
      navigate(`/${geolocationData.country_code2.toLowerCase()}/en`)
      return
    }
    setSelectCountryModalOpen(true)
  }, [geolocationData])

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
