import cn from "classnames";
import s from "./Container.module.css";

/**
 * Контейнер для центрування і обмеження ширини.
 * Використовує токени: --container-width, --container-padding.
 *
 * Props:
 * - as: тег ("div" | "main" | "section" | ...)
 * - fluid: без обмеження max-width
 * - className: дод. класи
 */
export default function Container({
  as: Tag = "div",
  fluid = false,
  className,
  children,
  ...rest
}) {
  return (
    <Tag className={cn(s.box, fluid && s.fluid, className)} {...rest}>
      {children}
    </Tag>
  );
}
