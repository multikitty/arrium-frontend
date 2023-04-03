export const getRawPhoneNumber = (phoneNumber: string, dialCode: string = "") =>
  phoneNumber?.slice(dialCode.replaceAll("+", "").length).replaceAll("+", "")
