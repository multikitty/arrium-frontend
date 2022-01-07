export interface BlockAcceptNotificationProps {
  location: string
  date: string
  time: string
  pay: number
  fromNow: string
}

export interface InvoiceNotificationProps {
  invoiceNumber: number
  invoiceId: string
  fromNow: string
}

export interface NotifcatioDropDownProps {
  handleClose: () => void
  anchorEl: null | HTMLElement
  open: boolean
}
