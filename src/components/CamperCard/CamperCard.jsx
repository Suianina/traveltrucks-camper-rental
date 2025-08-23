import s from "./CamperCard.module.css";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import FavoritesButton from "../FavoritesButton/FavoritesButton";
import LocationRating from "../LocationRating/LocationRating";
import PriceTag from "../PriceTag/PriceTag";

// формат € 8,000.00
const formatPrice = (n) =>
  Number(n).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

// фолбек-картинка з public
const FALLBACK_IMG = "/img/Picture-2x.jpg";

export default function CamperCard({ camper }) {
  const cover =
    (Array.isArray(camper?.gallery) &&
      (camper.gallery[0]?.thumb || camper.gallery[0])) ||
    FALLBACK_IMG;

  return (
    <article className={s.card}>
      <div className={s.imageWrap}>
        <img
          className={s.thumb}
          src={cover}
          alt={camper?.name || "Camper"}
          loading="lazy"
        />
      </div>

      <div className={s.body}>
        {/* top row: name + price + fav */}
        <header className={s.top}>
          <h3 className={s.name}>{camper.name}</h3>

          <div className={s.right}>
            {camper.price != null && (
              <PriceTag price={camper.price} size="md" />
            )}
            <FavoritesButton id={camper.id} />
          </div>
        </header>

        {/* rating + reviews + location */}
        <div className={s.metaRow}>
          <LocationRating
            id={camper.id}
            rating={camper.rating}
            reviewsCount={camper.reviews?.length || 0}
            location={camper.location}
          />
        </div>

        {camper.description && <p className={s.desc}>{camper.description}</p>}

        {/* чіпси-атрибути */}
        <div className={s.chips}>
          {camper.transmission && (
            <span className={s.chip}>
              <Icon name="icon-diagram" className="icon" size={16} />
              {camper.transmission}
            </span>
          )}
          {camper.engine && (
            <span className={s.chip}>
              <Icon
                name="icon-hugeicons_gas-stove"
                className="icon"
                size={16}
              />
              {camper.engine}
            </span>
          )}
          {camper.AC && (
            <span className={s.chip}>
              <Icon name="icon-wind" className="icon" size={16} />
              AC
            </span>
          )}
          {camper.kitchen && (
            <span className={s.chip}>
              <Icon name="icon-cup-hot" className="icon" size={16} />
              Kitchen
            </span>
          )}
          {camper.bathroom && (
            <span className={s.chip}>
              <Icon name="icon-ph_shower" className="icon" size={16} />
              Bathroom
            </span>
          )}
        </div>

        <Button
          as="link"
          to={`/catalog/${camper.id}`}
          variant="primary"
          size="md"
          className={s.moreBtn}
        >
          Show more
        </Button>
      </div>
    </article>
  );
}
