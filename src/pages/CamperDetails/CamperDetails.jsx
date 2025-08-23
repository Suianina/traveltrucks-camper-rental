// src/pages/CamperDetails/CamperDetails.jsx
import { useEffect, useMemo, useState, useCallback } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";

import { fetchCamperById, clearCurrent } from "../../redux/campersSlice"; // ← шлях під твій store

import Container from "../../components/Container/Container";
import CamperGallery from "../../components/CamperGallery/CamperGallery";
import CamperFeatures from "../../components/CamperFeatures/CamperFeatures";
import BookForm from "../../components/BookForm/BookForm";
import RatingStars from "../../components/RatingStars/RatingStars";
import Icon from "../../components/Icon/Icon";
import Loader from "../../components/Loader/Loader";

import styles from "./CamperDetails.module.css";

const formatPrice = (n) =>
  n != null
    ? `€${Number(n).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : "—";

export default function CamperDetails() {
  const { id } = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const camper = useSelector((s) => s.campers.current);
  const loading = useSelector((s) => s.campers.isLoading);
  const error = useSelector((s) => s.campers.error);

  const [tab, setTab] = useState("features");

  useEffect(() => {
    const q = new URLSearchParams(search);
    const t = q.get("tab");
    if (t === "reviews" || t === "features") setTab(t);
  }, [search]);

  useEffect(() => {
    if (id) dispatch(fetchCamperById(id));
    return () => dispatch(clearCurrent());
  }, [id, dispatch]);

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

  const setTabAndUrl = useCallback(
    (t) => {
      setTab(t);
      const q = new URLSearchParams(search);
      q.set("tab", t);
      navigate({ search: q.toString() }, { replace: true });
    },
    [navigate, search]
  );

  const onTabsKeyDown = useCallback(
    (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const order = ["features", "reviews"];
      const idx = order.indexOf(tab);
      const next =
        e.key === "ArrowRight"
          ? order[(idx + 1) % order.length]
          : order[(idx - 1 + order.length) % order.length];
      setTabAndUrl(next);
    },
    [tab, setTabAndUrl]
  );

  if (loading)
    return (
      <Container as="main" className={styles.main} aria-busy="true">
        <Loader size="lg" />
      </Container>
    );

  if (error)
    return (
      <Container as="main" className={styles.main}>
        <p className={styles.error}>Error: {error}</p>
      </Container>
    );

  if (!camper)
    return (
      <Container as="main" className={styles.main}>
        <p className={styles.muted}>Camper not found.</p>
      </Container>
    );

  const reviewsCount = camper.reviews?.length || 0;
  const images = Array.isArray(camper.gallery)
    ? camper.gallery
        .map((g) =>
          typeof g === "string" ? g : g?.thumb || g?.original || g?.url || null
        )
        .filter(Boolean)
    : [];

  return (
    <Container as="main" className={styles.main} aria-busy="false">
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
            <RatingStars value={ratingValue} size={16} />
            <span className={styles.metaText}>
              {ratingValue} ({reviewsCount} Reviews)
            </span>
          </span>
        )}
        {camper.location && (
          <span className={styles.metaItem}>
            <Icon
              name="icon-City" /* ← новий id */
              size={16}
              className={`icon ${styles.iconGray}`}
            />
            <span className={styles.metaText}>{camper.location}</span>
          </span>
        )}
      </div>

      {images.length > 0 && (
        <div className={styles.gallery}>
          <CamperGallery images={images} name={camper.name} />
        </div>
      )}

      {camper.description && (
        <p className={styles.description}>{camper.description}</p>
      )}

      <div
        className={styles.tabs}
        role="tablist"
        aria-label="Camper details tabs"
        onKeyDown={onTabsKeyDown}
      >
        <button
          id="tab-features"
          type="button"
          role="tab"
          aria-controls="panel-features"
          aria-selected={tab === "features"}
          className={`${styles.tabBtn} ${
            tab === "features" ? styles.active : ""
          }`}
          onClick={() => setTabAndUrl("features")}
        >
          Features
        </button>
        <button
          id="tab-reviews"
          type="button"
          role="tab"
          aria-controls="panel-reviews"
          aria-selected={tab === "reviews"}
          className={`${styles.tabBtn} ${
            tab === "reviews" ? styles.active : ""
          }`}
          onClick={() => setTabAndUrl("reviews")}
        >
          Reviews
        </button>
      </div>

      <div className={styles.grid}>
        <section
          id="panel-features"
          role="tabpanel"
          aria-labelledby="tab-features"
          hidden={tab !== "features"}
          className={styles.left}
          aria-live="polite"
        >
          <CamperFeatures camper={camper} />
        </section>

        <section
          id="panel-reviews"
          role="tabpanel"
          aria-labelledby="tab-reviews"
          hidden={tab !== "reviews"}
          className={styles.left}
          aria-live="polite"
        >
          <Reviews reviews={camper.reviews || []} />
        </section>

        <aside className={styles.right}>
          <BookForm camperName={camper.name} />
        </aside>
      </div>
    </Container>
  );
}

function Reviews({ reviews }) {
  if (!reviews?.length) return <p className={styles.muted}>No reviews yet.</p>;
  return (
    <ul className={styles.reviews}>
      {reviews.map((r, i) => (
        <li key={i} className={styles.reviewItem}>
          <div className={styles.avatar}>
            {r.reviewer_name?.[0]?.toUpperCase() || "U"}
          </div>
          <div className={styles.reviewBody}>
            <div className={styles.reviewHead}>
              <strong>{r.reviewer_name || "User"}</strong>
              <RatingStars value={r.rating || 0} size={16} />
            </div>
            <p className={styles.reviewText}>{r.comment}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
