interface Props {
  amount: number;
  currency: "USD" | "IDR" | "EUR";
}
export function formatCurrency({ amount, currency }: Props) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: currency,
  }).format(amount);
}
