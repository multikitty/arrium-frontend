import { Divider, IconButton } from "@mui/material"
import React from "react"
import {
  StyledFullscreenMenuNotifications,
  StyledFullscreenMenuNotificationsList,
  StyledFullscreenMenuNotificationsListItem,
  StyledFullscreenMenuNotificationsUpperContainer,
  StyledFullscreenMenuNotificationsUpperContainerDismissButton,
  StyledFullscreenMenuNotificationsUpperContainerTitle,
} from "./FullscreenMenu.styled"
import BackIcon from "@mui/icons-material/ChevronLeft"
import theme from "../../theme"
import { rem } from "polished"
import InvoiceNotification from "../NotificationsDropdown/InvoiceNotification"
import BlockAcceptNotification from "../NotificationsDropdown/BlockAcceptNotification"

interface IProps {
  handleClose: () => void
}

const FullscreenMenuNotifications = (props: IProps) => {
  return (
    <StyledFullscreenMenuNotifications>
      <StyledFullscreenMenuNotificationsUpperContainer>
        <IconButton
          size="small"
          onClick={props.handleClose}
          sx={{ mr: rem("24px") }}
        >
          <BackIcon sx={{ fontSize: 24, color: theme.palette.grey6 }} />
        </IconButton>
        <StyledFullscreenMenuNotificationsUpperContainerTitle>
          Notifications
        </StyledFullscreenMenuNotificationsUpperContainerTitle>
        <StyledFullscreenMenuNotificationsUpperContainerDismissButton>
          Dismiss all
        </StyledFullscreenMenuNotificationsUpperContainerDismissButton>
      </StyledFullscreenMenuNotificationsUpperContainer>
      <StyledFullscreenMenuNotificationsList>
        <StyledFullscreenMenuNotificationsListItem>
          <InvoiceNotification
            invoiceNumber={328}
            invoiceId="someInvoiceId"
            fromNow="5 mins ago"
          />
        </StyledFullscreenMenuNotificationsListItem>
        <Divider />
        <StyledFullscreenMenuNotificationsListItem>
          <BlockAcceptNotification
            location="Wembley (DHA-1)"
            date="Wed 09 Sep"
            time="17:00-20:30"
            pay={39}
            fromNow="23 hours ago"
          />
        </StyledFullscreenMenuNotificationsListItem>
      </StyledFullscreenMenuNotificationsList>
    </StyledFullscreenMenuNotifications>
  )
}

export default FullscreenMenuNotifications
