import { useLocation } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm';
import './Hero.css';

import heroBg from '../../assets/images/hero-bg.png';
import stationBg from '../../assets/images/station-bg.png';

function Hero() {
  const { pathname } = useLocation();
  const isTrainsPage = pathname === '/trains';

  return (
    <section
      className={`hero ${isTrainsPage ? 'hero--trains' : ''}`}
      style={{
        backgroundImage: `url(${isTrainsPage ? stationBg : heroBg})`,
      }}
    >
      <div className="hero__overlay">
        <div className="hero__content">
          <div className="hero__text">
            <span>Вся жизнь - </span>
            <strong>путешествие!</strong>
          </div>

          <SearchForm />
        </div>
      </div>
    </section>
  );
}

export default Hero;