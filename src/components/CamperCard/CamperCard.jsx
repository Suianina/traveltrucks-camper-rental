import css from "./CamperCard.module.css";
import LocationRating from "../Location&Rating/LocationRating";
import CategoriesItem from "../CategoriesItem/CategoriesItem";
import PriceTag from "../PriceTag/PriceTag";
import imgDefault from "../../img/imgDefault.jpg";
import Icon from "../Icon/Icon";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorite,
  deleteFromFavorite,
} from "../../redux/campers/slice.js";
import { selectFavoriteItems } from "../../redux/campers/selectors.js";
import clsx from "clsx";

const CamperCard = ({ camper }) => {
  const dispatch = useDispatch();
  const favoriteItems = useSelector(selectFavoriteItems);

  const isFavorite =
    Array.isArray(favoriteItems) &&
    favoriteItems.find((favorite) => favorite.id === camper.id);

  const handleClick = () => {
    if (isFavorite) {
      dispatch(deleteFromFavorite(camper.id));
      return;
    }
    dispatch(addToFavorite(camper));
  };

  const thumb = camper?.gallery?.[0]?.thumb || imgDefault;

  return (
    <div className={css.container}>
      <div className={css.wrapperForImage}>
        <img className={css.image} src={thumb} alt={camper.name} height="320" />
      </div>

      <div className={css.containerDescr}>
        <div className={css.header}>
          <h2 className={css.title}>{camper.name}</h2>
          <div className={css.containerPrice}>
            <PriceTag price={camper.price} />
            <button
              aria-label="Add to Favorite"
              className={clsx(css.addFavorite, isFavorite && css.favorite)}
              onClick={handleClick}
            >
              <Icon
                id="icon-Favorite"
                width={26}
                height={24}
                className={css.icon}
              />
            </button>
          </div>
        </div>

        <LocationRating
          id={camper.id}
          rating={camper.rating}
          numberReviews={camper.reviews.length}
          location={camper.location}
          className={css.location}
        />

        <p className={css.text}>{camper.description}</p>
        <CategoriesItem camper={camper} />

        <Link
          className={css.link}
          to={`/catalog/${camper.id}/features`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Show more
        </Link>
      </div>
    </div>
  );
};

export default CamperCard;
