import React from "react"

export interface MessagePageProps {
  variant: "success" | "warning" | "error"
  text: React.ReactNode
  autoHide?: number
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<string>>
}
