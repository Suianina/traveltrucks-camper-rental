import CardReviews from "../CardReviews/CardReviews.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCamperById } from "../../redux/campers/operations.js";
import { selectCamper } from "../../redux/campers/selectors.js";
import { useParams } from "react-router-dom";

const CamperReview = () => {
  const { camperId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCamperById(camperId));
  }, [camperId, dispatch]);

  const camper = useSelector(selectCamper);

  return (
    <>
      {camper && (
        <div>
          <ul>
            {camper.reviews.map((review) => (
              <li key={review.reviewer_name}>
                <CardReviews info={review} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default CamperReview;
