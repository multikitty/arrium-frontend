import { makeAutoObservable, runInAction } from "mobx"

import { UserType } from "@/types/auth"
import isBrowser from "@/utils/isBrowser"
import {
  setLocalStorage,
  removeLocalStorage,
  getLocalStorage,
} from "@/utils/localStorage"
import { getCurrencySymbolByCountryCode } from "@/utils"
import { CountryCodes } from "@/utils/getCurrencySymbolByCountryCode"
import countryToCurrency from "country-to-currency"
import { noCase } from "change-case"

class UserStore {
  user: UserType = null

  constructor() {
    makeAutoObservable(this)
  }

  get userToken() {
    return getLocalStorage("token") || null
  }

  get currentUser() {
    return (
      this.user ||
      (JSON.parse(getLocalStorage("user") as string) as UserType) ||
      null
    )
  }

  get isAuthenticated() {
    return !!this.currentUser
  }

  get userFullName() {
    if (this.currentUser)
      return `${this.currentUser.firstName} ${this.currentUser.lastName}`
    return ""
  }

  get userInitials() {
    if (this.currentUser)
      return `${this.currentUser.firstName[0]}${this.currentUser.lastName[0]}`
    return ""
  }

  get currencySymbol() {
    if (this.currentUser)
      return getCurrencySymbolByCountryCode(
        this.currentUser.country as CountryCodes
      )
    return getCurrencySymbolByCountryCode("GB")
  }

  get currencyCode() {
    if (this.currentUser)
      return countryToCurrency[this.currentUser.country as CountryCodes]
    return "GBP"
  }

  get lowerCaseCountry() {
    if (this.currentUser) return noCase(this.currentUser.country || "")
    return "gb"
  }

  set setUser(user: NonNullable<UserType>) {
    this.user = user
    setLocalStorage("user", JSON.stringify(user))
  }

  verifyPhone = () => {
    runInAction(() => {
      this.user = { ...this.currentUser, isPhoneVerified: true } as UserType
    })
    setLocalStorage("user", JSON.stringify(this.user))
  }

  verifyEmail = () => {
    runInAction(() => {
      this.user = { ...this.currentUser, isEmailVerified: true } as UserType
    })
    setLocalStorage("user", JSON.stringify(this.user))
  }

  authenticateUser = (user: UserType) => {
    runInAction(() => {
      this.user = user
    })
    setLocalStorage("user", JSON.stringify(user))
  }

  logout = () => {
    if (!isBrowser()) return
    removeLocalStorage("user")
    runInAction(() => {
      this.user = null
    })
  }
}

export default UserStore
