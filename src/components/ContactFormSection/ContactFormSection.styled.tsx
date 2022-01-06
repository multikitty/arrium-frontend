import { rem, rgba } from "polished"
import styled from "styled-components"
import { alpha, styled as muiStyled } from "@mui/material/styles"
import { Button } from "@mui/material"
import InputBase from "@mui/material/InputBase"
import { devices } from "../../constants/device"
import theme from "../../theme"
import contactFormBackground from "../../assets/images/landing-contact_form_background.png"

export const StyledContactFormSection = styled.div`
  position: relative;
  max-width: ${p => p.theme.sizes.container};
  width: 100%;
  margin: 0 auto;
  margin-bottom: ${rem("80px")};

  @media (max-width: ${p => p.theme.sizes.container}) {
    padding: 0 ${rem("16px")};
  }
`

export const StyledContactFormSectionCard = styled.div`
  border-radius: ${rem("32px")};
  background: url(${contactFormBackground}) ${p => p.theme.palette.main}
    no-repeat;
  background-size: cover;
  padding: ${rem("64px")} ${rem("88px")};
  display: flex;

  @media ${devices.web.down} {
    padding: ${rem("48px")} ${rem("24px")};
    flex-direction: column;
  }
`

export const StyledContactFormSectionCardLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: ${rem("80px")};
  max-width: ${rem("455px")};

  @media ${devices.web.down} {
    margin-right: 0;
    margin-bottom: ${rem("64px")};
  }
`

export const StyledContactFormSectionCardLeftContainerTitle = styled.h3`
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: ${rem("42px")};
  line-height: ${rem("46px")};
  margin-bottom: ${rem("36px")};

  color: ${p => p.theme.palette.common.white};

  @media ${devices.web.down} {
    margin-bottom: ${rem("24px")};
  }
`

export const StyledContactFormSectionCardLeftContainerText = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("18px")};
  line-height: ${rem("24px")};

  color: ${p => p.theme.palette.common.white};
`

export const StyledContactFormSectionCardRightContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const StyledContactFormSectionCardRightContainerTitle = styled.h4`
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: ${rem("42px")};
  line-height: ${rem("46px")};
  margin-bottom: ${rem("8px")};

  color: ${p => p.theme.palette.common.white};
`

export const StyledContactFormSectionCardRightContainerSubTitle = styled.h6`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("18px")};
  line-height: ${rem("36px")};
  margin-bottom: ${rem("24px")};

  color: ${p => p.theme.palette.common.white};
`

export const StyledContactFormSectionCardRightContainerField = muiStyled(
  InputBase
)(({ theme }) => ({
  width: "100%",
  "& .MuiInputBase-input": {
    borderRadius: rem("10px"),
    position: "relative",
    backgroundColor: rgba(theme.palette.common.white, 0.2),
    color: theme.palette.common.white,
    border: "1px solid transparent",
    fontSize: rem("16px"),
    lineHeight: rem("24px"),
    fontStyle: "normal",
    fontWeight: "normal",
    width: "100%",
    padding: `${rem("16px")} ${rem("24px")}`,
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    fontFamily: ["Inter", "sans-serif"].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))

export const StyledContactFormSectionCardRightContainerFieldHelperText = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("10px")};
  line-height: ${rem("16px")};
  margin-left: ${rem("16px")};

  color: #a60000;
`

export const StyledContactFormSectionCardRightContainerSendButton = muiStyled(
  Button
)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: rem("16px"),
  lineHeight: rem("20px"),
  padding: `${rem("12px")} ${rem("75px")}`,
  border: "1px solid",
  borderRadius: rem("10px"),
  backgroundColor: theme.palette.common.white,
  borderColor: theme.palette.common.white,
  color: theme.palette.main,
  fontFamily: ["Inter", "sans-serif"].join(","),
  width: "max-content",
  marginTop: rem("24px"),

  "&:hover": {
    boxShadow: "none",
    backgroundColor: theme.palette.common.white,
    borderColor: theme.palette.common.white,
  },

  "&:active": {
    boxShadow: "none",
    backgroundColor: theme.palette.common.white,
    borderColor: theme.palette.common.white,
  },

  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
})
