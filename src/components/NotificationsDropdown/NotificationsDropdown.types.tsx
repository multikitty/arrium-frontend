import { GetAllNotificationResult } from "@/lib/interfaces/notification"
export interface BlockAcceptNotificationProps {
  location: string
  date: string
  time: string
  pay: number | string
  fromNow: string | number
  onDismiss: () => void
}

export interface InvoiceNotificationProps {
  invoiceNumber: number | string
  invoiceId?: string
  fromNow: string | number
}

export interface NotifcatioDropDownProps {
  handleClose: () => void
  anchorEl: null | HTMLElement
  open: boolean
  pk: string | undefined
  allNotification: GetAllNotificationResult | undefined
  isLoading: boolean
  refetch: () => void
}
