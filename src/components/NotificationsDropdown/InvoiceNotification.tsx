import { IconButton } from "@mui/material"
import React from "react"
import {
  StyledInvoiceNotification,
  StyledInvoiceNotificationBottomContainer,
  StyledInvoiceNotificationUpperContainer,
  StyledInvoiceNotificationUpperContainerText,
  StyledInvoiceNotificationUpperContainerTextInvoiceNumber,
} from "./NotificationsDropdown.styled"
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined"
import theme from "@/theme"
import { InvoiceNotificationProps } from "./NotificationsDropdown.types"

const InvoiceNotification: React.FC<InvoiceNotificationProps> = ({
  fromNow,
  invoiceNumber,
}) => {
  return (
    <StyledInvoiceNotification>
      <StyledInvoiceNotificationUpperContainer>
        <StyledInvoiceNotificationUpperContainerText>
          Invoice{" "}
          <StyledInvoiceNotificationUpperContainerTextInvoiceNumber>
            #{invoiceNumber}{" "}
          </StyledInvoiceNotificationUpperContainerTextInvoiceNumber>
          is due. Click to go to Invoices
        </StyledInvoiceNotificationUpperContainerText>
        <IconButton>
          <PushPinOutlinedIcon
            sx={{ fontSize: 16, color: theme.palette.grey5 }}
          />
        </IconButton>
      </StyledInvoiceNotificationUpperContainer>
      <StyledInvoiceNotificationBottomContainer>
        {fromNow}
      </StyledInvoiceNotificationBottomContainer>
    </StyledInvoiceNotification>
  )
}

export default InvoiceNotification
