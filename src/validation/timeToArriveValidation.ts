import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const timeToArriveFormValidationSchema = Yup.object().shape({
  timeToArrive: Yup.string()
    .required()
    .min(0, "Value must be 1 to 180")
    .max(180, "value must be 1 to 180"),
})

const timeToArriveInputFormOptions = {
  resolver: yupResolver(timeToArriveFormValidationSchema),
  defaultValus: {
    timeToArrive: 0,
  },
}

export default timeToArriveInputFormOptions
