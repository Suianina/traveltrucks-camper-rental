import { NavLink, Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const getActive = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} aria-label="TravelTrucks home">
          <img
            src="/img/Logo.svg"
            alt="TravelTrucks"
            className={styles.logoImg}
          />
        </Link>

        <nav className={styles.nav}>
          <NavLink to="/" className={getActive}>
            Home
          </NavLink>
          <NavLink to="/catalog" className={getActive}>
            Catalog
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
