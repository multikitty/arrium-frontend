const maskPhoneNumber = (phone: string) =>
  `${phone
    .substring(0, phone.length - 4)
    .replaceAll(/(\d|\w|\+)/g, "*")} ${phone.substring(
    phone.length - 4,
    phone.length
  )}`

export default maskPhoneNumber
