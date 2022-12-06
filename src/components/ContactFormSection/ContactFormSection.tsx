import { Grid } from "@mui/material"
import React, { useState } from "react"
import { Controller, SubmitErrorHandler, useForm } from "react-hook-form"
import landingContactOptions from "@/validation/landingContact"
import {
  StyledContactFormSection,
  StyledContactFormSectionCard,
  StyledContactFormSectionCardLeftContainer,
  StyledContactFormSectionCardLeftContainerText,
  StyledContactFormSectionCardLeftContainerTitle,
  StyledContactFormSectionCardRightContainer,
  StyledContactFormSectionCardRightContainerField,
  StyledContactFormSectionCardRightContainerSendButton,
  StyledContactFormSectionCardRightContainerSubTitle,
  StyledContactFormSectionCardRightContainerTitle,
} from "./ContactFormSection.styled"
import FormSuccessModal from "../FormSuccessModal"
import { LANDING_PAGE_IDS } from "@/constants/ids"
import { useSnackbar } from "notistack"
import { StyledHelperText } from "../commons/uiComponents"

const ContactFormSection = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [isSuccessModalOpen, setSuccessModalOpen] = useState<boolean>(false)

  const handleSuccessModalOpen = () => setSuccessModalOpen(true)
  const handleSuccessModalClose = () => setSuccessModalOpen(false)

  type FormPropType = typeof landingContactOptions.defaultValues
  const { handleSubmit, control, formState, reset } = useForm<FormPropType>(
    landingContactOptions
  )

  const onSubmit = (data: FormPropType) => {
    console.log("Contact Form Data: ", data)
    handleSuccessModalOpen()
    reset()
  }

  const onInvalid: SubmitErrorHandler<FormPropType> = data => {
    enqueueSnackbar(
      data.fullName?.message || data.email?.message || data.question?.message,
      { variant: "error" }
    )
  }

  return (
    <StyledContactFormSection id={LANDING_PAGE_IDS["contact-us-section"]}>
      <FormSuccessModal
        open={isSuccessModalOpen}
        handleClose={handleSuccessModalClose}
      />
      <StyledContactFormSectionCard>
        <StyledContactFormSectionCardLeftContainer>
          <StyledContactFormSectionCardLeftContainerTitle>
            Talk to a Human{" "}
          </StyledContactFormSectionCardLeftContainerTitle>
          <StyledContactFormSectionCardLeftContainerText>
            At Arrium, your email isn't going to disappear into a black hole,
            your live chat is going to go unanswered.
            <br />
            <br />
            We provide great customer service because it's the kind of customer
            service we expect to receive ourselves. So, we deliver it in the
            same way we expect it to receive it.
          </StyledContactFormSectionCardLeftContainerText>
        </StyledContactFormSectionCardLeftContainer>
        <StyledContactFormSectionCardRightContainer>
          <StyledContactFormSectionCardRightContainerTitle>
            Have a question?
          </StyledContactFormSectionCardRightContainerTitle>
          <StyledContactFormSectionCardRightContainerSubTitle>
            Get in touch and tell us how we can help
          </StyledContactFormSectionCardRightContainerSubTitle>
          <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
            <Grid container rowSpacing={3} columnSpacing={2}>
              <Grid item xs={12}>
                <Controller
                  name={"fullName"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <StyledContactFormSectionCardRightContainerField
                      placeholder="Full Name"
                      onChange={onChange}
                      value={value}
                      error={!!formState.errors?.fullName}
                    />
                  )}
                />
                {!!formState.errors?.fullName && (
                  <StyledHelperText>
                    {formState.errors?.fullName?.message}
                  </StyledHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name={"email"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <StyledContactFormSectionCardRightContainerField
                      type="email"
                      placeholder="Email Address"
                      onChange={onChange}
                      value={value}
                      error={!!formState.errors?.email}
                    />
                  )}
                />
                {!!formState.errors?.email && (
                  <StyledHelperText>
                    {formState.errors?.email?.message}
                  </StyledHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name={"question"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <StyledContactFormSectionCardRightContainerField
                      minRows={3}
                      multiline
                      placeholder="Your Question"
                      onChange={onChange}
                      value={value}
                      error={!!formState.errors?.question}
                    />
                  )}
                />
                {!!formState.errors?.question && (
                  <StyledHelperText>
                    {formState.errors?.question?.message}
                  </StyledHelperText>
                )}
              </Grid>
            </Grid>
            <StyledContactFormSectionCardRightContainerSendButton type="submit">
              Send
            </StyledContactFormSectionCardRightContainerSendButton>
          </form>
        </StyledContactFormSectionCardRightContainer>
      </StyledContactFormSectionCard>
    </StyledContactFormSection>
  )
}

export default ContactFormSection
