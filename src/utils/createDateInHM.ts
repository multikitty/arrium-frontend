const createDateInHM = (hour: number, minutes: number) =>
  new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDay(),
    hour,
    minutes,
    0,
    0
  )

export default createDateInHM
