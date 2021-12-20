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
import theme from "../../theme"

interface IProps {
  invoiceNumber: number
  invoiceId: string
  fromNow: string
}

const InvoiceNotification = (props: IProps) => {
  return (
    <StyledInvoiceNotification>
      <StyledInvoiceNotificationUpperContainer>
        <StyledInvoiceNotificationUpperContainerText>
          Invoice{" "}
          <StyledInvoiceNotificationUpperContainerTextInvoiceNumber>
            #{props.invoiceNumber}{" "}
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
        {props.fromNow}
      </StyledInvoiceNotificationBottomContainer>
    </StyledInvoiceNotification>
  )
}

export default InvoiceNotification
