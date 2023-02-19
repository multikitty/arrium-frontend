export const formatToMMSS = (secToConvert: string) => {
  const sec_num = parseInt(secToConvert, 10)
  const hours: number | string = Math.floor(sec_num / 3600)
  let minutes: number | string = Math.floor((sec_num - hours * 3600) / 60)
  let seconds: number | string = sec_num - hours * 3600 - minutes * 60

  if (minutes < 10) {
    minutes = "0" + minutes
  }
  if (seconds < 10) {
    seconds = "0" + seconds
  }
  return minutes + ":" + seconds
}
