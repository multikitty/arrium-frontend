import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

export interface AutomationScheduleType {
  data: Array<{
    active?: boolean
    day?: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun" | ""
    startTime?: Date | null
    endTime?: Date | null
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
                ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                "Start time is required"
              )
              .required("Day is required"),
          otherwise: schema =>
            schema.oneOf(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", ""]),
        }),
        startTime: Yup.date()
          .nullable()
          .when("active", {
            is: (active: boolean) => active === true,
            then: schema => schema.required("Start time is required"),
          }),
        endTime: Yup.date().nullable(),
      })
    ),
  })

export const automationScheduleResolver = yupResolver(
  automationScheduleValidationSchema
)
