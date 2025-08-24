import css from './Container.module.css';

const Container = ({ children }) => {
    return <div className={css.box}>{children}</div>
}
export default Container;