import { rem } from "polished"
import styled from "styled-components"

export const StyledAddDropdownMenuItemText = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("16px")};
  line-height: ${rem("24px")};

  color: ${p => p.theme.palette.blackText};
`
