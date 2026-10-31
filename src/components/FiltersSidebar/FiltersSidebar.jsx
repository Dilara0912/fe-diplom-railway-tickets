import './FiltersSidebar.css';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import kupeIcon from '../../assets/icons/kupe.png';
import platskartIcon from '../../assets/icons/platskart.png';
import seatingIcon from '../../assets/icons/seating.png';
import lyuksIcon from '../../assets/icons/lyuks.png';
import wifiIcon from '../../assets/icons/wifi.png';
import expressIcon from '../../assets/icons/exress.png';
import calendarIcon from '../../assets/icons/calendar.png';
import arrowIcon from '../../assets/icons/arrow.png';

const carriageTypes = [
  { id: 'coupe', label: 'Купе', icon: kupeIcon },
  { id: 'platzkart', label: 'Плацкарт', icon: platskartIcon },
  { id: 'sitting', label: 'Сидячий', icon: seatingIcon },
  { id: 'luxury', label: 'Люкс', icon: lyuksIcon },
];

const services = [
  { id: 'wifi', label: 'Wi-Fi', icon: wifiIcon },
  { id: 'express', label: 'Экспресс', icon: expressIcon },
];


function FiltersSidebar() {
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [minPrice, setMinPrice] = useState(1920);
  const [maxPrice, setMaxPrice] = useState(7000);
  const [selectedTypes, setSelectedTypes] = useState(['coupe']);
  const [selectedServices, setSelectedServices] = useState(['wifi']);
  const [outboundOpen, setOutboundOpen] = useState(false);
  const [returnOpen, setReturnOpen] = useState(false);

  function toggleItem(id, selected, setSelected) {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  return (
    <aside className="filters">

      <section className="filters__section filters__dates">
        <div className="filters__date-group">
          <label className="filters__date-label" htmlFor="departure-date">
            Дата поездки
          </label>

          <div className="filters__date-field">
            <DatePicker
              id="departure-date"
              selected={departureDate}
              onChange={setDepartureDate}
              dateFormat="dd.MM.yyyy"
              placeholderText="ДД/ММ/ГГ"
              className="filters__date-input"
              calendarStartDay={1}
              showPopperArrow={false}
            />
            <img
              src={calendarIcon}
              alt=""
              className="filters__calendar-icon"
            />
          </div>
        </div>

        <div className="filters__date-group">
          <label className="filters__date-label" htmlFor="return-date">
            Дата возвращения
          </label>

          <div className="filters__date-field">
            <DatePicker
              id="return-date"
              selected={returnDate}
              onChange={setReturnDate}
              dateFormat="dd.MM.yyyy"
              placeholderText="ДД/ММ/ГГ"
              className="filters__date-input"
              calendarStartDay={1}
              showPopperArrow={false}
            />
            <img
              src={calendarIcon}
              alt=""
              className="filters__calendar-icon"
            />
          </div>
        </div>
      </section>

      <section className="filters__section filters__options">
        {carriageTypes.map((type) => (
          <label className="filters__option" key={type.id}>
            <img
              className="filters__option-icon"
              src={type.icon}
              alt=""
            />
            <span className="filters__option-label">{type.label}</span>
            <input
              className="filters__toggle"
              type="checkbox"
              checked={selectedTypes.includes(type.id)}
              onChange={() =>
                toggleItem(type.id, selectedTypes, setSelectedTypes)
              }
              aria-label={type.label}
            />
            <span className="filters__toggle-track" />
          </label>
        ))}


        {services.map((service) => (
          <label className="filters__option" key={service.id}>
            <img
              className="filters__option-icon"
              src={service.icon}
              alt=""
            />
            <span className="filters__option-label">{service.label}</span>
            <input
              className="filters__toggle"
              type="checkbox"
              checked={selectedServices.includes(service.id)}
              onChange={() =>
                toggleItem(service.id, selectedServices, setSelectedServices)
              }
              aria-label={service.label}
            />
            <span className="filters__toggle-track" />
          </label>
        ))}

      </section>


      <section className="filters__section filters__price">
        <h3>Стоимость</h3>

        <div className="filters__price-labels">
          <span>от</span>
          <span>до</span>
        </div>

        {/* <div className="filters__range-wrap">
    <div className="filters__range-track">
      <div
        className="filters__range-selected"
        style={{
          left: `${((minPrice - 1920) / (7000 - 1920)) * 100}%`,
          width: `${((maxPrice - minPrice) / (7000 - 1920)) * 100}%`,
        }}
      />
    </div>

    <input
      className="filters__range filters__range--min"
      type="range"
      min="1920"
      max="7000"
      step="10"
      value={minPrice}
      onChange={(event) =>
        setMinPrice(Math.min(Number(event.target.value), maxPrice))
      }
      aria-label="Минимальная стоимость"
    />

    <input
      className="filters__range filters__range--max"
      type="range"
      min="1920"
      max="7000"
      step="10"
      value={maxPrice}
      onChange={(event) =>
        setMaxPrice(Math.max(Number(event.target.value), minPrice))
      }
      aria-label="Максимальная стоимость"
    />
  </div> */}


        <div className="filters__range-wrap">
          <div className="filters__range-track">
            <div
              className="filters__range-selected"
              style={{
                left: `${((minPrice - 1920) / (7000 - 1920)) * 100}%`,
                width: `${((maxPrice - minPrice) / (7000 - 1920)) * 100}%`,
              }}
            />
          </div>

          <input
            className="filters__range filters__range--min"
            type="range"
            min="1920"
            max="7000"
            step="10"
            value={minPrice}
            onChange={(event) =>
              setMinPrice(Math.min(Number(event.target.value), maxPrice))
            }
            aria-label="Минимальная стоимость"
          />

          <input
            className="filters__range filters__range--max"
            type="range"
            min="1920"
            max="7000"
            step="10"
            value={maxPrice}
            onChange={(event) =>
              setMaxPrice(Math.max(Number(event.target.value), minPrice))
            }
            aria-label="Максимальная стоимость"
          />
        </div>

        <div className="filters__price-values">
          <span>1920</span>
          <span>4500</span>
          <span>7000</span>
        </div>
      </section>


      <section className="filters__section filters__direction">
        <button
          className="filters__accordion"
          type="button"
          aria-expanded={outboundOpen}
          onClick={() => setOutboundOpen(!outboundOpen)}
        >
          <span className="filters__direction-icon">
            <img src={arrowIcon} alt="" />
          </span>
          <span>Туда</span>
          <span className="filters__plus">{outboundOpen ? '−' : '+'}</span>
        </button>

        {outboundOpen && (
          <div className="filters__accordion-content">
            <label>
              <input type="checkbox" /> Утренние поезда
            </label>
            <label>
              <input type="checkbox" /> Дневные поезда
            </label>
            <label>
              <input type="checkbox" /> Вечерние поезда
            </label>
          </div>
        )}
      </section>

      <section className="filters__section filters__direction">
        <button
          className="filters__accordion"
          type="button"
          aria-expanded={returnOpen}
          onClick={() => setReturnOpen(!returnOpen)}
        >
          <span className="filters__direction-icon filters__direction-icon--reverse">
            <img src={arrowIcon} alt="" />
          </span>
          <span>Обратно</span>
          <span className="filters__plus">{returnOpen ? '−' : '+'}</span>
        </button>

        {returnOpen && (
          <div className="filters__accordion-content">
            <label>
              <input type="checkbox" /> Утренние поезда
            </label>
            <label>
              <input type="checkbox" /> Дневные поезда
            </label>
            <label>
              <input type="checkbox" /> Вечерние поезда
            </label>
          </div>
        )}
      </section>
    </aside>
  );
}

export default FiltersSidebar;