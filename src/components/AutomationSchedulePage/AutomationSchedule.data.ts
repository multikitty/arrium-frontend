import { createDateInHM } from "@/utils"
import { AutomationScheduleType } from "@/validation/automationSchedule"

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
