import { Link } from "react-router-dom";
import cn from "classnames";
import RatingStars from "../RatingStars/RatingStars";
import Icon from "../Icon/Icon";
import s from "./LocationRating.module.css";

export default function LocationRating({
  id,
  rating = 0,
  reviewsCount = 0,
  location = "",
  className,
}) {
  const r = Number(rating) || 0;

  return (
    <div className={cn(s.wrap, className)}>
      <span className={s.rating}>
        <RatingStars value={r} size={16} />
        <Link className={s.reviews} to={`/catalog/${id}?tab=reviews`}>
          {r.toFixed(1)} ({reviewsCount} Reviews)
        </Link>
      </span>

      {location && (
        <span className={s.location}>
          <Icon name="icon-Map" size={16} className="icon" />
          {location}
        </span>
      )}
    </div>
  );
}
