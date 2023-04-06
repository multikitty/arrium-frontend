import { AllNotificationVariables, GetAllNotificationResult, UpdateAllBlockNotificationDismissResult, UpdateAllBlockNotificationDismissVariables, UpdateBlockNotificationDismissResult, UpdateBlockNotificationDismissVariables, UpdateNotificationViewStatusResult, UpdateNotificationViewStatusVariables } from "@/lib/interfaces/notification";
import { MutationFunction, useQuery } from "react-query";
import { arriumAPI } from "./axios";


export function fetchAllNotifications(
    params: AllNotificationVariables
): Promise<GetAllNotificationResult | undefined> {
    return arriumAPI
        .get("/alert/allNotification/" + params.pk)
        .then(response => response.data)
}

export function useAllNotifications(params: AllNotificationVariables) {
    return useQuery(
        ["all-notifications", params],
        () => fetchAllNotifications(params!),
        {
            enabled: Boolean(params.pk),
        }
    )
}

export const updateNotificationView: MutationFunction<
    UpdateNotificationViewStatusResult,
    UpdateNotificationViewStatusVariables
> = async statusData => {
    return await (
        await arriumAPI.post("/alert/updateViewedNotification", statusData)
    ).data
}

export const updateAllBlockNotificationDismiss: MutationFunction<
    UpdateAllBlockNotificationDismissResult,
    UpdateAllBlockNotificationDismissVariables
> = async dismissData => {
    return await (await arriumAPI.post('/alert/updateDismissedAllNotifications', dismissData)).data
}

export const updateBlockNotificationDismiss: MutationFunction<
    UpdateBlockNotificationDismissResult,
    UpdateBlockNotificationDismissVariables
> = async dismissData => {
    return await (await arriumAPI.post('/alert/updateDismissedSingleNotification', dismissData)).data
}