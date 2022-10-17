import * as React from "react"
import useNavigate from "@/hooks/useNavigate"
import { useStore } from "@/store"

const IndexPage = ({ params }: any) => {
  const { userStore } = useStore()
  const { navigateToDefault } = useNavigate({
    country_code: params.country_code || "uk",
    lang: params.lang || "en",
  })

  React.useEffect(() => {
    navigateToDefault(userStore.currentUser?.role)
  }, [])

  return <React.Fragment></React.Fragment>
}

export default IndexPage
