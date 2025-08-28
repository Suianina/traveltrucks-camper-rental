import css from "./CardReviews.module.css";
import Icon from "../Icon/Icon.jsx";

const CardReview = ({ info }) => {
  const ratingStar = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <li key={i} className={css.itemStars}>
          <Icon
            id="icon-star"
            width={16}
            height={16}
            className={i < rating ? css.star : css.starDisable}
          />
        </li>
      );
    }
    return stars;
  };

  return (
    <div className={css.reviewItem}>
      <div className={css.container}>
        <span className={css.avatar}>{info.reviewer_name[0]}</span>
        <div>
          <p className={css.name}>{info.reviewer_name}</p>
          <ul className={css.list}>{ratingStar(info.reviewer_rating)}</ul>
        </div>
      </div>
      <p>{info.comment}</p>
    </div>
  );
};

export default CardReview;
