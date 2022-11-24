import React from "react"
import { availabilityStatusOptions } from "@/components/AvailabilityPage/AvailabilityPage.data"

export const content = {
  page403: {
    subHeader: [
      "You are not authorized to access this page.",
      "We suggest you back to home",
    ],
    buttonText: "Back to Home",
  },
  page404: {
    subHeader: [
      "This page doesn't exist or was removed.",
      "We suggest you back to home",
    ],
    buttonText: "Back to Home",
  },
  accountInfoSection: {
    title: "Sign Up",
    buttonText: "Continue",
    alreadyHaveAnAccount: "Already have an account?",
    logIn: "Log In",
  },
  availibility: {
    labelsForTabs: [
      { label: "All", value: "all" },
      {
        label: "Accepted",
        value: "Accepted",
      },
      {
        label: "Ignored",
        value: "Ignored",
      },
      {
        label: "Rejected",
        value: "Rejected",
      },
    ],
    formControlLabelForSwitches: [
      <div>
        Reject offers from <strong>unticked</strong> locations
      </div>,
    ],
  },
  searchTable: {
    tableHeadLabel: [
      "Location",
      "Time to arrive",
      "Start time",
      "End time",
      "Minimum Pay",
      "Minimum Hourly Rate",
    ],
  },
  automationSchedule: {
    tableHeadLabels: ["Active", "Day", "Start time", "End time"],
  },
  automationScheduleModal: {
    tableHeadLabels: ["Status", "Day", "Auto-start at"],
  },
}
