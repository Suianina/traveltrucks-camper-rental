import css from './DetailsPage.module.css';
import PriceTag from '../../components/PriceTag/PriceTag.jsx';
import LocationRating from '../../components/Location&Rating/LocationRating.jsx';
import  Header from '../../components/Header/Header.jsx';
import ImageDetailsModal from '../../components/ImageDetailsModal/ImageDetailsModal.jsx';
import BookForm from '../../components/BookForm/BookForm.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getCamperById } from '../../redux/campers/operations.js';
import { selectCamper } from '../../redux/campers/selectors.js';
import { Suspense, useEffect, useState } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { Audio } from 'react-loader-spinner'

const DetailsPage = () => {
    const { camperId } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [modalUrl, setModalUrl] = useState('');

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCamperById(camperId));
    }, [camperId, dispatch])

    const camper = useSelector(selectCamper);

    const openModal = url => {
        setShowModal(true);
        setModalUrl(url);
    }
      const closeModal = () => {
        setShowModal(false);
        setModalUrl("");
      };

    return (
      <>
        <Header className={css.headerCont} />
        {camper && (
          <div className={css.mainContainer}>
            <h2 className={css.title}>{camper.name}</h2>
            <LocationRating
              id={camperId}
              rating={camper.rating}
              numberReviews={camper.reviews.length}
              location={camper.location}
              className={css.rating}
            />
            <PriceTag price={camper.price} />
            <ul className={css.listImg}>
              {camper.gallery.map((picture) => (
                <li key={picture.thumb} className={css.item}>
                  <img
                    src={picture.thumb}
                    className={css.img}
                    onClick={() => {
                      openModal(picture.original);
                    }}
                  />
                </li>
              ))}
            </ul>
            <p className={css.text}>{camper.description}</p>
            <ul className={css.listInfo}>
              <li className={css.itemInfo}>
                <NavLink
                  to="features"
                  className={({ isActive }) =>
                    isActive ? css.isActive : css.itemInfo
                  }
                >
                  Features
                </NavLink>
              </li>
              <li className={css.itemInfo}>
                <NavLink
                  to="reviews"
                  className={({ isActive }) =>
                    isActive ? css.isActive : css.itemInfo
                  }
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
            <div className={css.containerBooking}>
              <div className={css.containerFeatures}>
                <Suspense
                  fallback={
                    <Audio
                      visible={true}
                      width="200"
                      color="#4fa94d"
                      ariaLabel="audio-spin-loading"
                    />
                  }
                >
                  <Outlet />
                </Suspense>
              </div>
              <BookForm className={css.bookForm} />
            </div>
            <ImageDetailsModal
              modalIsOpen={showModal}
              closeModal={closeModal}
              src={modalUrl}
            />
          </div>
        )}
      </>
    );
}
export default DetailsPage;