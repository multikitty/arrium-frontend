import { FormState, UseFormRegister, UseFormUnregister } from "react-hook-form"

export interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

export type FormValues = {
  data: {
    location: string
    checked: boolean
    timeToArrive: number | ""
    startTime: Date | null
    endTime: Date | null
    minimumPay: number | ""
    minimumHourlyRate: number | ""
    stationCode : string
    regionId : string
    stationId : string
  }[]
}

export interface SearchTableProps {
  register: UseFormRegister<FormValues>
  unregister: UseFormUnregister<FormValues>
  formState: FormState<FormValues>
}
