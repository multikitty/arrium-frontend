import React from "react"
import { Box } from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import {
  StyledBenefitsActiveText,
  StyledBenefitsInactiveText,
} from "./PricingPlansPage.styled"
import theme from "@/theme"

interface IProps {
  iconColor: string | null
  status: boolean | string
  benefits: string
}

export default function BenefitsTextComponent(props: IProps) {
  return (
    <>
      <Box sx={{ display: "flex", paddingBottom: "16px" }}>
        {props.status === true ? (
          <>
            <CheckIcon
              sx={{
                color: props.iconColor,
                fontSize: 16,
                fontWeight: 400,
                marginTop: "4px",
              }}
            />
            <StyledBenefitsActiveText>
              {props.benefits}
            </StyledBenefitsActiveText>
          </>
        ) : (
          <>
            <CloseIcon
              sx={{
                color: theme.palette.grey5,
                fontSize: 16,
                fontWeight: 400,
                marginTop: "4px",
              }}
            />
            <StyledBenefitsInactiveText>
              {props.benefits}
            </StyledBenefitsInactiveText>
          </>
        )}
      </Box>
    </>
  )
}
