import React from "react"

import Seo from "@/components/Seo"
import SignUpPage from "@/components/SignUpPage"
import { PageProps } from "@/lib/interfaces/common"
import GuestGuard from "@/components/GuestGuard/GuestGuard"

interface SignupProps {
  params: PageProps
}

const Signup: React.FC<SignupProps> = ({ params }) => {

  return (
    <GuestGuard country_code={params.country_code}>
      <Seo title="Sign Up | Arrium" />
      <SignUpPage country_code={params.country_code} />
    </GuestGuard>
  )
}

export default Signup
