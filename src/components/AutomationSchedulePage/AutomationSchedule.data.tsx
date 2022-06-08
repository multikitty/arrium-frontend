import React from "react"
import { createDateInHM } from "@/utils"
import { AutomationScheduleType } from "@/validation/automationSchedule"
import { FormControl, TextField, TextFieldProps } from "@mui/material"
import { MobileTimePicker, MobileTimePickerProps } from "@mui/x-date-pickers"
import DaySelect from "../DaySelect"
import { DaySelectProps } from "../DaySelect/DaySelect"
import { rem } from "polished"

export const scheduleDataInitialValues: AutomationScheduleType["data"] = [
  {
    active: true,
    day: "Mon",
    startTime: createDateInHM(12, 0),
    endTime: createDateInHM(13, 0),
  },
  {
    active: true,
    day: "Tue",
    startTime: createDateInHM(12, 15),
    endTime: createDateInHM(13, 15),
  },
  { active: false, day: "Wed", startTime: null, endTime: null },
  { active: false, day: "Thu", startTime: null, endTime: null },
  { active: false, day: "Fri", startTime: null, endTime: null },
  { active: false, day: "Sat", startTime: null, endTime: null },
  { active: false, day: "Sun", startTime: null, endTime: null },
]

interface TimePickerProps extends Omit<MobileTimePickerProps, "renderInput"> {
  fullWidth?: boolean
}

export const automationScheduleShape = [
  {
    label: "Day",
    name: "day",
    renderInput(props: DaySelectProps) {
      props.error = props.error || false
      return (
        <FormControl size="small">
          <DaySelect
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
  {
    label: "End time",
    name: "endTime",
    renderInput(props: TimePickerProps) {
      return props.disabled ? (
        <></>
      ) : (
        <MobileTimePicker
          {...props}
          minTime={props.minTime}
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
]
