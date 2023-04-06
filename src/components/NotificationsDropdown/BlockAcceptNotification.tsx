import React from "react"
import {
  StyledBlockAcceptNotification,
  StyledBlockAcceptNotificationBottomContainer,
  StyledBlockAcceptNotificationItem,
  StyledBlockAcceptNotificationItemTitle,
  StyledBlockAcceptNotificationItemValue,
  StyledBlockAcceptNotificationUpperContainer,
  StyledBlockAcceptNotificationUpperContainerDismissButton,
  StyledBlockAcceptNotificationUpperContainerTitle,
} from "./NotificationsDropdown.styled"
import { BlockAcceptNotificationProps } from "./NotificationsDropdown.types"

const BlockAcceptNotification: React.FC<BlockAcceptNotificationProps> = ({
  date,
  fromNow,
  location,
  pay,
  time,
  onDismiss,
}) => {
  return (
    <StyledBlockAcceptNotification>
      <StyledBlockAcceptNotificationUpperContainer>
        <StyledBlockAcceptNotificationUpperContainerTitle>
          Block accepted
        </StyledBlockAcceptNotificationUpperContainerTitle>
        <StyledBlockAcceptNotificationUpperContainerDismissButton onClick={onDismiss}>
          Dismiss
        </StyledBlockAcceptNotificationUpperContainerDismissButton>
      </StyledBlockAcceptNotificationUpperContainer>
      <StyledBlockAcceptNotificationItem>
        <StyledBlockAcceptNotificationItemTitle>
          Location:
        </StyledBlockAcceptNotificationItemTitle>
        <StyledBlockAcceptNotificationItemValue>
          {location}
        </StyledBlockAcceptNotificationItemValue>
      </StyledBlockAcceptNotificationItem>
      <StyledBlockAcceptNotificationItem>
        <StyledBlockAcceptNotificationItemTitle>
          Date:
        </StyledBlockAcceptNotificationItemTitle>
        <StyledBlockAcceptNotificationItemValue>
          {date}
        </StyledBlockAcceptNotificationItemValue>
      </StyledBlockAcceptNotificationItem>
      <StyledBlockAcceptNotificationItem>
        <StyledBlockAcceptNotificationItemTitle>
          Time:
        </StyledBlockAcceptNotificationItemTitle>
        <StyledBlockAcceptNotificationItemValue>
          {time}
        </StyledBlockAcceptNotificationItemValue>
      </StyledBlockAcceptNotificationItem>
      <StyledBlockAcceptNotificationItem>
        <StyledBlockAcceptNotificationItemTitle>
          Pay:
        </StyledBlockAcceptNotificationItemTitle>
        <StyledBlockAcceptNotificationItemValue>
          &#163;{pay}
        </StyledBlockAcceptNotificationItemValue>
      </StyledBlockAcceptNotificationItem>
      <StyledBlockAcceptNotificationBottomContainer>
        {fromNow}
      </StyledBlockAcceptNotificationBottomContainer>
    </StyledBlockAcceptNotification>
  )
}

export default BlockAcceptNotification
