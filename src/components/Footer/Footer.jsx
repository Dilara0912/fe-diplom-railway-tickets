import './Footer.css';

import {
  FaPhoneAlt,
  FaEnvelope,
  FaSkype,
  FaMapMarkerAlt,
  FaYoutube,
  FaLinkedinIn,
  FaGooglePlusG,
  FaFacebookF,
  FaTwitter,
  FaChevronUp,
} from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">

      <div className="container">

        <div className="footer__top">

          <div className="footer__contacts">

            <h2 className="footer__title">
              Свяжитесь с нами
            </h2>

            <div className="footer__contact">
              <FaPhoneAlt className="footer__icon" />
              <span>8 (800) 000 00 00</span>
            </div>

            <div className="footer__contact">
              <FaEnvelope className="footer__icon" />
              <span>inbox@mail.ru</span>
            </div>

            <div className="footer__contact">
              <FaSkype className="footer__icon" />
              <span>tu.train.tickets</span>
            </div>

            <div className="footer__contact">
              <FaMapMarkerAlt className="footer__icon" />

              <span>
                г. Москва
                <br />
                ул. Московская 27-35
                <br />
                555 555
              </span>
            </div>

          </div>

          <div className="footer__subscribe">

            <h2 className="footer__title">
              Подписка
            </h2>

            <p className="footer__subtitle">
              Будьте в курсе событий
            </p>

            <form className="footer__form">

              <input
                className="footer__input"
                type="email"
                placeholder="e-mail"
              />

              <button
                className="footer__button"
                type="submit"
              >
                ОТПРАВИТЬ
              </button>

            </form>

            <h2 className="footer__title footer__title--social">
              Подписывайтесь на нас
            </h2>

            <div className="footer__social">

              <a
                href="#"
                className="footer__social-link"
              >
                <FaYoutube />
              </a>

              <a
                href="#"
                className="footer__social-link"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                className="footer__social-link"
              >
                <FaGooglePlusG />
              </a>

              <a
                href="#"
                className="footer__social-link"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="footer__social-link"
              >
                <FaTwitter />
              </a>

            </div>

          </div>

        </div>

      </div>

      <div className="footer__bottom">

        <div className="container footer__bottom-content">

          <div className="footer__logo">
            Лого
          </div>

          <button className="footer__scroll-top">
            <FaChevronUp />
          </button>

          <div className="footer__copy">
            2018 WEB
          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;