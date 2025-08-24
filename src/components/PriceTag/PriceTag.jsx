import css from './PriceTag.module.css';

const PriceTag = ({ price }) => {
    return <p className={css.price}>€{price}.00</p>;
}

export default PriceTag;