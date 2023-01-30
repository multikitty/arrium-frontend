import React from "react"
import {
  StyledWorkingSection,
  StyledWorkingSectionEnterPreferencesCard,
  StyledWorkingSectionEnterPreferencesCardContent,
  StyledWorkingSectionEnterPreferencesCardImage,
  StyledWorkingSectionEnterPreferencesCardNumber,
  StyledWorkingSectionEnterPreferencesCardText,
  StyledWorkingSectionEnterPreferencesCardTitle,
  StyledWorkingSectionHeader,
  StyledWorkingSectionNotificationsCard,
  StyledWorkingSectionNotificationsCardBottomImage,
  StyledWorkingSectionNotificationsCardBottomImageContainer,
  StyledWorkingSectionNotificationsCardContent,
  StyledWorkingSectionNotificationsCardNumber,
  StyledWorkingSectionNotificationsCardText,
  StyledWorkingSectionNotificationsCardTitle,
  StyledWorkingSectionNotificationsCardTopImage,
  StyledWorkingSectionNotificationsCardTopImageContainer,
  StyledWorkingSectionOffersCard,
  StyledWorkingSectionOffersCardContent,
  StyledWorkingSectionOffersCardLeftImage,
  StyledWorkingSectionOffersCardLeftImageContainer,
  StyledWorkingSectionOffersCardNumber,
  StyledWorkingSectionOffersCardRightImage,
  StyledWorkingSectionOffersCardRightImageContainer,
  StyledWorkingSectionOffersCardTitle,
  StyledWorkingSectionStartButtonCard,
  StyledWorkingSectionStartButtonCardContent,
  StyledWorkingSectionStartButtonCardImage,
  StyledWorkingSectionStartButtonCardImageContainer,
  StyledWorkingSectionStartButtonCardNumber,
  StyledWorkingSectionStartButtonCardText,
  StyledWorkingSectionStartButtonCardTitle,
} from "./WorkingSection.styled"
import { Grid, useMediaQuery } from "@mui/material"
import enterYourPreferencesImage from "@/assets/images/landing-working-01_enter_your_preferences.png"
import startButtonImage from "@/assets/images/landing-working-02_press_the_start_button.png"
import offersRightImage from "@/assets/images/landing-working-03_offers_that_match-right.png"
import offersLeftImage from "@/assets/images/landing-working-03_offers_that_match-left.png"
import notificationsTopImage from "@/assets/images/landing-working-04_notifications-top.png"
import notificationsBottomImage from "@/assets/images/landing-working-04_notifications-bottom.png"
import { devices } from "@/constants/device"

const WorkingSection = () => {
  const isWebView = useMediaQuery(devices.web.up)

  return (
    <StyledWorkingSection id="how-it-works-section">
      <StyledWorkingSectionHeader>How Arrium Works</StyledWorkingSectionHeader>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledWorkingSectionEnterPreferencesCard>
            <StyledWorkingSectionEnterPreferencesCardContent>
              <StyledWorkingSectionEnterPreferencesCardNumber>
                01
              </StyledWorkingSectionEnterPreferencesCardNumber>
              <StyledWorkingSectionEnterPreferencesCardTitle>
                Enter your preferences
              </StyledWorkingSectionEnterPreferencesCardTitle>
              <StyledWorkingSectionEnterPreferencesCardText>
                Enter your preferences for the days, times and locations that
                you want to work
              </StyledWorkingSectionEnterPreferencesCardText>
            </StyledWorkingSectionEnterPreferencesCardContent>
            <StyledWorkingSectionEnterPreferencesCardImage
              src={enterYourPreferencesImage}
            />
          </StyledWorkingSectionEnterPreferencesCard>
        </Grid>
        <Grid item xs={isWebView ? 6 : 12}>
          <StyledWorkingSectionStartButtonCard>
            <StyledWorkingSectionStartButtonCardContent>
              <StyledWorkingSectionStartButtonCardNumber>
                02
              </StyledWorkingSectionStartButtonCardNumber>
              <StyledWorkingSectionStartButtonCardTitle>
                Press the start button
              </StyledWorkingSectionStartButtonCardTitle>
              <StyledWorkingSectionStartButtonCardText>
                When you press the Start button, Arrium will immediately begin
                prowling your Offers page for blocks that meet your
                availability.
              </StyledWorkingSectionStartButtonCardText>
            </StyledWorkingSectionStartButtonCardContent>
            <StyledWorkingSectionStartButtonCardImageContainer>
              <StyledWorkingSectionStartButtonCardImage
                src={startButtonImage}
              />
            </StyledWorkingSectionStartButtonCardImageContainer>
          </StyledWorkingSectionStartButtonCard>
        </Grid>
        <Grid item xs={isWebView ? 6 : 12}>
          <StyledWorkingSectionOffersCard>
            <StyledWorkingSectionOffersCardContent>
              <StyledWorkingSectionOffersCardNumber>
                03
              </StyledWorkingSectionOffersCardNumber>
              <StyledWorkingSectionOffersCardTitle>
                Arrium will check for offers that match
              </StyledWorkingSectionOffersCardTitle>
            </StyledWorkingSectionOffersCardContent>
            <StyledWorkingSectionOffersCardRightImageContainer>
              <StyledWorkingSectionOffersCardRightImage
                src={offersRightImage}
              />
            </StyledWorkingSectionOffersCardRightImageContainer>
            <StyledWorkingSectionOffersCardLeftImageContainer>
              <StyledWorkingSectionOffersCardLeftImage src={offersLeftImage} />
            </StyledWorkingSectionOffersCardLeftImageContainer>
          </StyledWorkingSectionOffersCard>
        </Grid>
        <Grid item xs={12}>
          <StyledWorkingSectionNotificationsCard>
            <StyledWorkingSectionNotificationsCardContent>
              <StyledWorkingSectionNotificationsCardNumber>
                04
              </StyledWorkingSectionNotificationsCardNumber>
              <StyledWorkingSectionNotificationsCardTitle>
                You will receive a notification when a block has been accepted
              </StyledWorkingSectionNotificationsCardTitle>
              <StyledWorkingSectionNotificationsCardText>
                When Arrium see’s these blocks, in your Offers page, it’ll
                auto-accept the blocks, and send you an email and SMS
                notification.
              </StyledWorkingSectionNotificationsCardText>
            </StyledWorkingSectionNotificationsCardContent>
            <StyledWorkingSectionNotificationsCardTopImageContainer>
              <StyledWorkingSectionNotificationsCardTopImage
                src={notificationsTopImage}
              />
            </StyledWorkingSectionNotificationsCardTopImageContainer>
            <StyledWorkingSectionNotificationsCardBottomImageContainer>
              <StyledWorkingSectionNotificationsCardBottomImage
                src={notificationsBottomImage}
              />
            </StyledWorkingSectionNotificationsCardBottomImageContainer>
          </StyledWorkingSectionNotificationsCard>
        </Grid>
      </Grid>
    </StyledWorkingSection>
  )
}

export default WorkingSection
