import css from './NotFound.module.css';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className={css.container}>
        <h1 className={css.titleMain}>404 Not Found</h1>
        <h2 className={css.title}>Camper Went Off-Road!</h2>
        <p className={css.text}>
          We've driven down every road, but this page just isn't here. Try
          heading back or exploring our blog for some travel inspiration!
            </p>
            <Link to='/' className={css.btn}>Back to Home</Link>
      </div>
    );
}
export default NotFoundPage