import {
  UserRoles,
  Plans,
  registrationSteps,
  countriesToSelectList,
} from "@/constants/common"

export type UserRolesType = keyof typeof UserRoles
export type PlansType = keyof typeof Plans
export type RegistrationStepsType = keyof typeof registrationSteps
export type AllowedCountries = typeof countriesToSelectList[number]
