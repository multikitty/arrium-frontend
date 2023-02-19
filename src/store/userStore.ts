import { makeAutoObservable, runInAction } from "mobx"

import { FlexDataType, UserType } from "@/types/auth"
import isBrowser from "@/utils/isBrowser"
import localStorageUtils from "@/utils/localStorage"
import { getCurrencySymbolByCountryCode } from "@/utils"
import { CountryCodes } from "@/utils/getCurrencySymbolByCountryCode"
import countryToCurrency from "country-to-currency"
import { noCase } from "change-case"
import routes from "@/constants/routes"
import { navigate } from "gatsby-link"
import { COUNTRY_CODE, FLEX, TOKEN, USER } from "@/constants/localStorage"
import { DEFAULT_COUNTRY } from "@/constants/common"

class UserStore {
  user: UserType = null
  flexDetails: FlexDataType = null
  constructor() {
    makeAutoObservable(this)
  }

  get userToken() {
    return localStorageUtils.get(TOKEN) || null
  }

  get currentUser() {
    return (
      this.user ||
      (JSON.parse(localStorageUtils.get(USER) as string) as UserType) ||
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
      return `${this.currentUser.firstName?.[0] || ""}${
        this.currentUser.lastName?.[0] || ""
      }`
    return ""
  }

  get currencySymbol() {
    if (this.currentUser)
      return getCurrencySymbolByCountryCode(
        localStorageUtils.get(COUNTRY_CODE) as CountryCodes
      )
    return getCurrencySymbolByCountryCode("GB")
  }

  get currencyCode() {
    if (this.currentUser)
      return countryToCurrency[
        localStorageUtils.get(COUNTRY_CODE) as CountryCodes
      ]
    return "GBP"
  }

  get lowerCaseCountry() {
    if (this.currentUser) return noCase(this.currentUser.country || "")
    return "gb"
  }

  set setUser(user: NonNullable<UserType>) {
    this.user = user
    localStorageUtils.set(USER, JSON.stringify(user))
  }

  get flexData() {
    return (
      this.flexDetails ||
      (JSON.parse(localStorageUtils.get(FLEX) as string) as FlexDataType) ||
      null
    )
  }

  setUserFlexData = (flexDetails: FlexDataType) => {
    runInAction(() => {
      this.flexDetails = flexDetails
    })
    localStorageUtils.set(FLEX, JSON.stringify(flexDetails))
  }

  verifyPhone = () => {
    runInAction(() => {
      this.user = { ...this.currentUser, isPhoneVerified: true } as UserType
    })
    localStorageUtils.set(USER, JSON.stringify(this.user))
  }

  verifyEmail = () => {
    runInAction(() => {
      this.user = { ...this.currentUser, isEmailVerified: true } as UserType
    })
    localStorageUtils.set(USER, JSON.stringify(this.user))
  }

  authenticateUser = (user: UserType) => {
    runInAction(() => {
      this.user = user
    })
    localStorageUtils.set(USER, JSON.stringify(user))
  }

  logout = () => {
    if (!isBrowser()) return
    localStorageUtils.remove(TOKEN)
    localStorageUtils.remove(USER)
    runInAction(() => {
      this.user = null
    })
    navigate(
      `/${localStorageUtils.get(COUNTRY_CODE) || DEFAULT_COUNTRY}/en${
        routes.signin
      }`
    )
  }
}

export default UserStore
