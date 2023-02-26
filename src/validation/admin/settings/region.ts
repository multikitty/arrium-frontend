import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const regionSchema = Yup.object().shape({
  regionName: Yup.string().required("This field is mandatory"),
  regionCode: Yup.string().required("This field is mandatory"),
  regionId: Yup.string().required("This field is mandatory"),
  country: Yup.string().required("This field is mandatory"),
})

const regionOptions = {
  resolver: yupResolver(regionSchema),
  defaultValues: {
    regionName: "",
    regionCode: "",
    regionId: "",
    country: "",
  },
}

export default regionOptions
