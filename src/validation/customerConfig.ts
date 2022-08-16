import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const customerConfigSchema = Yup.object().shape({
  awsreg1: Yup.string(),
  awsreg2: Yup.string(),
  flexID: Yup.string(),
  devModel: Yup.string(),
  devSerial: Yup.string(),
  devID: Yup.string(),
  blockType: Yup.string(),
  country: Yup.string(),
  amznFlexPassword: Yup.string(),
  amznFlexUser: Yup.string(),
  planName: Yup.string(),
  amznID: Yup.string(),
  flexVersion: Yup.string(),
  osVersion: Yup.string(),
  region: Yup.string(),
  cogid1: Yup.string(),
  devType: Yup.string(),
  cogid2: Yup.string(),
})

const customerConfigOptions = {
  resolver: yupResolver(customerConfigSchema),
  defaultValues: {
    awsreg1: "",
    awsreg2: "",
    flexID: "",
    devModel: "",
    devSerial: "",
    devID: "",
    blockType: "",
    country: "",
    amznFlexPassword: "",
    amznFlexUser: "",
    planName: "",
    amznID: "",
    flexVersion: "",
    osVersion: "",
    region: "",
    cogid1: "",
    devType: "",
    cogid2: "",
  },
}

export default customerConfigOptions
