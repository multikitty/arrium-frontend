import * as React from "react"

import Seo from "../Seo"
import BannerSection from "../BannerSection"
import BenefitsSection from "../BenefitsSection"
import WorkingSection from "../WorkingSection"
import FooterSection from "../FooterSection"
import ContactFormSection from "../ContactFormSection"
import LandingNavbar from "../LandingNavbar"
import { PageProps } from "@/lib/interfaces/common"

interface LandingPageProps extends PageProps {}

const LandingPage: React.FC<LandingPageProps> = ({ country_code }) => (
  <>
    <Seo title="Home | Arrium" />
    <LandingNavbar country_code={country_code} />
    <BannerSection country_code={country_code} />
    <BenefitsSection />
    <WorkingSection />
    <ContactFormSection />
    <FooterSection country_code={country_code} />
  </>
)

export default LandingPage
