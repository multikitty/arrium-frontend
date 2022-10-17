import * as React from "react"

import Seo from "../Seo"
import BannerSection from "../BannerSection"
import BenefitsSection from "../BenefitsSection"
import WorkingSection from "../WorkingSection"
import FooterSection from "../FooterSection"
import ContactFormSection from "../ContactFormSection"
import LandingNavbar from "../LandingNavbar"
import { IPageProps } from "@/lib/interfaces/common"

interface ILandingPageProps extends IPageProps {}

const LandingPage: React.FC<ILandingPageProps> = ({ country_code, lang }) => (
  <>
    <Seo title="Home | Arrium" />
    <LandingNavbar country_code={country_code} lang={lang} />
    <BannerSection country_code={country_code} lang={lang} />
    <BenefitsSection />
    <WorkingSection />
    <ContactFormSection />
    <FooterSection country_code={country_code} lang={lang} />
  </>
)

export default LandingPage
