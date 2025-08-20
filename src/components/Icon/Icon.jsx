const Icon = ({
  name,
  size = 20,
  color = "currentColor",
  className,
  label,
  style,
  ...rest
}) => {
  const href = `${import.meta.env.BASE_URL}icons/sprite.svg#${name}`;

  return (
    <svg
      width={size}
      height={size}
      fill={color}
      className={className}
      role={label ? "img" : undefined}
      aria-hidden={label ? undefined : true}
      focusable="false"
      style={style}
      {...rest}
    >
      {label ? <title>{label}</title> : null}
      <use href={href} xlinkHref={href} />
    </svg>
  );
};

export default Icon;
