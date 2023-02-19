import React from "react"

import Seo from "@/components/Seo"
import SignInPage from "@/components/SignInPage"
import { PageProps } from "@/lib/interfaces/common"
import GuestGuard from "@/components/GuestGuard/GuestGuard"

interface SigninProps {
  params: PageProps
}

const signin: React.FC<SigninProps> = ({ params }) => {
  return (
    <GuestGuard country_code={params.country_code}>
      <Seo title="Sign In | Arrium" />
      <SignInPage country_code={params.country_code} />
    </GuestGuard>
  )
}

export default signin
