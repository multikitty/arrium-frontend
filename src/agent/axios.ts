import axios from "axios"
import { TOKEN } from "@/constants/localStorage"
import { store } from "@/store"

export const WebSocketURL =
  "wss://565pnq0qoe.execute-api.eu-west-1.amazonaws.com/development"

export default function createInstance(baseURL = "http://localhost:9000/v1/") {
  return axios.create({
    baseURL,
    headers: {
      "Content-type": "application/json",
      "x-access-token": store.userStore.userToken || "",
    },
  })
}

const arriumAPIPython = createInstance("https://arrium-py-manager.arrium.io/")

const arriumAPIWithoutTokenValidation = createInstance(
  process.env.NODE_ENV === "development"
    ? undefined
    : "https://api.arrium.io/v1/"
)

const arriumAPI = createInstance(
  process.env.NODE_ENV === "development"
    ? undefined
    : "https://api.arrium.io/v1/"
)

arriumAPI.interceptors.request.use(config => {
  const token = store.userStore.userToken || localStorage.getItem(TOKEN) || ""
  if (!token) {
    store.userStore.logout()
  }
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

arriumAPIWithoutTokenValidation.interceptors.request.use(config => {
  const token = store.userStore.userToken || localStorage.getItem(TOKEN) || ""
  config.headers = {
    "x-access-token": token,
  }
  return config
})

arriumAPIWithoutTokenValidation.interceptors.response.use(
  res => res,
  err => {
    console.log("err", err)
  }
)
arriumAPIPython.interceptors.request.use(config => {
  const token = store.userStore.userToken || localStorage.getItem(TOKEN) || ""
  config.headers = {
    "x-access-token": token,
  }
  return config
})

arriumAPIPython.interceptors.response.use(
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
  createInstance(`https://ipwho.is?fields=country,country_code,calling_code,timezone,flag
`)

export { arriumAPI, arriumAPIWithoutTokenValidation, arriumAPIPython }
