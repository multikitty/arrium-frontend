import { getFilteredCountries } from "./getCountryData"

export const getCountryNameByCode = (country: string) =>
  getFilteredCountries([country.toLowerCase()])[0]?.countryName || country
