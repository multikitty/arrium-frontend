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

interface IProps {
  location: string
  date: string
  time: string
  pay: number
  fromNow: string
}

const BlockAcceptNotification = (props: IProps) => {
  return (
    <StyledBlockAcceptNotification>
      <StyledBlockAcceptNotificationUpperContainer>
        <StyledBlockAcceptNotificationUpperContainerTitle>
          Block accepted
        </StyledBlockAcceptNotificationUpperContainerTitle>
        <StyledBlockAcceptNotificationUpperContainerDismissButton>
          Dismiss
        </StyledBlockAcceptNotificationUpperContainerDismissButton>
      </StyledBlockAcceptNotificationUpperContainer>
      <StyledBlockAcceptNotificationItem>
        <StyledBlockAcceptNotificationItemTitle>
          Location:
        </StyledBlockAcceptNotificationItemTitle>
        <StyledBlockAcceptNotificationItemValue>
          {props.location}
        </StyledBlockAcceptNotificationItemValue>
      </StyledBlockAcceptNotificationItem>
      <StyledBlockAcceptNotificationItem>
        <StyledBlockAcceptNotificationItemTitle>
          Date:
        </StyledBlockAcceptNotificationItemTitle>
        <StyledBlockAcceptNotificationItemValue>
          {props.date}
        </StyledBlockAcceptNotificationItemValue>
      </StyledBlockAcceptNotificationItem>
      <StyledBlockAcceptNotificationItem>
        <StyledBlockAcceptNotificationItemTitle>
          Time:
        </StyledBlockAcceptNotificationItemTitle>
        <StyledBlockAcceptNotificationItemValue>
          {props.time}
        </StyledBlockAcceptNotificationItemValue>
      </StyledBlockAcceptNotificationItem>
      <StyledBlockAcceptNotificationItem>
        <StyledBlockAcceptNotificationItemTitle>
          Pay:
        </StyledBlockAcceptNotificationItemTitle>
        <StyledBlockAcceptNotificationItemValue>
          &#163;{props.pay}
        </StyledBlockAcceptNotificationItemValue>
      </StyledBlockAcceptNotificationItem>
      <StyledBlockAcceptNotificationBottomContainer>
        {props.fromNow}
      </StyledBlockAcceptNotificationBottomContainer>
    </StyledBlockAcceptNotification>
  )
}

export default BlockAcceptNotification
