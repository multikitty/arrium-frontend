import { store } from "../store"
import axios from "axios"

export default function createInstance(baseURL = "http://localhost:8080/api") {
  return axios.create({
    baseURL,
    headers: {
      "Content-type": "application/json",
      "x-access-token": store.userStore.userToken || "",
    },
  })
}

const arriumAPI = createInstance(
  process.env.GATSBY_ARRIUM_PROD_URL || "https://api.arrium.io/v1/"
)

arriumAPI.interceptors.request.use(config => {
  const token = store.userStore.userToken || ""

  if (token)
    config.headers = {
      "x-access-token": token,
    }

  return config
})

arriumAPI.interceptors.response.use(
  res => res,
  err => {
    if (
      (err.response.status === 500 || err.response.status === 401) &&
      err.response.data.message === "Failed to authenticate token"
    ) {
      store.userStore.logout()
    }
  }
)

export const listTimezoneAPI = createInstance(
  `http://api.timezonedb.com/v2.1/list-time-zone?key=${process.env.GATSBY_TIMEZONE_API_KEY}&format=json`
)

export const getTimezoneAPI = createInstance(
  `http://api.timezonedb.com/v2.1/get-time-zone?key=${process.env.GATSBY_TIMEZONE_API_KEY}&format=json&by=zone&fields=zoneStart,zoneEnd,zoneName,gmtOffset`
)

export const getGeolocationAPI =
  createInstance(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.GATSBY_GEOLOCATION_API_KEY}&fields=geo,calling_code,country_flag,time_zone&excludes=continent_code,continent_name,country_code3,state_prov,district,city,zipcode
`)

export { arriumAPI }
