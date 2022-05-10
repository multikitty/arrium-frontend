import countryToCurrency from "country-to-currency"

const mockPlansData: Record<string, IMockPlans[]> = {
  ES: [
    {
      countryName: "Spain",
      countryCode: "ES",
      productName: "Logistics Only",
      currency: countryToCurrency["ES"],
      price: 25,
    },
    {
      countryName: "Spain",
      countryCode: "ES",
      productName: "All Service Areas",
      currency: countryToCurrency["ES"],
      price: 35,
    },
    {
      countryName: "Spain",
      countryCode: "ES",
      productName: "Prime Now Groceries Only",
      currency: countryToCurrency["ES"],
      price: 45,
    },
  ],
  GB: [
    {
      countryName: "United Kingdom of Great Britain and Northern Ireland",
      countryCode: "GB",
      productName: "Logistics Only",
      currency: countryToCurrency["GB"],
      price: 30,
    },
  ],
}

export interface IMockPlans {
  productName: string
  currency: string
  countryName: string
  countryCode: string
  price: number
}

export default mockPlansData
