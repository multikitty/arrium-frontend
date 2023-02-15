import React from "react"
import { rem } from "polished"
import {
  StyledCountryNotListedModal,
  StyledCountryNotListedModalFormActions,
  StyledCountryNotListedModalTitle,
  StyledCountryNotListedModalSubTitle,
  StyledCountryNotListedModalBrandLogoContainer,
  StyledCountryNotListedModalBrandLogo,
  StyledCountryNotListedModalIllustrationContainer,
  StyledCountryNotListedModalIllustration,
  StyledModal,
  StyledCountryNotListedModalWaitingListTitle,
  StyledCountryNotListedModalWaitingListSubTitle,
} from "./CountryNotListedModal.styled"
import { ContainedButton } from "@/components/commons/Button"
import brandLogo from "@/assets/icons/arrium_logo.png"
import selectYourCountryImage from "@/assets/icons/landing-select_your_country.svg"
import { Box, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import countryNotListedOptions from "@/validation/countryNotListed"
import { useForm } from "react-hook-form"
import HelperText from "@/components/commons/HelperText"
import InputField from "@/components/commons/InputField"

interface CountryNotListedModalProps {
  open: boolean
  handleContinue: () => void
  handleClose: () => void
}

const CountryNotListedModal = (props: CountryNotListedModalProps) => {
  type FormProps = typeof countryNotListedOptions.defaultValues

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>(countryNotListedOptions)

  const onSubmit = (data: FormProps) => {
    console.log("Country Not Listed Modal Form Data", data)
    props.handleContinue()
  }

  return (
    <StyledModal open={props.open}>
      <StyledCountryNotListedModal countryNotListed>
        <IconButton
          sx={{ position: "absolute", top: 16, right: 16 }}
          size="small"
          onClick={props.handleClose}
        >
          <CloseIcon sx={{ fontSize: 16 }} />
        </IconButton>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <StyledCountryNotListedModalBrandLogoContainer>
            <StyledCountryNotListedModalBrandLogo src={brandLogo} />
          </StyledCountryNotListedModalBrandLogoContainer>
          <StyledCountryNotListedModalTitle deleteConfirmation selectCountry>
            Sit Tight! We're Coming Soon!
          </StyledCountryNotListedModalTitle>
          <StyledCountryNotListedModalSubTitle>
            Our team is working tirelessly to bring our services to your
            location.
          </StyledCountryNotListedModalSubTitle>
          <StyledCountryNotListedModalIllustrationContainer>
            <StyledCountryNotListedModalIllustration
              src={selectYourCountryImage}
            />
          </StyledCountryNotListedModalIllustrationContainer>
          <StyledCountryNotListedModalWaitingListTitle>
            Sign up to our Waiting List
          </StyledCountryNotListedModalWaitingListTitle>
          <StyledCountryNotListedModalWaitingListSubTitle>
            Enter your email address below and we'll let you know when we've
            arrived in your area.
          </StyledCountryNotListedModalWaitingListSubTitle>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{ marginBottom: rem("40px") }}
          >
            <InputField
              {...register("email")}
              isCentered
              centerInput
              mb="0"
              maxWidth="410px"
              minWidth="410px"
              placeholder="Email Address"
              variant="outlined"
              error={!!errors.email}
            />
            {errors.email && (
              <HelperText isCentered maxWidth="410px" minWidth="410px">
                {errors.email.message}
              </HelperText>
            )}
          </Box>
          <StyledCountryNotListedModalFormActions>
            <ContainedButton
              autoFocus
              sx={{
                width: "90%",
                margin: "0 auto",
                marginBottom: rem("16px"),
              }}
              type="submit"
            >
              Submit
            </ContainedButton>
          </StyledCountryNotListedModalFormActions>
        </Box>
      </StyledCountryNotListedModal>
    </StyledModal>
  )
}

export default CountryNotListedModal
