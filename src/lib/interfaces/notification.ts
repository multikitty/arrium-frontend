export interface GetAllNotificationResult {
    message: string
    success: boolean
    blockNotificationData?: Array<BlockNotificationData>
    invoiceNotificationData?: Array<InvoiceNotificationData>
}

export interface AllNotificationVariables {
    pk: string | undefined
}

export interface BlockNotificationData {
    sessionTimeU: string
    stationName: string
    bStartTimeU: string | number
    expDate: number
    notifViewed: boolean
    notifType: string
    stationCode: string
    notifDismiss: boolean
    sk: string
    pk: string
    price: string | number
    bEndTimeU: string | number
}

export interface InvoiceNotificationData {
    sk: string
    pk: string
    notifViewed: boolean
    notifType: string
    invID: string | number
}

export interface UpdateNotificationViewStatusResult {
    message: string
    success: boolean
}
export interface UpdateNotificationViewStatusVariables {
    pk: string | undefined
}

export interface UpdateAllBlockNotificationDismissResult {
    message: string
    success: boolean
}
export interface UpdateAllBlockNotificationDismissVariables {
    pk: string | undefined
}

export interface UpdateBlockNotificationDismissResult {
    message: string
    success: boolean
}
export interface UpdateBlockNotificationDismissVariables {
    pk: string | undefined,
    sk: string | undefined
}