import React from "react"
import { Divider, Menu, MenuItem } from "@mui/material"
import { rem } from "polished"
import {
  StyledNotificationsDropdownUpperSection,
  StyledNotificationsDropdownUpperSectionDismissButton,
  StyledNotificationsDropdownUpperSectionUsername,
} from "./NotificationsDropdown.styled"
import { navigate } from "gatsby"
import InvoiceNotification from "./InvoiceNotification"
import BlockAcceptNotification from "./BlockAcceptNotification"
import { NotifcatioDropDownProps } from "./NotificationsDropdown.types"
import { DriverPages } from "@/constants/common"

const NotificationsDropdown: React.FC<NotifcatioDropDownProps> = ({
  handleClose,
  anchorEl,
  open,
}) => {
  const handleInvoiceNotificationClick:
    | React.MouseEventHandler<HTMLLIElement>
    | undefined = e => {
    e.stopPropagation()
    navigate(`/${DriverPages.subscription}`)
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.1))",
          mt: 2,
          borderRadius: rem("20px"),
          minWidth: rem("360px"),
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 18,
            width: 14,
            height: 14,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <StyledNotificationsDropdownUpperSection>
        <StyledNotificationsDropdownUpperSectionUsername>
          Notifications
        </StyledNotificationsDropdownUpperSectionUsername>
        <StyledNotificationsDropdownUpperSectionDismissButton>
          Dismiss all
        </StyledNotificationsDropdownUpperSectionDismissButton>
      </StyledNotificationsDropdownUpperSection>
      <Divider />
      <MenuItem
        dense
        divider
        sx={{ py: rem("12px") }}
        onClick={handleInvoiceNotificationClick}
      >
        <InvoiceNotification
          invoiceNumber={328}
          invoiceId="someInvoiceId"
          fromNow="5 mins ago"
        />
      </MenuItem>
      <MenuItem dense sx={{ py: rem("12px") }}>
        <BlockAcceptNotification
          location="Wembley (DHA-1)"
          date="Wed 09 Sep"
          time="17:00-20:30"
          pay={39}
          fromNow="23 hours ago"
        />
      </MenuItem>
    </Menu>
  )
}

export default NotificationsDropdown
