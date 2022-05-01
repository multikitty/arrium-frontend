import isBrowser from "./isBrowser"

export const setLocalStorage = (key: string, value: string) => {
  isBrowser() && localStorage.setItem(key, value)
}

export const getLocalStorage = (key: string) => {
  return isBrowser() && localStorage.getItem(key)
}

export const removeLocalStorage = (key: string) => {
  isBrowser() && localStorage.removeItem(key)
}

export const clearLocalStorage = () => {
  isBrowser() && localStorage.clear()
}
