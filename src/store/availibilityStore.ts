import { FormValues } from "@/components/AvailabilityPage/AvailablityPage.types"
import { action, makeAutoObservable } from "mobx"

class AvailabilityStore {
  checkboxState: boolean[] = []
  initialState: FormValues = {
    timeToArrive: [],
    startTime: [],
    endTime: [],
    minimumPay: [],
    minimumHourlyRate: [],
  }

  constructor() {
    makeAutoObservable(this)
  }

  setInitialState = action((initialState: FormValues) => {
    this.initialState = initialState
  })

  setCheckboxState = action((checkbox: boolean[]) => {
    this.checkboxState = checkbox
  })
}

export default AvailabilityStore
