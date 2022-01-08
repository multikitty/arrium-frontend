export interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

export interface Fields {
  timeToArrive: string
  minimunPay: string
  startTime: string
  endTime: string
  minimunHourlyPay: string
}

export interface SearchTableProps {
  error: boolean
  setError: React.Dispatch<React.SetStateAction<boolean>>
  fields: Fields
  setFields: React.Dispatch<React.SetStateAction<Fields>>
}
