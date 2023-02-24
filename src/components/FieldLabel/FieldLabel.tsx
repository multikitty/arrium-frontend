import React from "react"
import { StyledFieldLabel } from "@/components/commons/uiComponents"

interface FieldLabelProps {
  hidden?: boolean
}

const FieldLabel: React.FC<FieldLabelProps> = ({
  hidden = false,
  children,
}) => {
  return <StyledFieldLabel $isHidden={hidden}>{children}</StyledFieldLabel>
}

export default FieldLabel
