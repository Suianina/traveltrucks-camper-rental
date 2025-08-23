// src/components/FavoritesButton/FavoritesButton.jsx
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/favoritesSlice";
import cn from "classnames";
import s from "./FavoritesButton.module.css";
import Icon from "../Icon/Icon";

export default function FavoritesButton({ id, className }) {
  const dispatch = useDispatch();
  const favs = useSelector((st) => st.favorites.ids);

  const sid = String(id ?? "");
  const isFav = sid && favs.includes(sid);

  const onClick = useCallback(() => {
    if (!sid) return;
    dispatch(toggleFavorite(sid));
  }, [dispatch, sid]);

  return (
    <button
      type="button"
      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={!!isFav}
      onClick={onClick}
      disabled={!sid}
      className={cn(s.fav, isFav && s.active, className)}
      title={isFav ? "Remove from favorites" : "Add to favorites"}
    >
      <Icon
        name="icon-heart"
        size={18}
        className="icon"
        style={
          isFav
            ? { "--color2": "#e44848", "--color3": "#e44848" }
            : { "--color2": "#667085", "--color3": "#e5e7eb" }
        }
      />
    </button>
  );
}
