import { DEFAULT_COUNTRY } from "@/constants/common"
import { COUNTRY_CODE } from "@/constants/localStorage"
import { navigate as gatsbyNavigate } from "gatsby"
import localStorageUtils from "./localStorage"

const navigate = (path: string, ...args: any[]) => {
  gatsbyNavigate(
    `/${localStorageUtils.get(COUNTRY_CODE) || DEFAULT_COUNTRY}/en${path}`,
    ...args
  )
}

export default navigate
