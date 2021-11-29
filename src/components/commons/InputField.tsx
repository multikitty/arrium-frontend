import { TextField } from "@mui/material"
import { rem } from "polished"
import styled from "styled-components"

export const StyledInputField = styled(TextField)`
  &&& {
    background-color: #ffffff;
    min-width: ${rem("335px")};
    max-width: ${rem("378px")};
  }
`
