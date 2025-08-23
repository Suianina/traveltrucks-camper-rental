// src/components/Icon/Icon.jsx
import cn from "classnames";

export default function Icon({
  name,
  id,
  size = 20,
  width,
  height,
  className,
  inline = false, // true, якщо <svg> спрайт інлайном у index.html
  ...rest
}) {
  const symbol = (name || id || "").replace(/^#/, "");
  if (!symbol) return null;

  const base = import.meta.env.BASE_URL || "/";
  const href = inline ? `#${symbol}` : `${base}icons/sprite.svg#${symbol}`;

  const w = width ?? size;
  const h = height ?? size;

  return (
    <svg
      className={cn("icon", className)}
      width={w}
      height={h}
      aria-hidden={rest["aria-label"] ? undefined : true}
      focusable="false"
      {...rest}
    >
      <use href={href} />
    </svg>
  );
}
