import { Grid } from "@mui/material"
import React from "react"
import {
  StyledBenefitsSection,
  StyledBenefitsSectionCard,
  StyledBenefitsSectionCardContainer,
  StyledBenefitsSectionCardIcon,
  StyledBenefitsSectionCardText,
  StyledBenefitsSectionCardTitle,
  StyledBenefitsSectionHeader,
} from "./BenefitsSection.styled"
import dailyScheduleIcon from "../../assets/icons/landing-benefits_section-daily_schedule.svg"
import autoSearchIcon from "../../assets/icons/landing-benefits_section-auto_search.svg"
import notificationsIcon from "../../assets/icons/landing-benefits_section-notifications.svg"
import saveYouTimeIcon from "../../assets/icons/landing-benefits_section-save_you_time.svg"
import moreDaysOffIcon from "../../assets/icons/landing-benefits_section-more_days_off.svg"
import driveSafelyIcon from "../../assets/icons/landing-benefits_section-drive_safely.svg"
import safeAndSecureIcon from "../../assets/icons/landing-benefits_section-safe_and_secure.svg"
import earnMoreIcon from "../../assets/icons/landing-benefits_section-earn_more.svg"

const BenefitsSection = () => {
  return (
    <StyledBenefitsSection id="benefits-section">
      <StyledBenefitsSectionHeader>
        The Amazing Benefits
      </StyledBenefitsSectionHeader>
      <Grid container spacing={3}>
        <StyledBenefitsSectionCardContainer>
          <StyledBenefitsSectionCard>
            <StyledBenefitsSectionCardIcon>
              <img src={dailyScheduleIcon} />
            </StyledBenefitsSectionCardIcon>
            <StyledBenefitsSectionCardTitle>
              Daily Schedule
            </StyledBenefitsSectionCardTitle>
            <StyledBenefitsSectionCardText>
              Set your availability for each day including the minimum amount
              you want to earn
            </StyledBenefitsSectionCardText>
          </StyledBenefitsSectionCard>
        </StyledBenefitsSectionCardContainer>

        <StyledBenefitsSectionCardContainer>
          <StyledBenefitsSectionCard>
            <StyledBenefitsSectionCardIcon>
              <img src={autoSearchIcon} />
            </StyledBenefitsSectionCardIcon>
            <StyledBenefitsSectionCardTitle>
              Auto Search + Accept
            </StyledBenefitsSectionCardTitle>
            <StyledBenefitsSectionCardText>
              We'll scan your app for blocks and accept blocks that match you're
              your preferences
            </StyledBenefitsSectionCardText>
          </StyledBenefitsSectionCard>
        </StyledBenefitsSectionCardContainer>

        <StyledBenefitsSectionCardContainer>
          <StyledBenefitsSectionCard>
            <StyledBenefitsSectionCardIcon>
              <img src={notificationsIcon} />
            </StyledBenefitsSectionCardIcon>
            <StyledBenefitsSectionCardTitle>
              Notifications
            </StyledBenefitsSectionCardTitle>
            <StyledBenefitsSectionCardText>
              We'll send you a message when a blocks been accepted by email and
              SMS so you know immediately you're booked for a driving slot
            </StyledBenefitsSectionCardText>
          </StyledBenefitsSectionCard>
        </StyledBenefitsSectionCardContainer>

        <StyledBenefitsSectionCardContainer>
          <StyledBenefitsSectionCard>
            <StyledBenefitsSectionCardIcon>
              <img src={saveYouTimeIcon} />
            </StyledBenefitsSectionCardIcon>
            <StyledBenefitsSectionCardTitle>
              Save you time
            </StyledBenefitsSectionCardTitle>
            <StyledBenefitsSectionCardText>
              Spend time on things you'd rather be doing, rather than sitting at
              your phone pressing the “refresh” button, hoping to get the block
              you want
            </StyledBenefitsSectionCardText>
          </StyledBenefitsSectionCard>
        </StyledBenefitsSectionCardContainer>

        <StyledBenefitsSectionCardContainer>
          <StyledBenefitsSectionCard>
            <StyledBenefitsSectionCardIcon>
              <img src={moreDaysOffIcon} />
            </StyledBenefitsSectionCardIcon>
            <StyledBenefitsSectionCardTitle>
              More days off
            </StyledBenefitsSectionCardTitle>
            <StyledBenefitsSectionCardText>
              Complete all your blocks across a couple days, rather than a
              couple blocks everyday
            </StyledBenefitsSectionCardText>
          </StyledBenefitsSectionCard>
        </StyledBenefitsSectionCardContainer>

        <StyledBenefitsSectionCardContainer>
          <StyledBenefitsSectionCard>
            <StyledBenefitsSectionCardIcon>
              <img src={driveSafelyIcon} />
            </StyledBenefitsSectionCardIcon>
            <StyledBenefitsSectionCardTitle>
              Drive safely
            </StyledBenefitsSectionCardTitle>
            <StyledBenefitsSectionCardText>
              Arrium can still check for blocks, even when you're using your app
              to do your deliveries
            </StyledBenefitsSectionCardText>
          </StyledBenefitsSectionCard>
        </StyledBenefitsSectionCardContainer>

        <StyledBenefitsSectionCardContainer>
          <StyledBenefitsSectionCard>
            <StyledBenefitsSectionCardIcon>
              <img src={safeAndSecureIcon} />
            </StyledBenefitsSectionCardIcon>
            <StyledBenefitsSectionCardTitle>
              Safe and secure
            </StyledBenefitsSectionCardTitle>
            <StyledBenefitsSectionCardText>
              Arrium works in a safe and secure way because we've got you logged
              into the app on this end - you're just controlling the app on your
              end, through Arrium
            </StyledBenefitsSectionCardText>
          </StyledBenefitsSectionCard>
        </StyledBenefitsSectionCardContainer>

        <StyledBenefitsSectionCardContainer>
          <StyledBenefitsSectionCard>
            <StyledBenefitsSectionCardIcon>
              <img src={earnMoreIcon} />
            </StyledBenefitsSectionCardIcon>
            <StyledBenefitsSectionCardTitle>
              Earn more
            </StyledBenefitsSectionCardTitle>
            <StyledBenefitsSectionCardText>
              Work the maximum hours available as a driver, to reap the maximum
              potential earnings
            </StyledBenefitsSectionCardText>
          </StyledBenefitsSectionCard>
        </StyledBenefitsSectionCardContainer>
      </Grid>
    </StyledBenefitsSection>
  )
}

export default BenefitsSection
