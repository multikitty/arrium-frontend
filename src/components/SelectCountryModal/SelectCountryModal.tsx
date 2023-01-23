import React from "react"
import { Modal } from "@mui/material"
import { rem } from "polished"
import {
  StyledSelectCountryModal,
  StyledSelectCountryModalBrandLogo,
  StyledSelectCountryModalBrandLogoContainer,
  StyledSelectCountryModalForm,
  StyledSelectCountryModalFormActions,
  StyledSelectCountryModalSubTitle,
  StyledSelectCountryModalTitle,
} from "./SelectCountryModal.styled"
import { ContainedButton } from "../commons/Button"
import { navigate } from "gatsby-link"
import { localStorageUtils } from "@/utils"
import brandLogo from "@/assets/icons/arrium_logo.svg"
import { COUNTRY_CODE } from "@/constants/localStorage"
import SubDirCountrySelect from "../SubDirCountrySelect"
import { DEFAULT_COUNTRY } from "@/constants/common"

interface SelectCountryModalProps {
  open: boolean
  handleClose: () => void
  handleSave: () => void
}

const SelectCountryModal = (props: SelectCountryModalProps) => {
  const [selectedCountry, setSelectedCountry] = React.useState<string | null>(
    "GB"
  )

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedCountry === "") return props.handleSave()
    localStorageUtils.set(
      COUNTRY_CODE,
      selectedCountry?.toLowerCase() || DEFAULT_COUNTRY
    )
    navigate(`/${selectedCountry?.toLowerCase() || DEFAULT_COUNTRY}/en`)
  }

  return (
    <Modal open={props.open}>
      <StyledSelectCountryModal>
        <StyledSelectCountryModalBrandLogoContainer>
          <StyledSelectCountryModalBrandLogo src={brandLogo} />
        </StyledSelectCountryModalBrandLogoContainer>
        <StyledSelectCountryModalTitle deleteConfirmation selectCountry>
          Select your country
        </StyledSelectCountryModalTitle>
        <StyledSelectCountryModalSubTitle>
          We couldn't identify which country you're visiting us from. Please
          choose your country in order to serve you better
        </StyledSelectCountryModalSubTitle>
        <StyledSelectCountryModalForm onSubmit={handleSave}>
          <SubDirCountrySelect
            isCountryNotListed
            country={selectedCountry}
            onChange={e => setSelectedCountry(e.target.value)}
            boxProps={{
              display: "flex",
              mb: rem("40px"),
              mx: "auto",
              maxWidth: rem("408px"),
            }}
          />
          <StyledSelectCountryModalFormActions>
            <ContainedButton
              disabled={selectedCountry === null}
              sx={{ width: "100%", marginBottom: rem("16px") }}
              type="submit"
            >
              Continue
            </ContainedButton>
          </StyledSelectCountryModalFormActions>
        </StyledSelectCountryModalForm>
      </StyledSelectCountryModal>
    </Modal>
  )
}

export default SelectCountryModal
