import css from './Features.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCamperById } from "../../redux/campers/operations.js";
import CategoriesItem from '../CategoriesItem/CategoriesItem.jsx';
import { selectCamper } from '../../redux/campers/selectors.js';

const Features = () => {
    const { camperId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCamperById(camperId))
    }, [camperId, dispatch])

    const camper = useSelector(selectCamper);

    return (
      camper && (
        <div className={css.container}>
          <CategoriesItem camper={camper} />
          <h3 className={css.title}>Vehicle details</h3>
          <ul className={css.list}>
            <li>
              <span>Form</span>
              {camper.form}
            </li>
            <li>
              <span>Length</span>
              {camper.length}
            </li>
            <li>
              <span>Width</span>
              {camper.width}
            </li>
            <li>
              <span>Height</span>
              {camper.height}
            </li>
            <li>
              <span>Tank</span>
              {camper.tank}
            </li>
            <li>
              <span>Consumption</span>
              {camper.consumption}
            </li>
          </ul>
        </div>
      )
    );
}

export default Features;