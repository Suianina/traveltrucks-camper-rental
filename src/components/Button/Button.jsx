import css from './Button.module.css';
import { Link } from 'react-router-dom';

const Button = ({to, children, className = css.btn, ...props}) => {
    return (
    <Link to={to} className={className} {...props}>{children}</Link>
)
}
export default Button 