import { Grid } from "@mui/material"
import React from "react"
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

const ContactFormSection = () => {
  return (
    <StyledContactFormSection id="contact-us-section">
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
          <Grid container rowSpacing={3} columnSpacing={2}>
            <Grid item xs={12} md={6}>
              <StyledContactFormSectionCardRightContainerField placeholder="First Name" />
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledContactFormSectionCardRightContainerField placeholder="SurName" />
            </Grid>
            <Grid item xs={12}>
              <StyledContactFormSectionCardRightContainerField
                type="email"
                placeholder="Email Address"
              />
            </Grid>
            <Grid item xs={12}>
              <StyledContactFormSectionCardRightContainerField
                minRows={3}
                multiline
                type="email"
                placeholder="Your Question"
              />
            </Grid>
          </Grid>
          <StyledContactFormSectionCardRightContainerSendButton>
            Send
          </StyledContactFormSectionCardRightContainerSendButton>
        </StyledContactFormSectionCardRightContainer>
      </StyledContactFormSectionCard>
    </StyledContactFormSection>
  )
}

export default ContactFormSection
