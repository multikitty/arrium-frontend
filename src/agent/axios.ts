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

const arriumAPI = createInstance(process.env.GATSBY_ARRIUM_PROD_URL)

arriumAPI.interceptors.request.use(config => {
  const token = store.userStore.userToken || ""

  if (token)
    config.headers = {
      "x-access-token": token,
    }

  return config
})

export const listTimezoneAPI = createInstance(
  `http://api.timezonedb.com/v2.1/list-time-zone?key=${process.env.GATSBY_TIMEZONE_API_KEY}&format=json`
)

export const getTimezoneAPI = createInstance(
  `http://api.timezonedb.com/v2.1/get-time-zone?key=${process.env.GATSBY_TIMEZONE_API_KEY}&format=json&by=zone&fields=zoneStart,zoneEnd,zoneName,gmtOffset`
)

export { arriumAPI }