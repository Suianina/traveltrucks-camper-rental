import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.overlay}>
          <h1 className={styles.title}>Campers of your dreams</h1>
          <p className={styles.subtitle}>
            You can find everything you want in our catalog
          </p>
          <button
            type="button"
            className={styles.cta}
            onClick={() => navigate("/catalog")}
          >
            View Now
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
