import { Box } from "@mui/material"
import { rem } from "polished"
import styled from "styled-components"

export const StyledPlansPageWrapper = styled(Box)`
  flex-grow: 1;
  border: 1px solid ${p => p.theme.palette.grey3};
  border-radius: ${rem("20px")};
`

export const StyledPlansPageMapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;

  @media (max-width: 1200px) {
    width: auto;
  }
`
