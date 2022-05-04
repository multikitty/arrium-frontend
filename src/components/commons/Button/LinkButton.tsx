import Button from "@mui/material/Button"
import { rem } from "polished"
import styled from "styled-components"
import theme from "@/theme"

const StyledLinkButton = styled(Button)`
  &&& {
    text-transform: capitalize;
    width: auto;
    color: ${theme.palette.grey6};
    font-family: Inter;
    font-size: ${rem("16px")};
    font-style: normal;
    font-weight: 600;
    line-height: ${rem("16px")};
  }
`

export default StyledLinkButton
