import React from "react"

type ReturnType = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const getReturnValues = (countDown: number) => {
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds }
}

const useCountDown = (targetDate: number): ReturnType => {
  const countDownDate = new Date(targetDate).getTime()
  const [countDown, setCountDown] = React.useState(
    countDownDate - new Date().getTime()
  )

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (countDown > 0) setCountDown(countDownDate - new Date().getTime())
    }, 1000)

    return () => clearInterval(interval)
  }, [countDownDate])

  return getReturnValues(countDown)
}

export default useCountDown
