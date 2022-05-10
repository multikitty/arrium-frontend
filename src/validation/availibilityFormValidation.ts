import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const availibilityFormValidationSchema = Yup.object().shape({
  timeToArrive: Yup.array()
    .of(
      Yup.number()
        .min(0, "Value must be 1 to 180")
        .max(180, "value must be 1 to 180")
    )
    .required(),

  startTime: Yup.array().of(Yup.string().required()),
  endTime: Yup.array().of(Yup.string().required()),
  minimumPay: Yup.array().of(Yup.number().required().min(1)),
  minimumHourlyRate: Yup.array().of(Yup.number().required().min(1)),
})

const availibilityFormOptions = {
  resolver: yupResolver(availibilityFormValidationSchema),
  defaultValus: {
    timeToArrive: [],
    startTime: [],
    endTime: [],
    minimunPay: [],
    minimumHourlyRate: [],
  },
}

export default availibilityFormOptions
