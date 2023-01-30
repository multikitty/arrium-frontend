import React, { useState } from "react"
import {
  StyledFooterSection,
  StyledFooterSectionBrandLogo,
  StyledFooterSectionBrandLogoContainer,
  StyledFooterSectionCountryDropdownContainer,
  StyledFooterSectionInfoLink,
  StyledFooterSectionInfoLinksContainer,
  StyledFooterSectionRightContainer,
  StyledFooterSectionRightContainerButtonContainer,
  StyledFooterSectionSocialIcon,
  StyledFooterSectionSocialIconsContainer,
  StyledFooterSectionSocialLinksContainer,
} from "./FooterSection.styled"
import brandLogo from "@/assets/icons/arrium_logo.svg"
import { ContainedButton, OutlinedButton } from "../commons/Button"
import InstagramIcon from "@/assets/icons/footer-instagram_logo.inline.svg"
import FacebookIcon from "@/assets/icons/footer-facebook_logo.inline.svg"
import { Link } from "react-scroll"
import {
  Box,
  IconButton,
  SelectChangeEvent,
  useMediaQuery,
} from "@mui/material"
import routes from "@/constants/routes"
import useNavigate from "@/hooks/useNavigate"
import { IPageProps } from "@/lib/interfaces/common"
import { LANDING_PAGE_IDS } from "@/constants/ids"
import { localStorageUtils } from "@/utils"
import { COUNTRY_CODE } from "@/constants/localStorage"
import { DEFAULT_COUNTRY } from "@/constants/common"
import SubDirCountrySelect from "../SubDirCountrySelect"
import { navigate as gatsbyNavigate } from "gatsby"
import { devices } from "@/constants/device"

interface IFooterSectionProps extends IPageProps {}

const FooterSection: React.FC<IFooterSectionProps> = ({ country_code }) => {
  const { navigate } = useNavigate({ country_code })
  const isDesktopView = useMediaQuery(devices.desktop.up)
  const isMobileView = useMediaQuery(devices.web.down)
  const [selectedCountry, setSelectedCountry] = useState<string>(
    (
      localStorageUtils.get(COUNTRY_CODE) ||
      country_code ||
      DEFAULT_COUNTRY
    ).toUpperCase()
  )

  const handleChangeCountry = (e: SelectChangeEvent<string | null>) => {
    const country = e.target.value
    setSelectedCountry(country!)
    localStorageUtils.set(COUNTRY_CODE, country!.toLowerCase())
    gatsbyNavigate(`/${country!.toLowerCase()}/en`)
  }

  const handleRedirectToInstagram = () =>
    window.open("https://www.instagram.com/", "_blank")
  const handleRedirectToFacebook = () =>
    window.open("https://www.facebook.com/", "_blank")
  const handleNavigateToHome = () => {
    navigate(routes.home)
  }

  return (
    <StyledFooterSection id={LANDING_PAGE_IDS["footer-section"]}>
      <StyledFooterSectionBrandLogoContainer>
        <StyledFooterSectionBrandLogo
          src={brandLogo}
          onClick={handleNavigateToHome}
        />
      </StyledFooterSectionBrandLogoContainer>
      <StyledFooterSectionInfoLinksContainer>
        <StyledFooterSectionInfoLink>
          <Link
            delay={300}
            offset={-50}
            to={LANDING_PAGE_IDS["benefits-section"]}
            spy={true}
            smooth={true}
          >
            Benefits
          </Link>
        </StyledFooterSectionInfoLink>
        <StyledFooterSectionInfoLink>
          <Link
            delay={300}
            offset={-50}
            to={LANDING_PAGE_IDS["working-section"]}
            spy={true}
            smooth={true}
          >
            How it Works
          </Link>
        </StyledFooterSectionInfoLink>
        <StyledFooterSectionInfoLink>
          <Link
            delay={300}
            offset={-50}
            to={LANDING_PAGE_IDS["contact-us-section"]}
            spy={true}
            smooth={true}
          >
            Contact Us
          </Link>
        </StyledFooterSectionInfoLink>
      </StyledFooterSectionInfoLinksContainer>
      <Box
        display="flex"
        sx={{
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: { xs: "space-around", lg: "space-between" },
        }}
      >
        <StyledFooterSectionSocialLinksContainer>
          <StyledFooterSectionSocialIconsContainer>
            <StyledFooterSectionSocialIcon
              mr
              onClick={handleRedirectToInstagram}
            >
              <IconButton size="small">
                <InstagramIcon />
              </IconButton>
            </StyledFooterSectionSocialIcon>
            <StyledFooterSectionSocialIcon onClick={handleRedirectToFacebook}>
              <IconButton size="small">
                <FacebookIcon />
              </IconButton>
            </StyledFooterSectionSocialIcon>
          </StyledFooterSectionSocialIconsContainer>
        </StyledFooterSectionSocialLinksContainer>
        <StyledFooterSectionCountryDropdownContainer>
          <SubDirCountrySelect
            openUpwards
            size={isDesktopView || isMobileView ? "large" : "small"}
            isCountryCode={false}
            country={selectedCountry}
            onChange={handleChangeCountry}
            boxProps={{
              display: "flex",
              sx: {
                minWidth: {
                  xs: "130px",
                  lg: "267px",
                },
              },
            }}
          />
        </StyledFooterSectionCountryDropdownContainer>
      </Box>
      <Box display="flex" sx={{ flexGrow: { xs: 0, lg: 1 } }} />
      <StyledFooterSectionRightContainer>
        <StyledFooterSectionRightContainerButtonContainer login>
          <OutlinedButton
            grey
            onClick={() => navigate(routes.signin)}
            sx={{
              width: "100%",
              height: "100%",
              minWidth: { md: "166px", lg: "193px" },
            }}
          >
            Login
          </OutlinedButton>
        </StyledFooterSectionRightContainerButtonContainer>
        <StyledFooterSectionRightContainerButtonContainer>
          <ContainedButton
            onClick={() => navigate(routes.signup)}
            sx={{
              width: "100%",
              whiteSpace: "nowrap",
              minWidth: { md: "166px", lg: "193px" },
            }}
          >
            Start Free Trial
          </ContainedButton>
        </StyledFooterSectionRightContainerButtonContainer>
      </StyledFooterSectionRightContainer>
    </StyledFooterSection>
  )
}

export default FooterSection
