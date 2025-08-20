import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <main className={styles.main}>
      <Helmet>
        <title>TravelTrucks — Home</title>
        <meta
          name="description"
          content="Browse our catalog of campers and rent your perfect campervan with TravelTrucks."
        />
        <meta property="og:title" content="TravelTrucks — Camper rental" />
        <meta
          property="og:description"
          content="Find and rent your perfect campervan."
        />
        <meta property="og:image" content="/img/og-cover.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.overlay}>
          <h1 id="home-title" className={styles.title}>
            Campers of your dreams
          </h1>
          <p className={styles.subtitle}>
            You can find everything you want in our catalog
          </p>
          <Link to="/catalog" className={styles.cta} aria-label="Open catalog">
            View Now
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
