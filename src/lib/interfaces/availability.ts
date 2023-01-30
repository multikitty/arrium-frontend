export interface IGetAvailabilityTableResult {
    message: string
    success: boolean
    data?: Array<AvailabilityTableData>
}

export interface AvailabilityTableData {
    bDay: string,
    currency: string,
    bEndTime: string,
    offerID: string,
    bStartTime: string,
    projectedTips: Number,
    stationName: string,
    surgeMultiplier: string | null,
    Status: string,
    priorityOffer: Boolean,
    expDate: Date,
    stationCode: string,
    bDate: string,
    sk: string
    price: string | number,
    pk: string,
    duration: string
  }
