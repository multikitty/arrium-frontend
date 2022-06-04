import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

export const availabilityValidationSchema = Yup.object().shape({
  data: Yup.array().of(
    Yup.object().shape({
      checked: Yup.boolean(),
      timeToArrive: Yup.number()
        .transform(value => (isNaN(value) ? undefined : value))
        .when("checked", {
          is: (checked: boolean) => checked === true,
          then: Yup.number()
            .transform(value => (isNaN(value) ? undefined : value))
            .min(1, "Value must be between 1 to 180")
            .max(180, "Value must be between 1 to 180")
            .required("Value cannot be empty"),
        }),
      startTime: Yup.date().nullable(),
      endTime: Yup.date().nullable(),
      minimumPay: Yup.number()
        .transform(value => (isNaN(value) ? undefined : value))
        .when("checked", {
          is: (checked: boolean) => checked === true,
          then: Yup.number()
            .transform(value => (isNaN(value) ? undefined : value))
            .min(1, "Value must be greater than 1"),
        }),
      minimumHourlyRate: Yup.number()
        .transform(value => (isNaN(value) ? undefined : value))
        .when("checked", {
          is: (checked: boolean) => checked === true,
          then: Yup.number()
            .transform(value => (isNaN(value) ? undefined : value))
            .min(1, "Value must be greater than 1"),
        }),
    })
  ),
})

export const availabilityResolver = yupResolver(availabilityValidationSchema)
