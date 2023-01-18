import { Box } from "@mui/material"
import React from "react"

interface HiddenProps {
  when: boolean
  children: React.ReactNode
}

const Hidden: React.FC<HiddenProps> = ({ when, children }) => {
  return (
    <Box
      sx={{
        opacity: when ? 0 : 1,
        maxHeight: when ? 0 : "auto",
        transition: "all 150ms ease-out",
      }}
    >
      <React.Fragment>{children}</React.Fragment>
    </Box>
  )
}

export default Hidden
