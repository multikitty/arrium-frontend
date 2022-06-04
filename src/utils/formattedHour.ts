const formattedHour = (seconds: number) => {
  const hourInNumber: string = (seconds / 60 / 60).toFixed(2)
  const _formattedHour = hourInNumber.substring(0, hourInNumber.length - 3)
  const formattedMinutes =
    (parseFloat(
      hourInNumber.substring(hourInNumber.length - 2, hourInNumber.length)
    ) /
      100) *
    60
  return `${_formattedHour}:${formattedMinutes === 0 ? "00" : formattedMinutes}`
}

export default formattedHour
