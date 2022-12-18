export const PLAN_TYPES = {
  basic: "basic",
  premium: "premium",
} as const

export type PlanType = keyof typeof PLAN_TYPES

const PRICING_PLANS_BASIC_DATA = [
  {
    id: 0,
    popularity: "",
    planType: "Basic Plan",
    planName: "Logistics Only",
    planDescription:
      "Deliver Amazon packages ordered by customers on the Amazon website",
    planPrice: "£25",
    planDuration: "per month",
    planDurationDescription:
      "Less than 2 hours of driving @£13 per hour, for 1 month access",
    benefitsData: [
      {
        status: true,
        benefits: "Accepts Logistics blocks",
      },
      {
        status: false,
        benefits: "Accepts Groceries blocks",
      },
      {
        status: true,
        benefits: "Email confirmation",
      },
      {
        status: true,
        benefits: "SMS confirmation",
      },
    ],
    basicPlansBenefits: [
      {
        status: true,
        benefits: "Setting your availability for each location",
      },
      {
        status: true,
        benefits: "Setting a separate “Time to Arrive” for each location",
      },
      {
        status: true,
        benefits: "Setting a ‘minimum hourly rate’ and/or ‘minimum pay’",
      },
      {
        status: false,
        benefits: "Setting different availability, for each day of the week",
      },
      {
        status: false,
        benefits:
          "Setting an automation schedule of days and times when Arrium should auto-start ",
      },
    ],
  },
  {
    id: 1,
    popularity: "",
    planType: "Basic Plan",
    planName: "Groceries Only",
    planDescription:
      "Deliver Amazon Fresh or supermarket groceries via Amazon Flex",
    planPrice: "£35",
    planDuration: "per month",
    planDurationDescription:
      "Less than 3 hours of driving @£13 per hour, for 1 month access",
    benefitsData: [
      {
        status: false,
        benefits: "Accepts Logistics blocks",
      },
      {
        status: true,
        benefits: "Accepts Groceries blocks",
      },
      {
        status: true,
        benefits: "Email confirmation",
      },
      {
        status: true,
        benefits: "SMS confirmation",
      },
    ],
    basicPlansBenefits: [
      {
        status: true,
        benefits: "Setting your availability for each location",
      },
      {
        status: true,
        benefits: "Setting a separate “Time to Arrive” for each location",
      },
      {
        status: true,
        benefits: "Setting a ‘minimum hourly rate’ and/or ‘minimum pay’",
      },
      {
        status: false,
        benefits: "Setting different availability, for each day of the week",
      },
      {
        status: false,
        benefits:
          "Setting an automation schedule of days and times when Arrium should auto-start ",
      },
    ],
  },
  {
    id: 2,
    popularity: "",
    planType: "Basic Plan",
    planName: "All Areas",
    planDescription:
      "Deliver Amazon packages during the day and groceries in the evening",
    planPrice: "£45",
    planDuration: "per month",
    planDurationDescription:
      "Less than 3.5 hours of driving @£13 per hour, for 1 month access",
    benefitsData: [
      {
        status: true,
        benefits: "Accepts Logistics blocks",
      },
      {
        status: true,
        benefits: "Accepts Groceries blocks",
      },
      {
        status: true,
        benefits: "Email confirmation",
      },
      {
        status: true,
        benefits: "SMS confirmation",
      },
    ],
    basicPlansBenefits: [
      {
        status: true,
        benefits: "Setting your availability for each location",
      },
      {
        status: true,
        benefits: "Setting a separate “Time to Arrive” for each location",
      },
      {
        status: true,
        benefits: "Setting a ‘minimum hourly rate’ and/or ‘minimum pay’",
      },
      {
        status: false,
        benefits: "Setting different availability, for each day of the week",
      },
      {
        status: false,
        benefits:
          "Setting an automation schedule of days and times when Arrium should auto-start ",
      },
    ],
  },
] as const

const PRICING_PLANS_PREMIUM_DATA = [
  {
    id: 0,
    popularity: "MOST POPULAR",
    planType: "Premium Plan",
    planName: "Logistics Only",
    planDescription:
      "Deliver Amazon packages ordered by customers on the Amazon website",
    planPrice: "£30",
    planDuration: "per month",
    planDurationDescription:
      "Less than 2 hours of driving @£13 per hour, for 1 month access",
    benefitsData: [
      {
        status: true,
        benefits: "Accepts Logistics blocks",
      },
      {
        status: false,
        benefits: "Accepts Groceries blocks",
      },
      {
        status: true,
        benefits: "Email confirmation",
      },
      {
        status: true,
        benefits: "SMS confirmation",
      },
    ],
    basicPlansBenefits: [
      {
        status: true,
        benefits: "Setting your availability for each location",
      },
      {
        status: true,
        benefits: "Setting a separate “Time to Arrive” for each location",
      },
      {
        status: true,
        benefits: "Setting a ‘minimum hourly rate’ and/or ‘minimum pay’",
      },
      {
        status: true,
        benefits: "Setting different availability, for each day of the week",
      },
      {
        status: true,
        benefits:
          "Setting an automation schedule of days and times when Arrium should auto-start ",
      },
    ],
  },
  {
    id: 1,
    popularity: "MOST POPULAR",
    planType: "Premium Plan",
    planName: "Groceries Only",
    planDescription:
      "Deliver Amazon Fresh or supermarket groceries via Amazon Flex",
    planPrice: "£40",
    planDuration: "per month",
    planDurationDescription:
      "Less than 3 hours of driving @£13 per hour, for 1 month access",
    benefitsData: [
      {
        status: false,
        benefits: "Accepts Logistics blocks",
      },
      {
        status: true,
        benefits: "Accepts Groceries blocks",
      },
      {
        status: true,
        benefits: "Email confirmation",
      },
      {
        status: true,
        benefits: "SMS confirmation",
      },
    ],
    basicPlansBenefits: [
      {
        status: true,
        benefits: "Setting your availability for each location",
      },
      {
        status: true,
        benefits: "Setting a separate “Time to Arrive” for each location",
      },
      {
        status: true,
        benefits: "Setting a ‘minimum hourly rate’ and/or ‘minimum pay’",
      },
      {
        status: true,
        benefits: "Setting different availability, for each day of the week",
      },
      {
        status: true,
        benefits:
          "Setting an automation schedule of days and times when Arrium should auto-start ",
      },
    ],
  },
  {
    id: 2,
    popularity: "MOST POPULAR",
    planType: "Premium Plan",
    planName: "All Areas",
    planDescription:
      "Deliver Amazon packages during the day and groceries in the evening",
    planPrice: "£50",
    planDuration: "per month",
    planDurationDescription:
      "Less than 3.5 hours of driving @£13 per hour, for 1 month access",
    benefitsData: [
      {
        status: true,
        benefits: "Accepts Logistics blocks",
      },
      {
        status: true,
        benefits: "Accepts Groceries blocks",
      },
      {
        status: true,
        benefits: "Email confirmation",
      },
      {
        status: true,
        benefits: "SMS confirmation",
      },
    ],
    basicPlansBenefits: [
      {
        status: true,
        benefits: "Setting your availability for each location",
      },
      {
        status: true,
        benefits: "Setting a separate “Time to Arrive” for each location",
      },
      {
        status: true,
        benefits: "Setting a ‘minimum hourly rate’ and/or ‘minimum pay’",
      },
      {
        status: true,
        benefits: "Setting different availability, for each day of the week",
      },
      {
        status: true,
        benefits:
          "Setting an automation schedule of days and times when Arrium should auto-start ",
      },
    ],
  },
] as const

export const PRICING_PLANS_DATA = {
  [PLAN_TYPES.basic]: PRICING_PLANS_BASIC_DATA,
  [PLAN_TYPES.premium]: PRICING_PLANS_PREMIUM_DATA,
} as const
