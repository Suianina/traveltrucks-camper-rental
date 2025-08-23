// src/pages/NotFound/NotFound.jsx
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import s from "./NotFound.module.css";

export default function NotFound() {
  return (
    <Container as="main" className={s.wrap}>
      <Helmet>
        <title>Page not found — TravelTrucks</title>
        <meta
          name="description"
          content="The page you’re looking for doesn’t exist or was moved."
        />
      </Helmet>

      <section className={s.box} aria-labelledby="nf-title">
        <p className={s.code} aria-hidden="true">
          404
        </p>
        <h1 id="nf-title" className={s.title}>
          Page not found
        </h1>
        <p className={s.desc}>
          The page you’re looking for doesn’t exist or was moved.
        </p>

        <div className={s.actions}>
          <Button
            as="link"
            to="/"
            variant="primary"
            size="lg"
            className={s.btn}
          >
            Go to Home
          </Button>
          <Button
            as="link"
            to="/catalog"
            variant="outline"
            size="lg"
            className={s.btn}
          >
            Browse Catalog
          </Button>
        </div>

        <Link to="/" className={s.textLink}>
          ← Back to Home
        </Link>
      </section>
    </Container>
  );
}
