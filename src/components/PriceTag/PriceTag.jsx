import cn from "classnames";
import s from "./PriceTag.module.css";

/**
 * Форматує число як "€ 8,000.00" (за замовчуванням).
 * Можеш змінити символ валюти через prop currencySymbol.
 */
function formatPrice(value, { currencySymbol = "€" } = {}) {
  if (value == null || Number.isNaN(Number(value))) return "—";
  const num = Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${currencySymbol}${num}`;
}

/**
 * <PriceTag price={7999} />
 * <PriceTag price={7999} size="lg" />
 * <PriceTag price={7999} currencySymbol="$" suffix="/ day" />
 */
export default function PriceTag({
  price,
  currencySymbol = "€",
  size = "md", // "md" | "lg"
  suffix, // напр. "/ day"
  className,
  ...rest
}) {
  const text = formatPrice(price, { currencySymbol });

  return (
    <span className={cn(s.price, s[size], className)} role="text" {...rest}>
      {text}
      {suffix && <span className={s.suffix}>&nbsp;{suffix}</span>}
    </span>
  );
}
