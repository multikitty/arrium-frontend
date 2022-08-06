import { allCountries } from "country-region-data"

export interface RegionData {
  name: string
  shortCode: string
}

export interface CountryData {
  countryName: string
  countryShortName: string
  regions: RegionData[]
}
export type CountryListData = Record<string, CountryData>

const getCountryData = () => {
  let countryData: CountryListData = {}
  allCountries.forEach(country => {
    countryData[country[1]] = {
      countryName: country[0],
      countryShortName: country[1],
      regions: country[2].map(region => ({
        name: region[0],
        shortCode: region[1],
      })),
    }
  })
  return countryData
}

export const getFilteredCountries = (filterCountryList: string[]) =>
  Object.values(getCountryData()).filter(c =>
    filterCountryList.includes(c.countryShortName.toLowerCase())
  )

export default getCountryData
