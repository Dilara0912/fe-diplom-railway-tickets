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
import seatingCarriageImage from '../../assets/images/seatingCarriage.png';
import kupeCarriageImage from '../../assets/images/kupeCarriage.png';

const wagonTypes = [
  { name: 'Сидячий', icon: seatingIcon, width: 30.43 },
  { name: 'Плацкарт', icon: platskartIcon, width: 50 },
  { name: 'Купе', icon: kupeIcon, width: 50 },
  { name: 'Люкс', icon: luxuryIcon, width: 56.45 },
];

const wagonOptions = {
  'Сидячий': {
    wagons: [8, 9],
    ribbonWagons: [8, 9],
    count: 48,
    available: 35,
    top: 0,
    bottom: 0,
    topPrice: 1920,
    bottomPrice: 1920,
  },
  'Плацкарт': {
    wagons: [12, 10],
    ribbonWagons: [10, 12, 15],
    count: 47,
    available: 21,
    top: 10,
    bottom: 11,
    topPrice: 2020,
    bottomPrice: 3030,
  },
  'Купе': {
    wagons: [7],
    ribbonWagons: [7, 9],
    count: 36,
    available: 11,
    top: 3,
    bottom: 8,
    topPrice: 2920,
    bottomPrice: 3530,
  },
  'Люкс': {
    wagons: [2],
    ribbonWagons: [2],
    count: 18,
    available: 8,
    top: 0,
    bottom: 0,
    topPrice: 4920,
    bottomPrice: 4920,
  },
};

// В макете для обратного направления выбран сидячий вагон № 22.
const returnWagonOptions = {
  ...wagonOptions['Сидячий'],
  wagons: [22],
  ribbonWagons: [20, 21, 22, 25],
};

// Координаты доступных мест в PNG-схеме плацкартного вагона 921 × 145 px.
// Кнопки располагаются поверх картинки и делают номера мест интерактивными.
const platskartImageSeats = [
  { number: 1, x: 130, y: 60 },
  { number: 3, x: 194, y: 60 },
  { number: 11, x: 373, y: 60 },
  { number: 13, x: 406, y: 60 },
  { number: 15, x: 464, y: 60 },
  { number: 18, x: 492, y: 26 },
  { number: 17, x: 492, y: 60 },
  { number: 20, x: 566, y: 26 },
  { number: 19, x: 566, y: 60 },
  { number: 30, x: 780, y: 26 },
  { number: 29, x: 780, y: 60 },
  { number: 32, x: 840, y: 26 },
  { number: 31, x: 840, y: 60 },
];

// Доступные места купейного вагона № 07 по PNG из Figma.
const coupeImageSeats = [
  { number: 1, x: 130, y: 60 },
  { number: 3, x: 194, y: 60 },
  { number: 11, x: 372, y: 60 },
  { number: 13, x: 404, y: 60 },
  { number: 15, x: 462, y: 60 },
  { number: 18, x: 494, y: 26 },
  { number: 19, x: 556, y: 60 },
  { number: 27, x: 746, y: 60 },
  { number: 30, x: 778, y: 26 },
  { number: 31, x: 838, y: 60 },
  { number: 32, x: 838, y: 26 },
];

function TrainSummary({ reverse = false }) {
  const departure = {
    time: '00:10',
    city: 'Москва',
    station: 'Курский вокзал',
  };

  const arrival = {
    time: '09:52',
    city: 'Санкт-Петербург',
    station: 'Ладожский вокзал',
  };

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
        <strong>{departure.time}</strong>
        <span>{departure.city}</span>
        <small>{departure.station}</small>
      </div>

      <img
        className={`seats-train-summary__route-arrow ${reverse ? 'seats-train-summary__route-arrow--reverse' : ''}`}
        src={routeArrowIcon}
        alt=""
      />

      <div className="seats-train-summary__station seats-train-summary__station--arrival">
        <strong>{arrival.time}</strong>
        <span>{arrival.city}</span>
        <small>{arrival.station}</small>
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

function PassengerFields({ passengers, onChange, initialActiveField = null }) {
  // В макете обратного направления по умолчанию выделено поле «Детских».
  // При выборе другого поля оранжевая рамка переходит на него.
  const [activeField, setActiveField] = useState(initialActiveField);
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
      help: (
        <>
          Можно добавить еще 3 детей<br />
          до 10 лет. Свое место в вагоне,<br />
          как у взрослых, но дешевле<br />
          в среднем на 50–65%
        </>
      ),
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
          <label
            className={`seats-passengers__field seats-passengers__field--${field.key} ${activeField === field.key ? 'is-active' : ''
              }`}
            key={field.key}
          >
            <span className="visually-hidden">{field.label}</span>
            <select
              value={field.value}
              aria-label={field.title}
              onFocus={() => setActiveField(field.key)}
              onClick={() => setActiveField(field.key)}
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

function WagonTypeSelector({ value, onChange }) {
  return (
    <section className="seats-wagon-types">
      <h2>Тип вагона</h2>
      <div className="seats-wagon-types__list">
        {wagonTypes.map((type) => (
          <button
            type="button"
            key={type.name}
            className={`seats-wagon-types__item ${value === type.name ? 'is-active' : ''}`}
            onClick={() => onChange(type.name)}
            aria-pressed={value === type.name}
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
            <span className="seats-wagon-types__label">{type.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function SeatMap({ direction, wagonNumber, wagonType, count, selectedSeats, onToggleSeat }) {
  // Схема купейного вагона из Figma.
  if (wagonType === 'Купе') {
    return (
      <div
        className="seat-map--image"
        aria-label={`Схема купейного вагона ${wagonNumber}`}
      >
        <img
          src={kupeCarriageImage}
          alt={`Схема мест купейного вагона ${wagonNumber}`}
        />

        {coupeImageSeats.map(({ number, x, y }) => {
          const id = `${direction}-${wagonNumber}-${number}`;
          const isSelected = selectedSeats.includes(id);

          return (
            <button
              key={number}
              type="button"
              className={`seat-map__image-seat ${isSelected ? 'seat-map__image-seat--selected' : ''
                }`}
              style={{
                left: `${(x / 921) * 100}%`,
                top: `${(y / 145) * 100}%`,
                width: `${(30 / 921) * 100}%`,
                height: `${(30 / 145) * 100}%`,
              }}
              aria-label={`Вагон ${wagonNumber}, место ${number}`}
              aria-pressed={isSelected}
              onClick={() => onToggleSeat(id)}
            />
          );
        })}
      </div>
    );
  }
  // Для сидячего вагона используем схему из Figma.
  if (wagonType === 'Сидячий' && wagonNumber === 22) {
    return (
      <div
        className="seat-map--image"
        aria-label={`Схема сидячего вагона ${wagonNumber}`}
      >
        <img
          src={seatingCarriageImage}
          alt={`Схема мест сидячего вагона ${wagonNumber}`}
        />
      </div>
    );
  }

  // Для плацкартных вагонов 12 и 10 используем экспортированные схемы из Figma.
  if (wagonType === 'Плацкарт') {
    const mapImage = wagonNumber === 12
      ? platskart12Image
      : wagonNumber === 10
        ? platskart10Image
        : null;

    if (mapImage) {
      return (
        <div className="seat-map--image" aria-label={`Схема плацкартного вагона ${wagonNumber}`}>
          <img src={mapImage} alt={`Схема плацкартного вагона ${wagonNumber}`} />
          {platskartImageSeats.map(({ number, x, y }) => {
            const id = `${direction}-${wagonNumber}-${number}`;
            const isSelected = selectedSeats.includes(id);

            return (
              <button
                key={number}
                type="button"
                className={`seat-map__image-seat ${isSelected ? 'seat-map__image-seat--selected' : ''}`}
                style={{
                  left: `${(x / 921) * 100}%`,
                  top: `${(y / 145) * 100}%`,
                  width: `${(30 / 921) * 100}%`,
                  height: `${(34 / 145) * 100}%`,
                }}
                aria-label={`Вагон ${wagonNumber}, место ${number}`}
                aria-pressed={isSelected}
                onClick={() => onToggleSeat(id)}
              />
            );
          })}
        </div>
      );
    }
  }

  // Для типов без отдельной картинки оставляем интерактивную схему.
  const seats = Array.from({ length: count }, (_, index) => index + 1);
  const middle = Math.ceil(seats.length / 2);
  const rows = [seats.slice(0, middle), seats.slice(middle)];

  return (
    <div className="seat-map" aria-label={`Схема мест вагона ${wagonNumber}`}>
      <div className="seat-map__wagon-label">{String(wagonNumber).padStart(2, '0')}</div>
      <div className="seat-map__interior">
        <div className="seat-map__end seat-map__end--left">↕</div>
        <div className="seat-map__rows">
          {rows.map((row, rowIndex) => (
            <div className={`seat-map__row seat-map__row--${rowIndex + 1}`} key={rowIndex}>
              {row.map((seat) => {
                const id = `${direction}-${wagonNumber}-${seat}`;
                const isSelected = selectedSeats.includes(id);

                return (
                  <button
                    type="button"
                    key={seat}
                    className={`seat-map__seat ${seat % 4 === 0 ? 'seat-map__seat--muted' : ''} ${isSelected ? 'seat-map__seat--selected' : ''}`}
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
        <div className="seat-map__end seat-map__end--right">↕</div>
      </div>
    </div>
  );
}

function WagonSection({
  direction,
  wagonNumber,
  wagonType,
  wagonConfig,
  selectedSeats,
  onToggleSeat,
  showRibbon = false
}) {
  const config = wagonConfig || wagonOptions[wagonType];
  const selectedWagonNumbers = new Set(
    selectedSeats
      .filter((seatId) => seatId.startsWith(`${direction}-`))
      .map((seatId) =>
        Number(seatId.slice(direction.length + 1).split('-')[0])
      )
  );
  const isLuxury = wagonType === 'Люкс';
  const isSeating = wagonType === 'Сидячий';
  const isCoupe = wagonType === 'Купе';
  const isPlatskart = wagonType === 'Плацкарт';
  const seatCount = isPlatskart ? 47 : config.count;

  return (
    <section className={`seats-wagon ${selectedSeats.length === 0 ? 'seats-wagon--empty' : ''}`}>
      {showRibbon && (
        <div className="seats-wagon__ribbon">
          <div className="seats-wagon__ribbon-list">
            <span className="seats-wagon__ribbon-label">Вагоны</span>
            {(config.ribbonWagons || config.wagons).map((number) => (
              <button
                key={number}
                type="button"
                className={
                  (selectedWagonNumbers.size > 0
                    ? selectedWagonNumbers.has(number)
                    : config.wagons.includes(number))
                    ? 'is-active'
                    : ''
                }
              >
                {String(number).padStart(2, '0')}
              </button>
            ))}
          </div>
          <small>Нумерация вагонов начинается с головы поезда</small>
        </div>
      )}

      <div className="seats-wagon__details">
        <div className="seats-wagon__number">
          <strong>{String(wagonNumber).padStart(2, '0')}</strong>
          <span>вагон</span>
        </div>

        <div className="seats-wagon__content">
          <div className="seats-wagon__prices">
            <div className="seats-wagon__places">
              <div className="seats-wagon__column-title">
                <span>Места</span>
                <strong>{config.available}</strong>
              </div>

              {!isLuxury && !isSeating && (
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
              <div className="seats-wagon__column-title">Стоимость</div>
              <div className="seats-wagon__cost-row">
                <strong>{config.topPrice.toLocaleString('ru-RU')}</strong>
                <span>₽</span>
              </div>
              {!isLuxury && !isSeating && (
                <div className="seats-wagon__cost-row">
                  <strong>{config.bottomPrice.toLocaleString('ru-RU')}</strong>
                  <span>₽</span>
                </div>
              )}
            </div>
          </div>

          <div className="seats-wagon__services">
            <div className="seats-wagon__services-heading">
              <span>Обслуживание</span>
              <span>ФПК</span>
            </div>
            <div className="seats-wagon__service-icons">
              <span
                className="seats-wagon__service-icon seats-wagon__service-icon--conditioner"
                data-tooltip="кондиционер"
                tabIndex={0}
              >
                <img src={airConditionerIcon} alt="Кондиционер" />
              </span>
              <span className={`seats-wagon__service-icon ${isSeating ? 'is-highlighted' : ''}`}>
                <img src={wifiIcon} alt="Wi-Fi" />
              </span>
              {!isSeating && (
                <span className="seats-wagon__service-icon is-highlighted">
                  <img src={bedSheetsIcon} alt="Постельное бельё" />
                </span>
              )}
              <span className={`seats-wagon__service-icon ${isCoupe ? 'is-highlighted' : ''}`}>
                <img src={teaCapIcon} alt="Кофе" />
              </span>
            </div>
            <small>
              {isPlatskart
                ? '13 человек выбирают места в этом поезде'
                : isSeating || isCoupe
                  ? '11 человек выбирают места в этом поезде'
                  : 'Места доступны для выбора'}
            </small>
          </div>
        </div>
      </div>

      <SeatMap
        direction={direction}
        wagonNumber={wagonNumber}
        wagonType={wagonType}
        count={seatCount}
        selectedSeats={selectedSeats}
        onToggleSeat={onToggleSeat}
      />
    </section>
  );
}

function TripSelection({
  direction,
  reverse = false,
  wagonType,
  setWagonType,
  passengers,
  setPassengers,
  selectedSeats,
  setSelectedSeats,
  totalPrice,
}) {
  const isReturn = direction === 'return';
  const config = isReturn
    ? (wagonType === 'Сидячий' || !wagonType
      ? returnWagonOptions
      : wagonOptions[wagonType])
    : wagonOptions[wagonType];
    
  const updatePassenger = (key, value) => {
    setPassengers((current) => ({ ...current, [key]: value }));
  };

  const toggleSeat = (id) => {
    setSelectedSeats((current) => current.includes(id)
      ? current.filter((seat) => seat !== id)
      : [...current, id]);
  };

  // Если пользователь выбрал место в конкретном вагоне, показываем только его.
  // После снятия всех выбранных мест снова отображаем весь список вагонов.
  const selectedWagonNumbers = new Set(
    selectedSeats
      .map((seatId) => {
        const [seatDirection, wagonNumber] = seatId.split('-');

        return seatDirection === direction
          ? Number(wagonNumber)
          : null;
      })
      .filter((number) => number !== null)
  );

  const visibleWagons = selectedWagonNumbers.size > 0
    ? config.wagons.filter((number) => selectedWagonNumbers.has(number))
    : config.wagons;

  const handleWagonTypeChange = (nextType) => {
    setWagonType(nextType);
    setSelectedSeats([]);
  };

  return (
    <section className={`seat-selection ${isReturn ? 'seat-selection--return' : ''}`}>
      <div className={`seat-selection__actions ${isReturn ? 'seat-selection__actions--return' : ''}`}>
        <button className="seat-selection__back" type="button" aria-label="Назад">
          <img src={reverse ? arrowButtonLeft : arrowButtonRight} alt="" />
        </button>
        <Link to="/trains" className="seat-selection__choose-train">
          Выбрать другой поезд
        </Link>
      </div>

      <TrainSummary reverse={reverse} />
      <PassengerFields
        passengers={passengers}
        onChange={updatePassenger}
        initialActiveField={isReturn ? 'children' : null}
      />
      <WagonTypeSelector value={wagonType} onChange={handleWagonTypeChange} />

      {!isReturn && (
        <div className="seats-page__coaches">
          {visibleWagons.map((number, index) => (
            <WagonSection
              key={`${direction}-${wagonType}-${number}`}
              direction={direction}
              wagonNumber={number}
              wagonType={wagonType}
              wagonConfig={config}
              selectedSeats={selectedSeats}
              onToggleSeat={toggleSeat}
              showRibbon={index === 0}
            />
          ))}
        </div>
      )}

      {!isReturn && selectedSeats.length > 0 && (
        <div className="seats-trip-total">
          <span className="seats-trip-total__amount">
            {totalPrice.toLocaleString('ru-RU')}
          </span>
          <span className="seats-trip-total__currency">₽</span>
        </div>
      )}
    </section>
  );
}

function SeatsPage() {
  // У направлений независимые параметры: выбор в одной карточке не меняет другую.
  const [outboundWagonType, setOutboundWagonType] = useState('Плацкарт');
  const [returnWagonType, setReturnWagonType] = useState(null);

  const [outboundPassengers, setOutboundPassengers] = useState({ adults: 2, children: 1, infants: 0 });
  const [returnPassengers, setReturnPassengers] = useState({ adults: 2, children: 0, infants: 0 });

  const [outboundSelectedSeats, setOutboundSelectedSeats] = useState([]);
  const [returnSelectedSeats, setReturnSelectedSeats] = useState([]);

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

          <TripSelection
            direction="outbound"
            wagonType={outboundWagonType}
            setWagonType={setOutboundWagonType}
            passengers={outboundPassengers}
            setPassengers={setOutboundPassengers}
            selectedSeats={outboundSelectedSeats}
            setSelectedSeats={setOutboundSelectedSeats}
            totalPrice={8080}
          />

          <TripSelection
            direction="return"
            reverse
            wagonType={returnWagonType}
            setWagonType={setReturnWagonType}
            passengers={returnPassengers}
            setPassengers={setReturnPassengers}
            selectedSeats={returnSelectedSeats}
            setSelectedSeats={setReturnSelectedSeats}
            totalPrice={5760}
          />

          <div className="seats-page__next-wrap">
            <Link to="/passengers" className="seats-page__next">ДАЛЕЕ</Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default SeatsPage;
