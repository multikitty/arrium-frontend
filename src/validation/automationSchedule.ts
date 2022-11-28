import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

export interface AutomationScheduleType {
  data: Array<{
    active?: boolean
    day?:
      | "mon"
      | "tue"
      | "wed"
      | "thu"
      | "fri"
      | "sat"
      | "sun"
      | "everyday"
      | "weekdays"
      | "weekends"
      | ""
    startTime?: Date | string | null
    // endTime?: Date | null
  }>
}

export const automationScheduleValidationSchema: Yup.SchemaOf<AutomationScheduleType> =
  Yup.object().shape({
    data: Yup.array().of(
      Yup.object().shape({
        active: Yup.boolean(),
        day: Yup.mixed().when("active", {
          is: (active: boolean) => active === true,
          then: schema =>
            schema
              .oneOf(
                [
                  "mon",
                  "tue",
                  "wed",
                  "thu",
                  "fri",
                  "sat",
                  "sun",
                  "everyday",
                  "weekdays",
                  "weekends",
                ],
                "Start time is required"
              )
              .required("Day is required"),
          otherwise: schema =>
            schema.oneOf([
              "mon",
              "tue",
              "wed",
              "thu",
              "fri",
              "sat",
              "sun",
              "everyday",
              "weekdays",
              "weekends",
              "",
            ]),
        }),
        startTime: Yup.date()
          .nullable()
          .when("active", {
            is: (active: boolean) => active === true,
            then: schema => schema.required("Start time is required"),
          }),
        // endTime: Yup.date().nullable(),
      })
    ),
  })

export const automationScheduleResolver = yupResolver(
  automationScheduleValidationSchema
)
