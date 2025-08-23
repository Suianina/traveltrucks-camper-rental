import { Link } from "react-router-dom";
import cn from "classnames";
import s from "./Button.module.css";

/**
 * Universal Button component
 *
 * Props:
 * - children: вміст кнопки
 * - variant: "primary" | "secondary" | "outline"  (default: "primary")
 * - size: "md" | "lg"                              (default: "md")
 * - as: "button" | "link"                          (default: "button")
 * - to: string                                     (для as="link")
 * - className: string
 * - disabled: boolean
 * - type: "button" | "submit" | "reset"            (для as="button")
 * - ...rest: будь-які інші DOM-атрибути
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  as = "button",
  to,
  className,
  disabled = false,
  type = "button",
  ...rest
}) {
  const classes = cn(s.btn, s[variant], s[size], className);

  if (as === "link") {
    const handleDisabledClick = (e) => {
      if (disabled) e.preventDefault();
      if (disabled && typeof rest.onClick === "function") {
        e.stopPropagation();
      }
    };

    return (
      <Link
        to={to || "#"}
        className={classes}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={handleDisabledClick}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
