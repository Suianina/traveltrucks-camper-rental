import { Helmet } from "react-helmet-async";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import s from "./Home.module.css";

export default function Home() {
  return (
    <Container as="main" className={s.main}>
      <Helmet>
        <title>TravelTrucks — Home</title>
        <meta
          name="description"
          content="Campers of your dreams. You can find everything you want in our catalog."
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

      <section className={s.hero} aria-labelledby="home-title">
        <div className={s.overlay}>
          <h1 id="home-title" className={s.title}>
            Campers of your dreams
          </h1>
          <p className={s.subtitle}>
            You can find everything you want in our catalog
          </p>
          <Button
            as="link"
            to="/catalog"
            variant="primary"
            size="lg"
            className={s.cta}
            aria-label="Open catalog"
          >
            View Now
          </Button>
        </div>
      </section>
    </Container>
  );
}
