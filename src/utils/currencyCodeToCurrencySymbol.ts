let currency_symbols: string | any = {
  USD: "$", // US Dollar
  AUD: "$", // Australia Dollar
  SGD: "$", //Singapore Dollar
  EUR: "€", // Euro
  CRC: "₡", // Costa Rican Colón
  GBP: "£", // British Pound Sterling
  ILS: "₪", // Israeli New Sheqel
  INR: "₹", // Indian Rupee
  JPY: "¥", // Japanese Yen
  KRW: "₩", // South Korean Won
  NGN: "₦", // Nigerian Naira
  PHP: "₱", // Philippine Peso
  PLN: "zł", // Polish Zloty
  PYG: "₲", // Paraguayan Guarani
  THB: "฿", // Thai Baht
  UAH: "₴", // Ukrainian Hryvnia
  VND: "₫", // Vietnamese Dong
}
const currencyCodeToCurrencySymbol = (currency_name: string) => {
  if (currency_symbols[currency_name] !== undefined) {
    return currency_symbols[currency_name]
  }
}

export default currencyCodeToCurrencySymbol
