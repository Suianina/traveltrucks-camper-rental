import { Link } from "react-router-dom";
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import css from './HomePage.module.css';

const HomePage = () => {
    return (
      <>
        <Header/>
        <div className={css.heroImg}>
          <Container>
            <div className={css.container}>
              <h1 className={css.title}>Campers of your dreams</h1>
                <p className={css.text}>You can find everything you want in our catalog</p>
            <Link to="/catalog" className={css.btn}>View Now</Link>
            </div>
          </Container>
        </div>
      </>
    );
}
export default HomePage