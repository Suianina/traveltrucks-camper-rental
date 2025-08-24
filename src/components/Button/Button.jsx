import { Link } from "react-router-dom";
import css from "./Button.module.css";

const Button = ({ to, children, className = css.btn, ...props }) => {
  return to ? (
    <Link to={to} className={className} {...props}>
      {children}
    </Link>
  ) : (
    <button type="button" className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;
