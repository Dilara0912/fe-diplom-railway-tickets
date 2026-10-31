
import './SearchForm.css';
import { useState } from 'react';

import { FaMapMarkerAlt } from 'react-icons/fa';
// import { FaMapMarkerAlt, FaRegCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import swapIcon from '../../assets/icons/ic_cached_white_48dp.png';
import calendarIcon from '../../assets/icons/calendar.png';

const cities = [
    'Ангарск',
    'Архангельск',
    'Астрахань',
    'Барнаул',
    'Белгород',
    'Благовещенск',
    'Братск',
    'Брянск',
    'Великий Новгород',
    'Владивосток',
    'Волгоград',
    'Воронеж',
    'Екатеринбург',
    'Казань',
    'Калининград',
    'Краснодар',
    'Красноярск',
    'Москва',
    'Нижний Новгород',
    'Новосибирск',
    'Омск',
    'Пермь',
    'Ростов-на-Дону',
    'Самара',
    'Санкт-Петербург',
    'Сочи',
    'Уфа',
    'Челябинск',
];

function CityField({ placeholder, value, onChange, onIconClick }) {
    const [isOpen, setIsOpen] = useState(false);

    const filteredCities = cities.filter((city) =>
        city.toLowerCase().startsWith(value.trim().toLowerCase())
    );

    function chooseCity(city) {
        onChange(city);
        setIsOpen(false);
    }

    return (
        <div className="search-form__field search-form__city-field">
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(event) => {
                    onChange(event.target.value);
                    setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                onBlur={() => {
                    setTimeout(() => setIsOpen(false), 150);
                }}
                className="search-form__input"
                autoComplete="off"
            />

            <FaMapMarkerAlt className="search-form__icon" />

            {isOpen && filteredCities.length > 0 && (
                <ul className="search-form__city-list">
                    {filteredCities.map((city) => (
                        <li key={city}>
                            <button
                                type="button"
                                className="search-form__city-option"
                                onMouseDown={(event) => event.preventDefault()}
                                onClick={() => chooseCity(city)}
                            >
                                {city}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

function SearchForm() {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);

    function swapCities() {
        setOrigin(destination);
        setDestination(origin);
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <div className="search-form__direction">
                <h2 className="search-form__title">Направление</h2>


                <div className="search-form__row">
                    <CityField
                        placeholder="Откуда"
                        value={origin}
                        onChange={setOrigin}
                    />

                    <button
                        type="button"
                        className="search-form__swap"
                        onClick={swapCities}
                        aria-label="Поменять города местами"
                    >
                        <img src={swapIcon} alt="" />
                    </button>

                    <CityField
                        placeholder="Куда"
                        value={destination}
                        onChange={setDestination}
                    />
                </div>

            </div>


            <div className="search-form__dates">
                <h2 className="search-form__title">Дата</h2>

                <div className="search-form__row">
                    <div className="search-form__field">
                        <DatePicker
                            selected={dateFrom}
                            onChange={setDateFrom}
                            dateFormat="dd/MM/yy"
                            placeholderText="ДД/ММ/ГГ"
                            className="search-form__input"
                        />
                        <img
                            src={calendarIcon}
                            alt=""
                            className="search-form__icon"
                        />
                    </div>

                    <div className="search-form__field">
                        <DatePicker
                            selected={dateTo}
                            onChange={setDateTo}
                            dateFormat="dd/MM/yy"
                            placeholderText="ДД/ММ/ГГ"
                            className="search-form__input"
                        />
                        <img
                            src={calendarIcon}
                            alt=""
                            className="search-form__icon"
                        />
                    </div>
                </div>
            </div>

            <button type="submit" className="search-form__submit">
                Найти билеты
            </button>
        </form>
    );
}

export default SearchForm;

