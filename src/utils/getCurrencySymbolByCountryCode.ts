import countryToCurrency from "country-to-currency"
import getSymbolFromCurrency from "currency-symbol-map"

export type CountryCodes = keyof typeof countryToCurrency

const getCurrencySymbolByCountryCode = (country: CountryCodes) =>
  getSymbolFromCurrency(countryToCurrency[country])

export default getCurrencySymbolByCountryCode
