import { rem } from "polished"
import styled from "styled-components"
import { StyledBenefitsSectionHeader } from "../BenefitsSection/BenefitsSection.styled"

export const StyledWorkingSection = styled.div`
  background: #ffffff;
  max-width: ${p => p.theme.sizes.container};
  width: 100%;
  margin: 0 auto;
  margin-bottom: ${rem("80px")};
`

export const StyledWorkingSectionHeader = styled(StyledBenefitsSectionHeader)``

export const StyledWorkingSectionEnterPreferencesCard = styled.div`
  background: #e6f3f9;
  height: ${rem("380px")};
  border-radius: ${rem("40px")};
  display: flex;
  overflow: hidden;
`

export const StyledWorkingSectionEnterPreferencesCardContent = styled.div`
  padding-top: ${rem("50px")};
  padding-left: ${rem("72px")};
  padding-bottom: ${rem("136px")};
`

export const StyledWorkingSectionEnterPreferencesCardNumber = styled.h4`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: ${rem("72px")};
  line-height: ${rem("87px")};
  margin-bottom: ${rem("12px")};

  color: #b6dde5;
`

export const StyledWorkingSectionEnterPreferencesCardTitle = styled.h3`
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: ${rem("32px")};
  line-height: ${rem("39px")};
  margin-bottom: ${rem("12px")};

  color: ${p => p.theme.palette.blackText};
`

export const StyledWorkingSectionEnterPreferencesCardText = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("18px")};
  line-height: ${rem("22px")};
  margin-bottom: ${rem("12px")};

  color: ${p => p.theme.palette.blackText};
`

export const StyledWorkingSectionEnterPreferencesCardImage = styled.img`
  width: ${rem("837px")};
  margin-left: ${rem("72px")};
  margin-top: ${rem("32px")};
  filter: drop-shadow(-6.54802px 8.18502px 26.1921px rgba(5, 23, 51, 0.05));
`

export const StyledWorkingSectionStartButtonCard = styled(
  StyledWorkingSectionEnterPreferencesCard
)`
  background-color: #e6f9ef;
  height: ${rem("712px")};
  display: block;
  position: relative;
`

export const StyledWorkingSectionStartButtonCardContent = styled(
  StyledWorkingSectionEnterPreferencesCardContent
)`
  padding-bottom: ${rem("69px")};
  max-width: ${rem("445px")};
`

export const StyledWorkingSectionStartButtonCardNumber = styled(
  StyledWorkingSectionEnterPreferencesCardNumber
)`
  color: #afe5c4;
`

export const StyledWorkingSectionStartButtonCardTitle = styled(
  StyledWorkingSectionEnterPreferencesCardTitle
)``

export const StyledWorkingSectionStartButtonCardText = styled(
  StyledWorkingSectionEnterPreferencesCardText
)``

export const StyledWorkingSectionStartButtonCardImageContainer = styled.div`
  position: absolute;
  top: ${rem("335px")};
  right: 0;
  width: ${rem("1002px")};
  display: flex;
  justify-content: flex-end;
`

export const StyledWorkingSectionStartButtonCardImage = styled(
  StyledWorkingSectionEnterPreferencesCardImage
)`
  max-width: 100%;
`

export const StyledWorkingSectionOffersCard = styled(
  StyledWorkingSectionEnterPreferencesCard
)`
  background-color: #efeafe;
  height: ${rem("712px")};
  display: block;
  position: relative;
`

export const StyledWorkingSectionOffersCardContent = styled(
  StyledWorkingSectionEnterPreferencesCardContent
)`
  padding-bottom: ${rem("52px")};
  max-width: ${rem("477px")};
`

export const StyledWorkingSectionOffersCardNumber = styled(
  StyledWorkingSectionEnterPreferencesCardNumber
)`
  color: #cebffc;
`

export const StyledWorkingSectionOffersCardTitle = styled(
  StyledWorkingSectionEnterPreferencesCardTitle
)``

export const StyledWorkingSectionOffersCardRightImageContainer = styled.div`
  position: absolute;
  left: ${rem("148px")};
  bottom: ${rem("95px")};
  display: flex;
  justify-content: flex-start;
  z-index: 2;
`

export const StyledWorkingSectionOffersCardRightImage = styled(
  StyledWorkingSectionEnterPreferencesCardImage
)`
  width: ${rem("826px")};
  max-width: 100%;
  margin-left: 0;
`

export const StyledWorkingSectionOffersCardLeftImageContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: ${rem("273px")};
  display: flex;
  justify-content: flex-start;
  z-index: 3;
`

export const StyledWorkingSectionOffersCardLeftImage = styled(
  StyledWorkingSectionEnterPreferencesCardImage
)`
  max-width: 100%;
  margin-left: 0;
`

export const StyledWorkingSectionNotificationsCard = styled(
  StyledWorkingSectionEnterPreferencesCard
)`
  background-color: #e8efff;
  height: ${rem("380px")};
  display: flex;
  position: relative;
`

export const StyledWorkingSectionNotificationsCardContent = styled(
  StyledWorkingSectionEnterPreferencesCardContent
)`
  padding-bottom: ${rem("75px")};
  max-width: ${rem("588px")};
`

export const StyledWorkingSectionNotificationsCardNumber = styled(
  StyledWorkingSectionEnterPreferencesCardNumber
)`
  color: #b1c9fb;
`

export const StyledWorkingSectionNotificationsCardTitle = styled(
  StyledWorkingSectionEnterPreferencesCardTitle
)``

export const StyledWorkingSectionNotificationsCardText = styled(
  StyledWorkingSectionEnterPreferencesCardText
)``

export const StyledWorkingSectionNotificationsCardTopImageContainer = styled.div`
  position: absolute;
  top: ${rem("70px")};
  right: ${rem("126px")};
  display: flex;
  justify-content: flex-end;
  z-index: 3;
`

export const StyledWorkingSectionNotificationsCardTopImage = styled(
  StyledWorkingSectionEnterPreferencesCardImage
)`
  width: ${rem("270px")};
  max-width: 100%;
  margin-left: 0;
`

export const StyledWorkingSectionNotificationsCardBottomImageContainer = styled.div`
  margin-top: ${rem("153px")};
  margin-left: ${rem("67px")};
  display: flex;
  justify-content: flex-start;
  z-index: 2;
`

export const StyledWorkingSectionNotificationsCardBottomImage = styled(
  StyledWorkingSectionEnterPreferencesCardImage
)`
  max-width: 100%;
  margin-left: 0;
`
