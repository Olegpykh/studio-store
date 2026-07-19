export function formatPrice(amount: string, currencyCode: string) {
  const value = Number(amount).toFixed(2);
  if (currencyCode === 'EUR') return `${value} €`;
  return `${value} ${currencyCode}`;
}
