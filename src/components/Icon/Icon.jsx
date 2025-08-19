const Icon = ({
  name,
  size = 20,
  color = "currentColor",
  className,
  label,
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
    >
      {label ? <title>{label}</title> : null}
      <use href={href} xlinkHref={href} />
    </svg>
  );
};

export default Icon;
