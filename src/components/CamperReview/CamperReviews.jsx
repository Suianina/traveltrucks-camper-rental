// src/components/CamperReviews/CamperReviews.jsx
import CamperReview from "../CamperReview/CamperReview";
import s from "./CamperReviews.module.css";

export default function CamperReviews({ reviews = [] }) {
  if (!Array.isArray(reviews) || reviews.length === 0) {
    return <p className={s.empty}>No reviews yet.</p>;
  }

  return (
    <ul className={s.list} aria-label={`Reviews (${reviews.length})`}>
      {reviews.map((rev, i) => {
        // стабільний ключ: id або комбінація імені+дати
        const key =
          rev.id ??
          `${rev.reviewer_name || rev.name || "anon"}-${rev.date || i}`;
        return (
          <li key={key} className={s.item}>
            <CamperReview review={rev} />
          </li>
        );
      })}
    </ul>
  );
}
