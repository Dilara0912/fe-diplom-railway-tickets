import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import BookingSteps from '../../components/BookingSteps/BookingSteps';
import FiltersSidebar from '../../components/FiltersSidebar/FiltersSidebar';
import LastTickets from '../../components/LastTickets/LastTickets';
import SearchForm from '../../components/SearchForm/SearchForm';
import '../TrainsPage/TrainsPage.css';
import './SeatsPage.css';

import trainIcon from '../../assets/icons/train.png';
import routeArrowIcon from '../../assets/icons/Vector.png';
import seatingIcon from '../../assets/icons/seating.svg';
import platskartIcon from '../../assets/icons/platskart.svg';
import kupeIcon from '../../assets/icons/kupe.svg';
import luxuryIcon from '../../assets/icons/lyuks.svg';
import airConditionerIcon from '../../assets/icons/airConditioner.svg';
import wifiIcon from '../../assets/icons/wifi.svg';
import bedSheetsIcon from '../../assets/icons/bedSheets.svg';
import teaCapIcon from '../../assets/icons/teaCap.svg';
import platskart12Image from '../../assets/images/platskart-1.png';
import platskart10Image from '../../assets/images/platskart-2.png';
import arrowButtonLeft from '../../assets/icons/arrow-button-left.svg';
import arrowButtonRight from '../../assets/icons/arrow-button-right.svg';

const wagonTypes = [
  { name: 'Сидячий', icon: seatingIcon, width: 30.43 },
  { name: 'Плацкарт', icon: platskartIcon, width: 50 },
  { name: 'Купе', icon: kupeIcon, width: 50 },
  { name: 'Люкс', icon: luxuryIcon, width: 56.45 },
];

const wagonOptions = {
  'Сидячий': { wagons: [8, 9], count: 48, available: 21, top: 0, bottom: 0, topPrice: 1920, bottomPrice: 1920 },
  'Плацкарт': {
    wagons: [12, 10],
    ribbonWagons: [10, 12, 15],
    count: 47,
    available: 21,
    top: 10,
    bottom: 11,
    topPrice: 2020,
    bottomPrice: 3030
  },
  'Купе': { wagons: [7], count: 36, available: 11, top: 3, bottom: 8, topPrice: 2920, bottomPrice: 3530 },
  'Люкс': { wagons: [2], count: 18, available: 8, top: 0, bottom: 0, topPrice: 4920, bottomPrice: 4920 },
};

function TrainSummary({ reverse = false }) {
  return (
    <div className={`seats-train-summary ${reverse ? 'seats-train-summary--reverse' : ''}`}>
      <div className="seats-train-summary__number">
        <span className="seats-train-summary__round-icon">
          <img src={trainIcon} alt="" />
        </span>
        <div className="seats-train-summary__number-info">
          <strong>116С</strong>
          <small>
            <span className="seats-train-summary__route-muted">Адлер →</span>
            <span>Москва →</span>
            <span>Санкт-Петербург</span>
          </small>
        </div>
      </div>

      <div className="seats-train-summary__station seats-train-summary__station--departure">
        <strong>00:10</strong>
        <span>Москва</span>
        <small>Курский вокзал</small>
      </div>

      <img
        className={`seats-train-summary__route-arrow ${reverse ? 'seats-train-summary__route-arrow--reverse' : ''
          }`}
        src={routeArrowIcon}
        alt=""
      />

      <div className="seats-train-summary__station seats-train-summary__station--arrival">
        <strong>09:52</strong>
        <span>Санкт-Петербург</span>
        <small>Ладожский вокзал</small>
      </div>

      <span className="seats-train-summary__separator seats-train-summary__separator--route" aria-hidden="true" />
      <span className="seats-train-summary__separator seats-train-summary__separator--duration" aria-hidden="true" />

      <div className="seats-train-summary__travel-time">
        <span className="seats-train-summary__clock" aria-hidden="true" />
        <small>9 часов<br />42 минуты</small>
      </div>
    </div>
  );
}

function PassengerFields({ passengers, onChange }) {
  const fields = [
    {
      key: 'adults',
      title: 'Взрослых',
      label: `Взрослых — ${passengers.adults}`,
      value: passengers.adults,
      max: 5,
      help: <>Можно добавить еще<br />3 пассажиров</>,
      helpClass: 'seats-passengers__help--adults',
    },
    {
      key: 'children',
      title: 'Детских',
      label: `Детских — ${passengers.children}`,
      value: passengers.children,
      max: 4,
      help: passengers.children > 0
        ? 'Можно добавить еще 3 детей до 10 лет.Свое место в вагоне, как у взрослых, но дешевле в среднем на 50-65%'
        : null,
      helpClass: 'seats-passengers__help--children',
    },
    {
      key: 'infants',
      title: 'Детских «без места»',
      label: `Детских «без места» — ${passengers.infants}`,
      value: passengers.infants,
      max: 4,
      help: null,
      helpClass: '',
    },
  ];

  return (
    <section className="seats-passengers">
      <h2>Количество билетов</h2>
      <div className="seats-passengers__fields">
        {fields.map((field) => (
          <label className={`seats-passengers__field seats-passengers__field--${field.key}`} key={field.key}>
            <span className="visually-hidden">{field.label}</span>
            <select
              value={field.value}
              aria-label={field.title}
              onChange={(event) => onChange(field.key, Number(event.target.value))}
            >
              {Array.from({ length: field.max + 1 }, (_, value) => (
                <option key={value} value={value}>{field.title} — {value}</option>
              ))}
            </select>
            {field.help && (
              <small className={`seats-passengers__help ${field.helpClass}`}>
                {field.help}
              </small>
            )}
          </label>
        ))}
      </div>
    </section>
  );
}

function SeatMap({
  wagonNumber,
  wagonType,
  count,
  selectedSeats,
  onToggleSeat
}) {
  // Для плацкартных вагонов используем схемы из Figma
  if (wagonType === 'Плацкарт') {
    const mapImage = wagonNumber === 12
      ? platskart12Image
      : wagonNumber === 10
        ? platskart10Image
        : null;

    if (mapImage) {
      return (
        <div className="seat-map--image">
          <img
            src={mapImage}
            alt={`Схема плацкартного вагона ${wagonNumber}`}
          />
        </div>
      );
    }
  }

  // Для остальных типов оставляем прежнюю схему
  const seats = Array.from(
    { length: count },
    (_, index) => index + 1
  );

  const middle = Math.ceil(seats.length / 2);
  const rows = [
    seats.slice(0, middle),
    seats.slice(middle)
  ];

  return (
    <div
      className="seat-map"
      aria-label={`Схема мест вагона ${wagonNumber}`}
    >
      <div className="seat-map__wagon-label">
        {String(wagonNumber).padStart(2, '0')}
      </div>

      <div className="seat-map__interior">
        <div className="seat-map__end seat-map__end--left">
          ↕
        </div>

        <div className="seat-map__rows">
          {rows.map((row, rowIndex) => (
            <div
              className={`seat-map__row seat-map__row--${rowIndex + 1}`}
              key={rowIndex}
            >
              {row.map((seat) => {
                const id = `${wagonNumber}-${seat}`;
                const isSelected = selectedSeats.includes(id);

                return (
                  <button
                    type="button"
                    key={seat}
                    className={`seat-map__seat ${seat % 4 === 0 ? 'seat-map__seat--muted' : ''
                      } ${isSelected ? 'seat-map__seat--selected' : ''
                      }`}
                    aria-pressed={isSelected}
                    aria-label={`Вагон ${wagonNumber}, место ${seat}`}
                    onClick={() => onToggleSeat(id)}
                  >
                    {seat}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="seat-map__end seat-map__end--right">
          ↕
        </div>
      </div>
    </div>
  );
}

function WagonSection({ wagonNumber, wagonType, selectedSeats, onToggleSeat, showRibbon = false }) {
  const config = wagonOptions[wagonType];
  const isLuxury = wagonType === 'Люкс';
  const isPlatskart = wagonType === 'Плацкарт';

  const seatCount = isPlatskart ? 47 : config.count;

  return (
    <section className="seats-wagon">

      {/* Оранжевая полоса с номерами вагонов */}
      {showRibbon && (
        <div className="seats-wagon__ribbon">

          <div className="seats-wagon__ribbon-list">
            <span className="seats-wagon__ribbon-label">
              Вагоны
            </span>

            {(config.ribbonWagons || config.wagons).map((number) => (
              <button
                key={number}
                type="button"
                className={number === 15 ? 'is-active' : ''}
              >
                {number}
              </button>
            ))}
          </div>

          <small>
            Нумерация вагонов начинается с головы поезда
          </small>
        </div>
      )}

      {/* Основная часть карточки */}
      <div className="seats-wagon__details">

        {/* Плашка с номером вагона */}
        <div className="seats-wagon__number">
          <strong>{String(wagonNumber).padStart(2, '0')}</strong>
          <span>вагон</span>
        </div>

        {/* Места, стоимость и обслуживание */}
        <div className="seats-wagon__content">

          {/* Количество мест и цены */}
          <div className="seats-wagon__prices">

            <div className="seats-wagon__places">
              <div className="seats-wagon__column-title">
                <span>Места</span>
                <strong>{config.available}</strong>
              </div>

              {!isLuxury && (
                <>
                  <div className="seats-wagon__price-row">
                    <span>Верхние</span>
                    <strong>{config.top}</strong>
                  </div>

                  <div className="seats-wagon__price-row">
                    <span>Нижние</span>
                    <strong>{config.bottom}</strong>
                  </div>
                </>
              )}
            </div>

            <div className="seats-wagon__cost">
              <div className="seats-wagon__column-title">
                Стоимость
              </div>

              <div className="seats-wagon__cost-row">
                <strong>
                  {config.topPrice.toLocaleString('ru-RU')}
                </strong>
                <span>₽</span>
              </div>

              {!isLuxury && (
                <div className="seats-wagon__cost-row">
                  <strong>
                    {config.bottomPrice.toLocaleString('ru-RU')}
                  </strong>
                  <span>₽</span>
                </div>
              )}
            </div>

          </div>

          {/* Обслуживание */}
          <div className="seats-wagon__services">

            <div className="seats-wagon__services-heading">
              <span>Обслуживание</span>
              <span>ФПК</span>
            </div>

            <div className="seats-wagon__service-icons">

              <span className="seats-wagon__service-icon">
                <img src={airConditionerIcon} alt="Кондиционер" />
              </span>

              <span className="seats-wagon__service-icon">
                <img src={wifiIcon} alt="Wi-Fi" />
              </span>

              <span className="seats-wagon__service-icon is-highlighted">
                <img src={bedSheetsIcon} alt="Постельное бельё" />
              </span>

              <span className="seats-wagon__service-icon">
                <img src={teaCapIcon} alt="Кофе" />
              </span>

            </div>

            <small>
              {isPlatskart
                ? '13 человек выбирают места в этом поезде'
                : 'Места доступны для выбора'}
            </small>

          </div>
        </div>
      </div>

      {/* Схема мест */}
      <SeatMap
        wagonNumber={wagonNumber}
        wagonType={wagonType}
        count={seatCount}
        selectedSeats={selectedSeats}
        onToggleSeat={onToggleSeat}
      />

    </section>
  );
}

function SeatsPage() {
  const [wagonType, setWagonType] = useState('Плацкарт');
  const [passengers, setPassengers] = useState({ adults: 2, children: 1, infants: 0 });
  const [selectedSeats, setSelectedSeats] = useState([]);
  const config = wagonOptions[wagonType];

  const updatePassenger = (key, value) => {
    setPassengers((current) => ({ ...current, [key]: value }));
  };

  const toggleSeat = (id) => {
    setSelectedSeats((current) => current.includes(id)
      ? current.filter((seat) => seat !== id)
      : [...current, id]);
  };

  return (
    <Layout pageClass="page--seats">
      <div className="trains-page__banner">
        <div className="trains-page__search">
          <SearchForm />
        </div>
      </div>

      <BookingSteps currentStep={1} />

      <div className="seats-page__layout">
        <aside className="seats-page__sidebar">
          <FiltersSidebar />
          <LastTickets />
        </aside>

        <section className="seats-page__content">
          <h1>ВЫБОР МЕСТ</h1>

          <section className="seat-selection">
            <div className="seat-selection__actions">
              <button
                className="seat-selection__back"
                type="button"
                aria-label="Назад"
              >
                <img src={arrowButtonLeft} alt="" />
              </button>
              <Link to="/trains" className="seat-selection__choose-train">Выбрать другой поезд</Link>
            </div>
            <TrainSummary />
            <PassengerFields passengers={passengers} onChange={updatePassenger} />

            <section className="seats-wagon-types">
              <h2>Тип вагона</h2>
              <div className="seats-wagon-types__list">
                {wagonTypes.map((type) => (
                  <button
                    type="button"
                    key={type.name}
                    className={`seats-wagon-types__item ${wagonType === type.name ? 'is-active' : ''}`}
                    onClick={() => setWagonType(type.name)}
                    aria-pressed={wagonType === type.name}
                  >
                    <span
                      className="seats-wagon-types__icon"
                      aria-hidden="true"
                      style={{
                        '--icon-width': `${type.width}px`,
                        WebkitMaskImage: `url("${type.icon}")`,
                        maskImage: `url("${type.icon}")`,
                      }}
                    />

                    <span className="seats-wagon-types__label">
                      {type.name}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <div className="seats-page__coaches">
              {config.wagons.map((number, index) => (
                <WagonSection
                  key={`${wagonType}-${number}`}
                  wagonNumber={number}
                  wagonType={wagonType}
                  selectedSeats={selectedSeats}
                  onToggleSeat={toggleSeat}
                  showRibbon={index === 0}
                />
              ))}
            </div>
          </section>

          <section className="seat-selection seat-selection--return">
            <div className="seat-selection__actions seat-selection__actions--return">
              <button
                className="seat-selection__back"
                type="button"
                aria-label="Назад"
              >
                <img src={arrowButtonLeft} alt="" />
              </button>
              <Link to="/trains" className="seat-selection__choose-train">Выбрать другой поезд</Link>
            </div>
            <TrainSummary reverse />
            <PassengerFields passengers={{ ...passengers, children: 0 }} onChange={updatePassenger} />
            <section className="seats-wagon-types seats-wagon-types--return">
              <h2>Тип вагона</h2>
              <div className="seats-wagon-types__list">
                {wagonTypes.map((type) => (
                  <button
                    type="button"
                    key={type.name}
                    className={`seats-wagon-types__item ${wagonType === type.name ? 'is-active' : ''
                      }`}
                    onClick={() => setWagonType(type.name)}
                  >
                    <span
                      className="seats-wagon-types__icon"
                      aria-hidden="true"
                      style={{
                        '--icon-width': `${type.width}px`,
                        WebkitMaskImage: `url("${type.icon}")`,
                        maskImage: `url("${type.icon}")`,
                      }}
                    />

                    <span className="seats-wagon-types__label">
                      {type.name}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          </section>

          <div className="seats-page__next-wrap">
            <Link to="/passengers" className="seats-page__next">ДАЛЕЕ</Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default SeatsPage;
