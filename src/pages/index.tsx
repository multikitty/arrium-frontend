import * as React from "react"
import LandingPage from "@/components/LandingPage"
import SelectCountryModal from "@/components/SelectCountryModal"
import CountryNotListedModal from "@/components/CountryNotListedModal"
import { navigate } from "gatsby-link"
import { scroller } from "react-scroll"

const IndexPage = () => {
  const [selectCountryModalOpen, setSelectCountryModalOpen] =
    React.useState(true)
  const [countryNotListedModalOpen, setCountryNotListedModalOpen] =
    React.useState(false)

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
      <LandingPage />
    </React.Fragment>
  )
}

export default IndexPage
