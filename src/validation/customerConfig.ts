import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const customerConfigSchema = Yup.object().shape({
  amznFlexUser: Yup.string(),
  amznFlexPassword: Yup.string(),
  accessToken: Yup.string(),
  refreshToken: Yup.string(),
  flexID: Yup.string(),
  userAgent: Yup.string(),
  country: Yup.string(),
  region: Yup.string(),
})

const customerConfigOptions = {
  resolver: yupResolver(customerConfigSchema),
  defaultValues: {
    amznFlexUser: "",
    amznFlexPassword: "",
    accessToken: "",
    refreshToken: "",
    flexID: "",
    userAgent: "",
    country: "",
    region: "",
  },
}

export default customerConfigOptions
