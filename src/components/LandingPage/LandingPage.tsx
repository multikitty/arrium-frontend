import * as React from "react"

import Seo from "../Seo"
import BannerSection from "../BannerSection"
import BenefitsSection from "../BenefitsSection"
import WorkingSection from "../WorkingSection"
import FooterSection from "../FooterSection"
import ContactFormSection from "../ContactFormSection"
import LandingNavbar from "../LandingNavbar"

const LandingPage = () => (
  <>
    <Seo title="Home | Arrium" />
    <LandingNavbar />
    <BannerSection />
    <BenefitsSection />
    <WorkingSection />
    <ContactFormSection />
    <FooterSection />
  </>
)

export default LandingPage
