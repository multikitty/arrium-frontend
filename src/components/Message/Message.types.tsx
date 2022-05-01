import React from "react"

export type MessageVariant = "success" | "warning" | "error"

export interface MessagePageProps {
  variant: MessageVariant
  text: React.ReactNode
  autoHide?: number
  visible: boolean
  setVisible:
    | React.Dispatch<React.SetStateAction<boolean | string>>
    | ((open: boolean) => void)
}
