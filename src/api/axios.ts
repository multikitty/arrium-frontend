import axios from "axios"

export default function createInstance(baseURL = "http://localhost:8080/api") {
  return axios.create({
    baseURL,
    headers: {
      "Content-type": "application/json",
    },
  })
}

export const listTimezoneAPI = createInstance(
  `http://api.timezonedb.com/v2.1/list-time-zone?key=${process.env.GATSBY_TIMEZONE_API_KEY}&format=json`
)

export const getTimezoneAPI = createInstance(
  `http://api.timezonedb.com/v2.1/get-time-zone?key=${process.env.GATSBY_TIMEZONE_API_KEY}&format=json&by=zone&fields=zoneStart,zoneEnd,zoneName,gmtOffset`
)
