export interface CreateReferralCodeVariables {
  country: string
  region: string
  station: string
  numberOfReferral: number
  assignTo: string
}

export interface CreateReferralCodeError extends CreateReferralCodeVariables {}

export interface CreateReferralCodeResult {
  message: string
  success: boolean
  validationError?: CreateReferralCodeError
}

export interface ReferralListByCreatorVariables {
  userpk: string
}

export interface ReferralListByCreatorError
  extends ReferralListByCreatorVariables {}

export interface ReferralListByCreatorResultData {
  refCode: string
  refActive: boolean
  refGenBy: string
  refGen: string
  refGenFor: string
  sk: string
  region: string
  pk: string
  country: string
  station: string
}

export interface ReferralListByCreatorResult {
  message: string
  success: boolean
  data?: {
    Items: ReferralListByCreatorResultData[]
    Count: number
    ScannedCount: number
  }
  validationError?: ReferralListByCreatorError
}
