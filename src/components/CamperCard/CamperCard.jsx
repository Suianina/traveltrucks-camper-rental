import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/favoritesSlice";
import cn from "classnames";
import s from "./CamperCard.module.css";
import Icon from "../Icon/Icon";

const formatPrice = (n) => `${Number(n).toFixed(2)}`;

const CamperCard = ({ camper }) => {
  const dispatch = useDispatch();
  const favs = useSelector((st) => st.favorites.ids);
  const isFav = favs.includes(String(camper.id));

  return (
    <article className={s.card}>
      <img className={s.thumb} src={camper.gallery?.[0]} alt={camper.name} />

      <div className={s.body}>
        <div className={s.top}>
          <h3 className={s.name}>{camper.name}</h3>

          <div className={s.right}>
            {camper.price != null && (
              <span className={s.price}>{formatPrice(camper.price)}</span>
            )}

            <button
              type="button"
              aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
              aria-pressed={isFav}
              onClick={() => dispatch(toggleFavorite(camper.id))}
              className={cn(s.fav, isFav && s.favActive)}
              title={isFav ? "Remove from favorites" : "Add to favorites"}
            >
              <Icon
                name="heart"
                className="icon"
                size={18}
                style={
                  isFav
                    ? { "--color2": "#e44848", "--color3": "#e44848" }
                    : { "--color2": "#667085", "--color3": "#e5e7eb" }
                }
              />
            </button>
          </div>
        </div>

        {camper.location && (
          <p className={s.location}>
            <Icon
              name="bi_grid-3x3-gap"
              className={`icon ${s.locIcon}`}
              size={16}
              style={{ "--color1": "#667085" }}
            />
            {camper.location}
          </p>
        )}

        <div className={s.chips}>
          {camper.AC && (
            <span className={s.chip}>
              <Icon
                name="wind"
                className="icon"
                size={16}
                style={{ "--color1": "#667085" }}
              />
              AC
            </span>
          )}
          {camper.kitchen && (
            <span className={s.chip}>
              <Icon name="cup-hot" className="icon" size={16} />
              Kitchen
            </span>
          )}
          {camper.bathroom && (
            <span className={s.chip}>
              <Icon name="ph_shower" className="icon" size={16} />
              Bathroom
            </span>
          )}
        </div>

        <a
          href={`/catalog/${camper.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={s.moreBtn}
        >
          Show more
        </a>
      </div>
    </article>
  );
};

export default CamperCard;
