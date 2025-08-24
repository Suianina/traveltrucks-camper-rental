import { NavLink } from "react-router-dom";
import Logo from '../../img/Logo.svg';
import  Container from '../Container/Container.jsx';
import css from './Header.module.css';

const Header = () => {
  return (
    <Container>
      <header className={css.header}>
        <div className={css.container}>
          <NavLink to="/">
            <img
              src={Logo}
              className={css.logoIcon}
              alt="Logo"
              width="136"
              height="16"
            />
          </NavLink>
        </div>
        <nav>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? css.active : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/catalog"
            className={({ isActive }) => (isActive ? css.active : "")}
          >
            Catalog
          </NavLink>
        </nav>
      </header>
    </Container>
  );
}
export default Header;