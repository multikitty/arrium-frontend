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
      startTime: Yup.string().when("checked", {
        is: (checked: boolean) => checked === true,
        then: Yup.string().test(
          "is-multiple-of-5",
          "Time must be a multiple of 5",
          value => {
            return parseInt(value?.split(":")[1] || "5") % 5 === 0
          }
        ),
      }),
      endTime: Yup.string().when("checked", {
        is: (checked: boolean) => checked === true,
        then: Yup.string().test(
          "is-multiple-of-5",
          "Time must be a multiple of 5",
          value => {
            return parseInt(value?.split(":")[1] || "5") % 5 === 0
          }
        ),
      }),
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
