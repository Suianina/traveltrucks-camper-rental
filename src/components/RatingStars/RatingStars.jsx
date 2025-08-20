import cn from "classnames";
import Icon from "../Icon/Icon";
import s from "./RatingStars.module.css";

export default function RatingStars({
  value = 0,
  size = 16,
  className,
  filledColor = "#FFC531",
  emptyColor = "#E5E7EB",
  label,
}) {
  const v = Number(value) || 0;
  const clamped = Math.max(0, Math.min(5, v));
  const pct = (clamped / 5) * 100;

  const Stars = (styleVars) => (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon
          key={i}
          name="icon-star"
          size={size}
          className={s.icon}
          style={styleVars}
          aria-hidden="true"
        />
      ))}
    </>
  );

  return (
    <span
      className={cn(s.root, className)}
      style={{ "--size": `${size}px`, "--pct": `${pct}%` }}
      role="img"
      aria-label={label ?? `rating ${clamped} of 5`}
    >
      <span className={cn(s.layer, s.bg)} aria-hidden="true">
        {Stars({ "--color4": emptyColor, "--color5": emptyColor })}
      </span>

      <span className={cn(s.layer, s.fg)} aria-hidden="true">
        {Stars({ "--color4": filledColor, "--color5": filledColor })}
      </span>
    </span>
  );
}
