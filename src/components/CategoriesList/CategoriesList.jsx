import css from './CategoriesList.module.css';
import Icon from '../Icon/Icon';

const CategoriesList = ({icon, text}) => {
    return (
      <div className={css.container}>
            <Icon id={icon} width={20} height={16} className={css.icon} />
        <p className={css.text}>{text}</p>
      </div>
    );
}
export default CategoriesList;