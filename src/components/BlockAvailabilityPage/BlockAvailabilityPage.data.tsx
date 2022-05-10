const createData = (
  Location: string,
  Day: string,
  Date: string,
  Time: string,
  Duration: string,
  Pay: string,
  Status: "Accepted" | "Ignored"
) => {
  return { Location, Day, Date, Time, Duration, Pay, Status }
}

export type weekProps = {
  day: string
  isSelected: boolean
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

export const week: Array<weekProps> = [
  { day: "Mon", isSelected: false },
  { day: "Tue", isSelected: false },
  { day: "Wed", isSelected: false },
  { day: "Thu", isSelected: false },
  { day: "Fri", isSelected: false },
  { day: "Sat", isSelected: false },
  { day: "Sun", isSelected: false },
]

export const searchTableData = [
  "Manchester (CMC2) - Morrisons",
  "Leyland (DPR1) - AMZL",
  "Knowsley (DWN1) - AMZL",
  "Knowsley (DWN1) - AMZL",
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
    "Accepted"
  ),
  createData(
    "Leyland (DPR1) - AMZL",
    "Wed",
    "Sep 22",
    "17:30 - 21:00",
    "3 h 30 min",
    "45.50",
    "Accepted"
  ),
  createData(
    "Knowsley (DWN1) - AMZL",
    "Wed",
    "Sep 22",
    "18:15 - 21:45",
    "3 h 30 min",
    "54.50",
    "Accepted"
  ),
  createData(
    "Manchester (CMC2) - Morrisons",
    "Wed",
    "Sep 22",
    "18:00 - 20:00",
    "2 h",
    "26",
    "Ignored"
  ),
]
