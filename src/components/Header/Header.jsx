import { NavLink, Link } from "react-router-dom";
import Container from "../Container/Container";
import s from "./Header.module.css";

const Header = () => {
  const getActive = ({ isActive }) =>
    isActive ? `${s.link} ${s.active}` : s.link;

  return (
    <header className={s.header}>
      <Container className={s.container}>
        <div className={s.inner}>
          <Link to="/" className={s.logo} aria-label="TravelTrucks home">
            <img src="/img/Logo.svg" alt="TravelTrucks" className={s.logoImg} />
          </Link>

          <nav className={s.nav}>
            <NavLink to="/" className={getActive}>
              Home
            </NavLink>
            <NavLink to="/catalog" className={getActive}>
              Catalog
            </NavLink>
          </nav>
        </div>
      </Container>
    </header>
  );
};
export default Header;
