import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/favoritesSlice";
import cn from "classnames";
import s from "./CamperCard.module.css";

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

          <button
            type="button"
            aria-label="favorite"
            aria-pressed={isFav}
            onClick={() => dispatch(toggleFavorite(camper.id))}
            className={cn(s.fav, isFav && s.favActive)}
          >
            {isFav ? "♥" : "♡"}
          </button>
        </div>

        <p className={s.location}>{camper.location}</p>

        <div className={s.chips}>
          {camper.AC && <span className={s.chip}>AC</span>}
          {camper.kitchen && <span className={s.chip}>Kitchen</span>}
          {camper.bathroom && <span className={s.chip}>Bathroom</span>}
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
