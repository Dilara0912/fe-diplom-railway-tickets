
import { useState, useEffect } from 'react';
import TrainCard from '../TrainCard/TrainCard';
import './TrainsList.css';

function TrainsList() {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const trainsData = [
      {
        id: 1,
        trainNumber: '116С',
        route: 'Москва → Санкт-Петербург',
        routeOrigin: 'Адлер',
        departureTime: '00:10',
        arrivalTime: '09:52',
        duration: '9 : 42',
        departureStation: 'Курский вокзал',
        arrivalStation: 'Ладожский вокзал',
        returnTrip: true,
        price: 1920,
        prices: [
          { type: 'Сидячий', count: 88, price: 1920 },
          { type: 'Плацкарт', count: 52, price: 2530 },
          { type: 'Купе', count: 24, price: 3820 },
          { type: 'Люкс', count: 15, price: 4950 },
        ],
      },
      {
        id: 2,
        trainNumber: '020У',
        route: 'Москва → Санкт-Петербург',
        routeSuffix: '«Мегаполис»',
        departureTime: '00:20',
        arrivalTime: '08:59',
        duration: '8 : 39',
        departureStation: 'Ленинградский вокзал',
        arrivalStation: 'Московский вокзал',
        returnTrip: false,
        compact: true,
        price: 3950,
        prices: [
          { type: 'Купе', count: 90, price: 3950 },
          { type: 'Люкс', count: 31, price: 4950 },
        ],
      },
      {
        id: 3,
        trainNumber: '116С',
        route: 'Москва → Санкт-Петербург',
        routeOrigin: 'Нижний Новгород',
        routeSuffix: '«Волга»',
        departureTime: '00:41',
        arrivalTime: '09:13',
        duration: '8 : 32',
        departureStation: 'Ленинградский вокзал',
        arrivalStation: 'Ладожский вокзал',
        returnTrip: true,
        price: 2530,
        prices: [
          { type: 'Плацкарт', count: 52, price: 2530 },
          { type: 'Купе', count: 24, price: 3820 },
          { type: 'Люкс', count: 15, price: 4950 },
        ],
      },
      {
        id: 4,
        trainNumber: '116С',
        route: 'Москва → Санкт-Петербург',
        routeOrigin: 'Адлер',
        departureTime: '00:10',
        arrivalTime: '09:52',
        duration: '9 : 42',
        departureStation: 'Курский вокзал',
        arrivalStation: 'Ладожский вокзал',
        returnTrip: true,
        price: 1920,
        prices: [
          { type: 'Сидячий', count: 88, price: 1920 },
          { type: 'Плацкарт', count: 52, price: 2530 },
          { type: 'Купе', count: 24, price: 3820 },
          { type: 'Люкс', count: 15, price: 4950 },
        ],
      },
      {
        id: 5,
        trainNumber: '116С',
        route: 'Москва → Санкт-Петербург',
        routeOrigin: 'Адлер',
        departureTime: '00:10',
        arrivalTime: '09:52',
        duration: '9 : 42',
        departureStation: 'Курский вокзал',
        arrivalStation: 'Ладожский вокзал',
        returnTrip: true,
        price: 1920,
        prices: [
          { type: 'Сидячий', count: 88, price: 1920 },
          { type: 'Плацкарт', count: 52, price: 2530 },
          { type: 'Купе', count: 24, price: 3820 },
          { type: 'Люкс', count: 15, price: 4950 },
        ],
      },
    ];

    setTrains(trainsData);
  }, []);

  return (
    <div className="trains-list">
      {trains.map((train) => (
        <TrainCard
          key={train.id}
          {...train}
          compact={train.compact ?? false}
        />
      ))}
    </div>
  );
}

export default TrainsList;

