import cn from "classnames";
import s from "./RatingStars.module.css";

export default function RatingStars({
  value = 0,
  size = 16,
  className,
  filledColor = "#FFC531",
  emptyColor = "#E5E7EB",
  label,
}) {
  const full = Math.round(Number(value) || 0);

  return (
    <span
      className={cn(s.root, className)}
      style={{
        "--size": `${size}px`,
        "--filled": filledColor,
        "--empty": emptyColor,
      }}
      aria-label={label ?? `rating ${value} of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn(s.star, i < full ? s.filled : s.empty)}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </span>
  );
}
