import Header from '../../components/Header/Header';
import CampersList from '../../components/CampersList/CampersList';
import Filters from '../../components/Filters/Filters';
import css from './CatalogPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectAllCampers, 
    selectFilter,
    selectPage,
    selectPerPage,
    selectTotal
} from '../../redux/campers/selectors.js';
import { useEffect, useState } from 'react'; 
import { fetchCampers } from '../../redux/campers/operations.js';
import { clearItems, setPage } from '../../redux/campers/slice.js';
import Button from '../../components/Button/Button';

const Catalog = () => {
    const campers = useSelector(selectAllCampers);
    const total = useSelector(selectTotal);
    const perPage = useSelector(selectPerPage);
    const totalPage = Math.ceil(total / perPage);
    const page = useSelector(selectPage);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const filter =  useSelector(selectFilter);

    const dispatch = useDispatch();
useEffect(() => {
  if (isFirstRender) {
    setIsFirstRender(false);
    return;
  }

  if (filter) {
    dispatch(clearItems()); // Видалено [] — ця функція не потребує аргументів
  }

  const query = Object.fromEntries(
    Object.entries(filter).filter(
      ([, values]) => values !== false && values !== ""
    )
  );
  const queryString = new URLSearchParams(query).toString();

  dispatch(fetchCampers({ page, perPage, filter: queryString }));
}, [dispatch, isFirstRender, page, perPage, filter]);
    
    
    const handleClick = () => {
        dispatch(setPage())
    };

    return (
        <>
            <Header/>
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