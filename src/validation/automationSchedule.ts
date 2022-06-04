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
        day: Yup.mixed().oneOf([
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
          "",
        ]),
        startTime: Yup.date()
          .nullable()
          .when("active", {
            is: (active: boolean) => active === true,
            then: schema => schema.required("Start time is required"),
          }),
        endTime: Yup.date()
          .nullable()
          .when("active", {
            is: (active: boolean) => active === true,
            then: schema => schema.required("End time is required"),
          }),
      })
    ),
  })

export const automationScheduleResolver = yupResolver(
  automationScheduleValidationSchema
)
