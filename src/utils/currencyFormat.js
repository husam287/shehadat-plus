export default function currencyFormat(num, decimalPlace = 0) {
  return `EGP ${num.toFixed(decimalPlace).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
}
