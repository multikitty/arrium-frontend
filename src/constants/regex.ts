export const atLeastOneLowercase = new RegExp(/(?=.*[a-z])/)
export const atLeastOneUppercase = new RegExp(/(?=.*[A-Z])/)
export const atLeastOneNumber = new RegExp(/(?=.*\d)/)
export const atLeastEightChar = new RegExp(/.{8,}/)
export const emailReg = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
)
