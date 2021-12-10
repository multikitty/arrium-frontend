import React, { useState } from "react"
import { Box, useMediaQuery } from "@mui/material"
import { rem } from "polished"
import {
  StyledTitle,
  StyledTitleMobile,
} from "../components/commons/commonComponents"
import Seo from "../components/Seo"
import TopLayout from "../components/TopLayout"
import RegistrationSection from "../components/RegistrationSection"
import AccountInfoSection from "../components/AccountInfoSection"

export interface FormProps {
  setFormStage: React.Dispatch<React.SetStateAction<number>>
}

const signup = () => {
  const isWebView = useMediaQuery("(min-width:768px)")
  const [formStage, setFormStage] = useState<number>(1)

  return (
    <TopLayout>
      <Seo title="Sign In | Arrium" />
      {isWebView ? (
        <Box display="flex" justifyContent="center">
          <StyledTitle>Arrium</StyledTitle>
        </Box>
      ) : (
        <Box height={rem("64px")} display="flex" alignItems="center">
          <StyledTitleMobile>Arrium</StyledTitleMobile>
        </Box>
      )}
      <Box display="flex" alignItems="center" flexDirection="column">
        {formStage === 1 && <RegistrationSection setFormStage={setFormStage} />}
        {formStage === 2 && <AccountInfoSection setFormStage={setFormStage} />}
        {/* {formStage === 3 && }
        {formStage === 4 && }
        {formStage === 5 && } */}
      </Box>
    </TopLayout>
  )
}

export default signup
