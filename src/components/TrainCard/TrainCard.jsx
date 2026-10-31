import { Link } from 'react-router-dom';
import './TrainCard.css';
import trainIcon from '../../assets/icons/train.png';
import arrowIcon from '../../assets/icons/Vector.png';
import { useState } from 'react';
import servicesIcon from '../../assets/icons/services.png';

function TrainCard({
  trainNumber,
  route,
  routeOrigin = null,
  routeSuffix = '',
  departureTime,
  arrivalTime,
  duration = '9 : 42',
  departureStation = 'Железнодорожный вокзал',
  arrivalStation = 'Железнодорожный вокзал',
  returnTrip = true,
  compact = false,
  price = 2500,
  prices: suppliedPrices,
}) {
  const [showSeatOptions, setShowSeatOptions] = useState(false);
  const [from, to] = route.split(' → ');

  const prices = suppliedPrices ?? [
    { type: 'Сидячий', count: 88, price },
    { type: 'Плацкарт', count: 52, price: price + 630 },
    { type: 'Купе', count: 24, price: price + 1320 },
    { type: 'Люкс', count: 15, price: price + 3030 },
  ];

  return (
    <article
      className={`train-card ${compact ? 'train-card--compact' : ''}`}
    >
      <div className="train-card__info">
        <div className="train-card__icon">
          <img src={trainIcon} alt="" />
        </div>

        <h3>{trainNumber}</h3>


        <p className="train-card__route">
          {routeOrigin && (
            <span className="train-card__route-origin">
              {routeOrigin} →
            </span>
          )}

          <span>{from} →</span>

          <span>
            {to} {routeSuffix}
          </span>
        </p>

      </div>

      <div className="train-card__schedule">
        <div className="train-card__trip">
          <div className="train-card__station">
            <strong>{departureTime}</strong>
            <span>{from}</span>
            <small>{departureStation}</small>
          </div>

          <div className="train-card__duration">
            <span>{duration}</span>
            <img src={arrowIcon} alt="" />
          </div>

          <div className="train-card__trip-spacer" aria-hidden="true" />

          <div className="train-card__station">
            <strong>{arrivalTime}</strong>
            <span>{to}</span>
            <small>{arrivalStation}</small>
          </div>
        </div>

        {returnTrip && (
          <div className="train-card__trip train-card__trip--return">
            <div className="train-card__station">
              <strong>{departureTime}</strong>
              <span>{from}</span>
              <small>{departureStation}</small>
            </div>

            <div className="train-card__duration train-card__duration--return">
              <span>{duration}</span>
              <img src={arrowIcon} alt="" />
            </div>

            <div className="train-card__trip-spacer" aria-hidden="true" />

            <div className="train-card__station">
              <strong>{arrivalTime}</strong>
              <span>{to}</span>
              <small>{arrivalStation}</small>
            </div>
          </div>
        )}
      </div>


      <div
        className="train-card__prices"
        onMouseLeave={() => setShowSeatOptions(false)}
      >
        {prices.map((item, index) => (
          <div
            className={`train-card__price-row train-card__price-row--${index + 1}`}
            key={item.type}
            onMouseEnter={
              item.type === 'Купе'
                ? () => setShowSeatOptions(true)
                : undefined
            }
          >
            <span className="train-card__price-type">{item.type}</span>

            <span className="train-card__count">{item.count}</span>

            <span className="train-card__price">
              <small>от</small>
              <span className="train-card__amount">
                {item.price.toLocaleString('ru-RU')}
              </span>
              <span className="train-card__currency">₽</span>
            </span>
          </div>
        ))}

        <img
          className="train-card__services"
          src={servicesIcon}
          alt=""
          aria-hidden="true"
        />

        {showSeatOptions && (
          <div className="train-card__coupe-popup">
            <div className="train-card__seat-option">
              <span className="train-card__seat-label">верхние</span>
              <span className="train-card__seat-count">19</span>
              <span className="train-card__seat-price">
                <span className="train-card__amount">2 920</span>
                <span className="train-card__currency">₽</span>
              </span>
            </div>

            <div className="train-card__seat-option train-card__seat-option--lower">
              <span className="train-card__seat-label">нижние</span>
              <span className="train-card__seat-count">5</span>
              <span className="train-card__seat-price">
                <span className="train-card__amount">3 530</span>
                <span className="train-card__currency">₽</span>
              </span>
            </div>
          </div>
        )}

        <Link to="/seats" className="train-card__button">
          Выбрать места
        </Link>
      </div>

    </article>
  );
}

export default TrainCard;