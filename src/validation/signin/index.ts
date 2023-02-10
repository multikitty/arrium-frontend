import resetPasswordOptions from "@/validation/signin/resetPassword"

const schemas = {
  resetPassword: resetPasswordOptions,
} as const

export default schemas
