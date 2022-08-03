import * as React from "react"
import LandingPage from "@/components/LandingPage"
import SelectCountryModal from "@/components/SelectCountryModal"
import { navigate } from "gatsby-link"
import { localStorageUtils } from "@/utils"

const IndexPage = () => {
  const [selectCountryModalOpen, setSelectCountryModalOpen] =
    React.useState(true)

  const handleSelectCountryModalSave = (country: string) => {
    localStorageUtils.setLocalStorage("country", country)
    navigate(`/${country}/en`)
  }
  const handleSelectCountryModalClose = () => {
    setSelectCountryModalOpen(false)
  }

  return (
    <React.Fragment>
      <SelectCountryModal
        open={selectCountryModalOpen}
        handleClose={handleSelectCountryModalClose}
        handleSave={handleSelectCountryModalSave}
      />
      <LandingPage />
    </React.Fragment>
  )
}

export default IndexPage
