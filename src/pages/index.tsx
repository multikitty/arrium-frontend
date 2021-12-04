import * as React from "react"

import TopLayout from "../components/topLayout"
import Seo from "../components/seo"
import BannerSection from "../components/BannerSection"
import BenefitsSection from "../components/BenefitsSection"
import WorkingSection from "../components/WorkingSection"
import FooterSection from "../components/FooterSection"
import ContactFormSection from "../components/ContactFormSection"
import LandingNavbar from "../components/LandingNavbar"

const IndexPage = () => (
  <TopLayout>
    <Seo title="Home | Arrium" />
    <LandingNavbar />
    <BannerSection />
    <BenefitsSection />
    <WorkingSection />
    <ContactFormSection />
    <FooterSection />
  </TopLayout>
)

export default IndexPage
