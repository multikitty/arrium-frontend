import * as React from "react"
import { useParams } from "@reach/router"
import useNavigate, { ParamType } from "@/hooks/useNavigate"
import { useStore } from "@/store"

const IndexPage = () => {
  const { userStore } = useStore()
  const params = useParams()
  const { navigateToDefault } = useNavigate(params as ParamType)

  React.useEffect(() => {
    navigateToDefault(userStore.currentUser?.role)
  }, [])

  return <React.Fragment></React.Fragment>
}

export default IndexPage
