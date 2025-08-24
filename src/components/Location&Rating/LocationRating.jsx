import css from './LocationRating.module.css';
import clsx from 'clsx';
import Icon from '../Icon/Icon';
import { Link } from 'react-router-dom';

const LocationRating = ({id, rating, location, numberReviews, className = ""}) => {
    return (
      <div className={clsx(css.container, className)}>
        <Icon id="icon-star" width={16} height={16} className={css.star} />
        <Link className={css.reviews} to={`/catalog/${id}/reviews`}>
          {rating}({numberReviews}Reviews)
        </Link>
        <Icon id="icon-Map" width={16} height={16} className={css.map} />
        <p>{location}</p>
      </div>
    );
}
export default LocationRating