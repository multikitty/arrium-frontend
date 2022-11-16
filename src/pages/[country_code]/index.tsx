import * as React from "react"
import useNavigate from "@/hooks/useNavigate"
import { useStore } from "@/store"
import { DEFAULT_COUNTRY } from "@/constants/common"
import LoadingScreen from "@/components/LoadingScreen"

const IndexPage = ({ params }: any) => {
  const { userStore } = useStore()
  const { navigateToDefault } = useNavigate({
    country_code: params.country_code || DEFAULT_COUNTRY,
  })

  React.useEffect(() => {
    navigateToDefault(userStore.currentUser?.role)
  }, [])

  return <LoadingScreen />
}

export default IndexPage
