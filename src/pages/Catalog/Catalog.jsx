import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers, resetCampers } from "../../redux/campersSlice";
import CamperCard from "../../components/CamperCard/CamperCard";
import s from "./Catalog.module.css";
import Filters from "../../components/Filters/Filters";

const Catalog = () => {
  const dispatch = useDispatch();
  const { items, isLoading, page, limit, hasMore, error } = useSelector(
    (st) => st.campers
  );
  const filters = useSelector((st) => st.filters);

  useEffect(() => {
    dispatch(resetCampers());
    dispatch(fetchCampers({ page: 1, limit, filters }));
  }, [dispatch, filters]);

  const loadMore = () =>
    dispatch(fetchCampers({ page: page + 1, limit, filters }));

  return (
    <main className={s.main} aria-busy={isLoading}>
      <Helmet>
        <title>TravelTrucks — Catalog</title>
        <meta
          name="description"
          content="Browse all campers with filters by location, body type and features. Load more to see additional campers."
        />
      </Helmet>

      <aside className={s.sidebar}>
        <Filters />
      </aside>

      <section className={s.content}>
        {items.map((c) => (
          <CamperCard key={c.id} camper={c} />
        ))}

        {error && <div className={s.error}>⚠️ {error}</div>}
        {isLoading && <div className={s.loading}>Loading…</div>}
        {!isLoading && !items.length && !error && (
          <div className={s.empty}>No campers found. Try changing filters.</div>
        )}
        {hasMore && !isLoading && (
          <button className={s.loadMore} onClick={loadMore}>
            Load more
          </button>
        )}
      </section>
    </main>
  );
};

export default Catalog;
