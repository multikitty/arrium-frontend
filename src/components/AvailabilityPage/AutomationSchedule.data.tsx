import React from "react"
import { createDateInHM } from "@/utils"
import { AutomationScheduleType } from "@/validation/automationSchedule"
import { FormControl, TextField, TextFieldProps } from "@mui/material"
import { MobileTimePicker, MobileTimePickerProps } from "@mui/x-date-pickers"
// import DaySelect from "../DaySelect"
import DaySelectAutomationSchedule, { DaySelectAutomationScheduleProps } from "../DaySelectAutomationSchedule/DaySelectAutomationSchedule"
import { rem } from "polished"

export const scheduleDataInitialValues: AutomationScheduleType["data"] = [
  {
    active: false,
    day: "",
    startTime: null,
  },
  {
    active: false,
    day: "",
    startTime: null,
  },
  { active: false, day: "", startTime: null, },
  { active: false, day: "", startTime: null, },
  { active: false, day: "", startTime: null, },
  { active: false, day: "", startTime: null, },
  { active: false, day: "", startTime: null, },
]

interface TimePickerProps extends Omit<MobileTimePickerProps<any, any>, "renderInput"> {
  fullWidth?: boolean
}

export const automationScheduleShape = [
  {
    label: "Day",
    name: "day",
    renderInput(props: DaySelectAutomationScheduleProps) {
      props.error = props.error || false
      return (
        <FormControl size="small">
          <DaySelectAutomationSchedule
            {...props}
            {...(props.fullWidth && { sx: { width: "100% !important" } })}
          />
        </FormControl>
      )
    },
  },
  {
    label: "Start time",
    name: "startTime",
    renderInput(props: TimePickerProps) {
      return props.disabled ? (
        <></>
      ) : (
        <MobileTimePicker
          {...props}
          mask="__:__"
          views={["hours", "minutes"]}
          value={props.value}
          onChange={props.onChange}
          renderInput={(params: TextFieldProps) => (
            <TextField
              size="small"
              {...params}
              {...(props.fullWidth && {
                sx: {
                  width: "100% !important",
                  textAlign: "center",
                  minWidth: rem("100px"),
                },
              })}
            />
          )}
        />
      )
    },
  },
  // {
  //   label: "End time",
  //   name: "endTime",
  //   renderInput(props: TimePickerProps) {
  //     return props.disabled ? (
  //       <></>
  //     ) : (
  //       <MobileTimePicker
  //         {...props}
  //         minTime={props.minTime}
  //         mask="__:__"
  //         views={["hours", "minutes"]}
  //         value={props.value}
  //         onChange={props.onChange}
  //         renderInput={(params: TextFieldProps) => (
  //           <TextField
  //             size="small"
  //             {...params}
  //             {...(props.fullWidth && {
  //               sx: {
  //                 width: "100% !important",
  //                 textAlign: "center",
  //                 minWidth: rem("100px"),
  //               },
  //             })}
  //           />
  //         )}
  //       />
  //     )
  //   },
  // },
]
