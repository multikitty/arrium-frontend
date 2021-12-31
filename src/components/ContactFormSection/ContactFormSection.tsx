import { Grid } from "@mui/material"
import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { landingContactFormFormOptions } from "../../validation"
import {
  StyledContactFormSection,
  StyledContactFormSectionCard,
  StyledContactFormSectionCardLeftContainer,
  StyledContactFormSectionCardLeftContainerText,
  StyledContactFormSectionCardLeftContainerTitle,
  StyledContactFormSectionCardRightContainer,
  StyledContactFormSectionCardRightContainerField,
  StyledContactFormSectionCardRightContainerFieldHelperText,
  StyledContactFormSectionCardRightContainerSendButton,
  StyledContactFormSectionCardRightContainerSubTitle,
  StyledContactFormSectionCardRightContainerTitle,
} from "./ContactFormSection.styled"
import ContactFormSuccessModal from "../ContactFormSuccessModal"

const ContactFormSection = () => {
  const [isSuccessModalOpen, setSuccessModalOpen] = useState<boolean>(false)

  const handleSuccessModalOpen = () => setSuccessModalOpen(true)
  const handleSuccessModalClose = () => setSuccessModalOpen(false)

  const { handleSubmit, control, formState, reset } = useForm(
    landingContactFormFormOptions
  )

  type formPropType = typeof landingContactFormFormOptions.defaultValues

  const onSubmit = (data: formPropType) => {
    console.log(data)
    handleSuccessModalOpen()
    reset()
  }

  return (
    <StyledContactFormSection id="contact-us-section">
      <ContactFormSuccessModal
        open={isSuccessModalOpen}
        handleClose={handleSuccessModalClose}
      />
      <StyledContactFormSectionCard>
        <StyledContactFormSectionCardLeftContainer>
          <StyledContactFormSectionCardLeftContainerTitle>
            Talk to a Human{" "}
          </StyledContactFormSectionCardLeftContainerTitle>
          <StyledContactFormSectionCardLeftContainerText>
            At Arrium, your email isn’t going to disappear into a black hole,
            your live chat is going to go unanswered.
            <br />
            <br />
            We provide great customer service because it’s the kind of customer
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
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  <StyledContactFormSectionCardRightContainerFieldHelperText>
                    {formState.errors?.fullName?.message}
                  </StyledContactFormSectionCardRightContainerFieldHelperText>
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
                  <StyledContactFormSectionCardRightContainerFieldHelperText>
                    {formState.errors?.email?.message}
                  </StyledContactFormSectionCardRightContainerFieldHelperText>
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
                  <StyledContactFormSectionCardRightContainerFieldHelperText>
                    {formState.errors?.question?.message}
                  </StyledContactFormSectionCardRightContainerFieldHelperText>
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
