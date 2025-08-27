import icons from "../../img/symbol-defs.svg";

const Icon = ({ id, width, height, className = "" }) => (
  <svg
    className={className}
    width={width}
    height={height}
    aria-hidden="true"
    fill="currentColor"
  >
    <use href={`${icons}#${id}`} />
  </svg>
);

export default Icon;
