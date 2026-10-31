
import './LastTickets.css';

import servicesIcon from '../../assets/icons/services.png';

const tickets = [
  {
    from: 'Санкт-Петербург',
    to: 'Самара',
    fromStation: 'Курский вокзал',
    toStation: 'Московский вокзал',
    price: '2 500',
  },
  {
    from: 'Москва',
    to: 'Казань',
    fromStation: 'Курский вокзал',
    toStation: 'Московский вокзал',
    price: '3 500',
  },
  {
    from: 'Казань',
    to: 'Нижний Новгород',
    fromStation: 'Курский вокзал',
    toStation: 'Московский вокзал',
    price: '3 800',
  },
];

function LastTickets() {
  return (
    <section className="last-tickets">
      <h2 className="last-tickets__title">ПОСЛЕДНИЕ БИЛЕТЫ</h2>

      <div className="last-tickets__list">
        {tickets.map((ticket) => (
          <article
            className="last-ticket"
            key={`${ticket.from}-${ticket.to}`}
          >
            <div className="last-ticket__route">
              <div className="last-ticket__origin">
                <span>{ticket.from}</span>
                <small>{ticket.fromStation}</small>
              </div>

              <div className="last-ticket__destination">
                <span>{ticket.to}</span>
                <small>{ticket.toStation}</small>
              </div>
            </div>

            <div className="last-ticket__bottom">
              <div className="last-ticket__icons">
                <img src={servicesIcon} alt="" />
              </div>

              <div className="last-ticket__price">
                <span className="last-ticket__from">от</span>
                <strong>{ticket.price}</strong>
                <span className="last-ticket__rub">₽</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default LastTickets;

