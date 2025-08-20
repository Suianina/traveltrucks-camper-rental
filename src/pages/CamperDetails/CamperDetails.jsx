import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import styles from "./CamperDetails.module.css";
import BookForm from "../../components/BookForm/BookForm";
import RatingStars from "../../components/RatingStars/RatingStars";
import Icon from "../../components/Icon/Icon";

const API =
  import.meta.env.VITE_API_URL || "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";

const formatPrice = (n) => (n != null ? `${Number(n).toFixed(2)}` : "—");

export default function CamperDetails() {
  const { id } = useParams();
  const [camper, setCamper] = useState(null);
  const [tab, setTab] = useState("features");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError("");
    axios
      .get(`${API}/campers/${id}`)
      .then(({ data }) => {
        if (!ignore) setCamper(data);
      })
      .catch((e) => !ignore && setError(e.message || "Failed to load"))
      .finally(() => !ignore && setLoading(false));
    return () => {
      ignore = true;
    };
  }, [id]);

  const ratingValue = useMemo(() => {
    if (!camper) return null;
    if (typeof camper.rating === "number") return camper.rating;
    const rev = camper.reviews || [];
    if (!rev.length) return null;
    const avg = rev.reduce((s, r) => s + (r.rating || 0), 0) / rev.length;
    return Math.round(avg * 10) / 10;
  }, [camper]);

  const pageTitle = camper
    ? `${camper.name} — Details | TravelTrucks`
    : "Camper details | TravelTrucks";
  const pageDesc = camper?.description?.slice(0, 160) || "Camper details";

  if (loading)
    return (
      <main className={styles.main}>
        <p>Loading…</p>
      </main>
    );
  if (error)
    return (
      <main className={styles.main}>
        <p className={styles.error}>{error}</p>
      </main>
    );
  if (!camper) return null;

  return (
    <main className={styles.main}>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
      </Helmet>

      <div className={styles.headerRow}>
        <h1 className={styles.title}>{camper.name}</h1>
        <div className={styles.price}>{formatPrice(camper.price)}</div>
      </div>

      <div className={styles.meta}>
        {ratingValue != null && (
          <span className={styles.metaItem}>
            <RatingStars value={ratingValue} />
            <span className={styles.metaText}>{ratingValue}</span>
          </span>
        )}
        {camper.location && (
          <span className={styles.metaItem}>
            <Icon
              name="icon-bi_grid-3x3-gap"
              size={16}
              color="#667085"
              className="icon"
            />
            <span className={styles.metaText}>{camper.location}</span>
          </span>
        )}
      </div>

      {Array.isArray(camper.gallery) && camper.gallery.length > 0 && (
        <div className={styles.gallery}>
          {camper.gallery.map((src, i) => (
            <img key={i} src={src} alt={`${camper.name} ${i + 1}`} />
          ))}
        </div>
      )}

      {camper.description && (
        <p className={styles.description}>{camper.description}</p>
      )}

      <div
        className={styles.tabs}
        role="tablist"
        aria-label="Camper details tabs"
      >
        <button
          type="button"
          role="tab"
          aria-selected={tab === "features"}
          className={`${styles.tabBtn} ${
            tab === "features" ? styles.active : ""
          }`}
          onClick={() => setTab("features")}
        >
          Features
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "reviews"}
          className={`${styles.tabBtn} ${
            tab === "reviews" ? styles.active : ""
          }`}
          onClick={() => setTab("reviews")}
        >
          Reviews
        </button>
      </div>

      <div className={styles.grid}>
        <section className={styles.left} aria-live="polite">
          {tab === "features" ? (
            <Features camper={camper} />
          ) : (
            <Reviews reviews={camper.reviews || []} />
          )}
        </section>

        <aside className={styles.right}>
          <BookForm camperName={camper.name} />
        </aside>
      </div>
    </main>
  );
}

function Features({ camper }) {
  const items = [
    camper.transmission && {
      key: "transmission",
      label: `Transmission: ${camper.transmission}`,
      name: "icon-bi_grid",
    },
    camper.engine && {
      key: "engine",
      label: `Engine: ${camper.engine}`,
      name: "icon-diagram",
    },
    camper.AC && { key: "AC", label: "AC", name: "icon-wind" },
    camper.bathroom && {
      key: "bathroom",
      label: "Bathroom",
      name: "icon-ph_shower",
    },
    camper.kitchen && {
      key: "kitchen",
      label: "Kitchen",
      name: "icon-cup-hot",
    },
    camper.TV && { key: "TV", label: "TV", name: "icon-tv" },
    camper.radio && { key: "radio", label: "Radio", name: "icon-bi_grid-1x2" },
    camper.refrigerator && {
      key: "refrigerator",
      label: "Refrigerator",
      name: "icon-solar_fridge-outline",
    },
    camper.microwave && {
      key: "microwave",
      label: "Microwave",
      name: "icon-lucide_microwave",
    },
    camper.gas && {
      key: "gas",
      label: "Gas",
      name: "icon-hugeicons_gas-stove",
    },
    camper.water && {
      key: "water",
      label: "Water",
      name: "icon-ion_water-outline",
    },
  ].filter(Boolean);

  return (
    <>
      <div className={styles.featureChips}>
        {items.map(({ key, label, name }) => (
          <span key={key} className={styles.chip}>
            <Icon name={name} size={16} color="#667085" className="icon" />
            {label}
          </span>
        ))}
      </div>

      <h3 className={styles.subTitle}>Vehicle details</h3>
      <dl className={styles.detailsList}>
        {[
          ["Form", camper.form],
          ["Length", camper.length ? `${camper.length} m` : null],
          ["Width", camper.width ? `${camper.width} m` : null],
          ["Height", camper.height ? `${camper.height} m` : null],
          ["Tank", camper.tank ? `${camper.tank} l` : null],
          [
            "Consumption",
            camper.consumption ? `${camper.consumption} l/100km` : null,
          ],
        ]
          .filter(([, v]) => v)
          .map(([k, v]) => (
            <div key={k} className={styles.dlRow}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
      </dl>
    </>
  );
}

function Reviews({ reviews }) {
  if (!reviews?.length) return <p className={styles.muted}>No reviews yet.</p>;
  return (
    <ul className={styles.reviews}>
      {reviews.map((r, i) => (
        <li key={i} className={styles.reviewItem}>
          <div className={styles.avatar}>{r.reviewer_name?.[0] || "U"}</div>
          <div className={styles.reviewBody}>
            <div className={styles.reviewHead}>
              <strong>{r.reviewer_name || "User"}</strong>
              <RatingStars value={r.rating || 0} />
            </div>
            <p className={styles.reviewText}>{r.comment}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
