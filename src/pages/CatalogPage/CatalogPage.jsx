import Header from "../../components/Header/Header";
import CampersList from "../../components/CampersList/CampersList";
import Filters from "../../components/Filters/Filters";
import css from "./CatalogPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllCampers,
  selectFilter,
  selectPage,
  selectPerPage,
  selectTotal,
} from "../../redux/campers/selectors.js";
import { useEffect } from "react";
import { fetchCampers } from "../../redux/campers/operations.js";
import { clearItems, setPage } from "../../redux/campers/slice.js";
import Button from "../../components/Button/Button";

const Catalog = () => {
  const dispatch = useDispatch();
  const campers = useSelector(selectAllCampers);
  const total = useSelector(selectTotal);
  const perPage = useSelector(selectPerPage);
  const page = useSelector(selectPage);
  const filter = useSelector(selectFilter);
  const totalPage = Math.ceil((total || 0) / (perPage || 1));

  useEffect(() => {
    dispatch(clearItems());
  }, [dispatch, filter]);

  useEffect(() => {
    dispatch(fetchCampers({ page, perPage, filter }));
  }, [dispatch, page, perPage, filter]);

  const handleClick = () => {
    dispatch(setPage());
  };

  return (
    <>
      <Header />
      <div className={css.container}>
        <Filters />
        <div className={css.catalog}>
          {campers.length !== 0 ? (
            <ul className={css.list}>
              <CampersList />
            </ul>
          ) : (
            <p>Not Found, try again or change filter</p>
          )}

          {totalPage > page && (
            <Button className={css.btn} onClick={handleClick}>
              Load More
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
export default Catalog;
