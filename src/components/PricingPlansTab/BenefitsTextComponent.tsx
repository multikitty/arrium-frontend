import React from "react"
import { Box } from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import {
  StyledPricingPlansColumnBenefitsActiveText,
  StyledPricingPlansColumnBenefitsInactiveText,
} from "./PricingPlansTab.styled"
import theme from "@/theme"

interface BenefitsTextComponentProps {
  iconColor: string | null
  status: boolean | string
  benefits: string
}

export default function BenefitsTextComponent(
  props: BenefitsTextComponentProps
) {
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
            <StyledPricingPlansColumnBenefitsActiveText>
              {props.benefits}
            </StyledPricingPlansColumnBenefitsActiveText>
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
            <StyledPricingPlansColumnBenefitsInactiveText>
              {props.benefits}
            </StyledPricingPlansColumnBenefitsInactiveText>
          </>
        )}
      </Box>
    </>
  )
}
