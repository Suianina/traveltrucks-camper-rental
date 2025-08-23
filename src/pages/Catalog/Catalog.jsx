import { useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers, resetCampers } from "../../redux/campersSlice";

import Container from "../../components/Container/Container";
import CamperCard from "../../components/CamperCard/CamperCard";
import Filters from "../../components/Filters/Filters";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";

import s from "./Catalog.module.css";

export default function Catalog() {
  const dispatch = useDispatch();
  const { items, isLoading, page, limit, hasMore, error } = useSelector(
    (st) => st.campers
  );
  const filters = useSelector((st) => st.filters);

  // 1) перше завантаження (без автозапитів при зміні filters)
  useEffect(() => {
    dispatch(resetCampers());
    dispatch(fetchCampers({ page: 1, limit, filters }));
  }, [dispatch, limit]); // зміни фільтрів підтверджуємо кнопкою Search

  // 2) пошук по кнопці
  const handleSearch = useCallback(() => {
    dispatch(resetCampers());
    dispatch(fetchCampers({ page: 1, limit, filters }));
  }, [dispatch, limit, filters]);

  // 3) догрузка
  const loadMore = useCallback(() => {
    if (!isLoading) {
      dispatch(fetchCampers({ page: page + 1, limit, filters }));
    }
  }, [dispatch, isLoading, page, limit, filters]);

  return (
    <Container as="main" className={s.main} aria-busy={isLoading}>
      <Helmet>
        <title>TravelTrucks — Catalog</title>
        <meta
          name="description"
          content="Browse campers with filters by location, body type, and equipment. Load more to see additional campers."
        />
      </Helmet>

      {/* Ліва колонка — фільтри */}
      <aside className={s.sidebar}>
        <Filters onSearch={handleSearch} />
      </aside>

      {/* Права колонка — список */}
      <section className={s.content} aria-live="polite">
        {items.map((c) => (
          <CamperCard key={c.id} camper={c} />
        ))}

        {error && <div className={s.error}>⚠️ {error}</div>}

        {isLoading && (
          <div className={s.loading}>
            <Loader size="lg" />
          </div>
        )}

        {!isLoading && !items.length && !error && (
          <div className={s.empty}>No campers found. Try changing filters.</div>
        )}

        {hasMore && (
          <Button
            variant="outline"
            size="md"
            onClick={loadMore}
            className={s.loadMore}
            disabled={isLoading}
          >
            Load more
          </Button>
        )}
      </section>
    </Container>
  );
}

