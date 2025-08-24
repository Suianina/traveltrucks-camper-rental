import css from './CamperReview.module.css';
import CardReviews from '../CardReviews/CardReviews.jsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCamperById } from '../../redux/campers/operations.js';
import { selectCamper } from '../../redux/campers/selectors.js';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header.jsx';

const CamperReview = () => {
    const { camperId } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCamperById(camperId))
    }, [camperId, dispatch]);
    
    const camper = useSelector(selectCamper);

    return (
 <>
            {camper && (
                <div className={css.container}>
                    <ul>
                        {camper.reviews.map(review => (
                            <li key={review.reviewer_name} className={css.item}>
                                <CardReviews info={review} />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
</>
    )
}
export default CamperReview