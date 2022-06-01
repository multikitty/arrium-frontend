import React from "react"
import { InputAdornment, TextFieldProps } from "@mui/material"
import { SearchTableTextField } from "../commons/commonComponents"
import { FormValues } from "./AvailablityPage.types"

export const availabilityStatusOptions = {
  accepted: { label: "Accepted", value: "accepted" },
  ignored: { label: "Ignored", value: "ignored" },
  rejected: { label: "Rejected", value: "rejected" },
}

export type AvailabilityStatusType = keyof typeof availabilityStatusOptions

const createData = (
  location: string,
  day: string,
  date: string,
  time: string,
  duration: string,
  pay: string,
  status: AvailabilityStatusType
) => {
  return { location, day, date, time, duration, pay, status }
}

export type WeekType = {
  day: string
  active: boolean
}

const createSearchesData = (
  location: string,
  timeToArrive: string,
  startTimeToEndTime: string,
  minPay: string,
  minHourlyRate: string
) => {
  return { location, timeToArrive, startTimeToEndTime, minPay, minHourlyRate }
}

export const initialWeekData: WeekType[] = [
  { day: "Mon", active: false },
  { day: "Tue", active: false },
  { day: "Wed", active: false },
  { day: "Thu", active: false },
  { day: "Fri", active: false },
  { day: "Sat", active: false },
  { day: "Sun", active: false },
]

export const searchTableInitialValues: FormValues = {
  data: [
    {
      location: "Manchester (CMC2) - Morrisons",
      checked: true,
      timeToArrive: 120,
      startTime: "12:00",
      endTime: "13:00",
      minimumPay: 80,
      minimumHourlyRate: 20,
    },
    {
      location: "Leyland (DPR1) - AMZL",
      checked: false,
      timeToArrive: "",
      startTime: "",
      endTime: "",
      minimumPay: "",
      minimumHourlyRate: "",
    },
    {
      location: "Knowsley (DWN1) - AMZL",
      checked: false,
      timeToArrive: "",
      startTime: "",
      endTime: "",
      minimumPay: "",
      minimumHourlyRate: "",
    },
    {
      location: "Wakefield (DLS4)",
      checked: false,
      timeToArrive: "",
      startTime: "",
      endTime: "",
      minimumPay: "",
      minimumHourlyRate: "",
    },
  ],
}

export const searchTableEmptyData: FormValues = {
  data: searchTableInitialValues.data.map(({ location }) => ({
    location: location,
    checked: false,
    timeToArrive: "",
    startTime: "",
    endTime: "",
    minimumPay: "",
    minimumHourlyRate: "",
  })),
}

export const searchTableShape = [
  {
    label: "Time to arrive",
    name: "timeToArrive",
    renderInput(props: TextFieldProps) {
      props.error = props.error || false
      return (
        <SearchTableTextField
          placeholder="Type..."
          type="number"
          inputProps={{
            min: 0,
            max: 180,
          }}
          {...props}
          {...(props.fullWidth && { sx: { width: "100% !important" } })}
        />
      )
    },
  },
  {
    label: "Start time",
    name: "startTime",
    renderInput(props: TextFieldProps) {
      return (
        <SearchTableTextField
          type="time"
          inputProps={{
            step: 300,
          }}
          {...props}
          {...(props.fullWidth && { sx: { width: "100% !important" } })}
        />
      )
    },
  },
  {
    label: "End time",
    name: "endTime",
    renderInput(props: TextFieldProps) {
      return (
        <SearchTableTextField
          type="time"
          inputProps={{
            step: 300,
          }}
          {...props}
          {...(props.fullWidth && { sx: { width: "100% !important" } })}
        />
      )
    },
  },
  {
    label: "Minimum pay",
    name: "minimumPay",
    renderInput(props: TextFieldProps) {
      return (
        <SearchTableTextField
          placeholder="Type..."
          type="number"
          inputProps={{
            min: 0,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">&#8356;</InputAdornment>
            ),
          }}
          {...props}
          {...(props.fullWidth && { sx: { width: "100% !important" } })}
        />
      )
    },
  },
  {
    label: "Minimum hourly rate",
    name: "minimumHourlyRate",
    renderInput(props: TextFieldProps) {
      return (
        <SearchTableTextField
          placeholder="Type..."
          type="number"
          inputProps={{
            min: 0,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">&#8356;</InputAdornment>
            ),
          }}
          {...props}
          {...(props.fullWidth && { sx: { width: "100% !important" } })}
        />
      )
    },
  },
]

export const rowSearches = [
  createSearchesData(
    "Manchester (CMC2) - Morrisons",
    "15 min",
    "17:45 - 21:00",
    "30",
    "10"
  ),
  createSearchesData(
    "Leyland (DPR1) - AMZL",
    "20 min",
    "17:30 - 22:00",
    "35",
    "1"
  ),
  createSearchesData(
    "Knowsley (DWN1) - AMZL",
    "32 min",
    "17:30 - 22:00",
    "40",
    "13"
  ),
]

export const rows = [
  createData(
    "Knowsley (DWN1) - AMZL",
    "Wed",
    "Sep 22",
    "17:45 - 21:15",
    "3 h 30 min",
    "54.50",
    availabilityStatusOptions.accepted.value as AvailabilityStatusType
  ),
  createData(
    "Leyland (DPR1) - AMZL",
    "Wed",
    "Sep 22",
    "17:30 - 21:00",
    "3 h 30 min",
    "45.50",
    availabilityStatusOptions.accepted.value as AvailabilityStatusType
  ),
  createData(
    "Knowsley (DWN1) - AMZL",
    "Wed",
    "Sep 22",
    "18:15 - 21:45",
    "3 h 30 min",
    "54.50",
    availabilityStatusOptions.rejected.value as AvailabilityStatusType
  ),
  createData(
    "Manchester (CMC2) - Morrisons",
    "Wed",
    "Sep 22",
    "18:00 - 20:00",
    "2 h",
    "26",
    availabilityStatusOptions.ignored.value as AvailabilityStatusType
  ),
]

export const availabilityStatusColorMap: Record<
  AvailabilityStatusType,
  string
> = {
  accepted: "#3DCC70",
  ignored: "#FAB11E",
  rejected: "#FA6464",
}
