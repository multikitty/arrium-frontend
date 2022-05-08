const formattedHour = (seconds: number) => {
  const hourInNumber: string = (seconds / 60 / 60).toFixed(2)
  console.log("hourInNumber", hourInNumber)
  const _formattedHour = hourInNumber.substring(0, hourInNumber.length - 3)
  console.log("_formattedHour", _formattedHour)
  console.log(
    "minuutes",
    hourInNumber.substring(hourInNumber.length - 2, hourInNumber.length)
  )
  const formattedMinutes =
    (parseFloat(
      hourInNumber.substring(hourInNumber.length - 2, hourInNumber.length)
    ) /
      100) *
    60
  return `${_formattedHour}:${formattedMinutes === 0 ? "00" : formattedMinutes}`
}

export default formattedHour
