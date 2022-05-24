import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const availabilityFormValidationSchema = Yup.object().shape({
  timeToArrive: Yup.array().of(
    Yup.number()
      .transform(value => (isNaN(value) ? undefined : value))
      .min(1, "Value must be between 1 to 180")
      .max(180, "Value must be between 1 to 180")
      .required("Value cannot be empty")
  ),
  startTime: Yup.array().of(
    Yup.string().test(
      "is-multiple-of-5",
      "Time must be a multiple of 5",
      value => {
        return parseInt(value?.split(":")[1] || "5") % 5 === 0
      }
    )
  ),
  endTime: Yup.array().of(
    Yup.string().test(
      "is-multiple-of-5",
      "Time must be a multiple of 5",
      value => {
        return parseInt(value?.split(":")[1] || "5") % 5 === 0
      }
    )
  ),
  minimumPay: Yup.array().of(
    Yup.number()
      .min(1, "Value must be greater than 1")
      .transform(value => (isNaN(value) ? undefined : value))
  ),
  minimumHourlyRate: Yup.array().of(
    Yup.number()
      .min(1, "Value must be greater than 1")
      .transform(value => (isNaN(value) ? undefined : value))
  ),
})

export const availabilityFormResolver = yupResolver(
  availabilityFormValidationSchema
)

export default availabilityFormValidationSchema
