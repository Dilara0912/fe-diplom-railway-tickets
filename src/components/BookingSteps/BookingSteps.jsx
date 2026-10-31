import './BookingSteps.css';

function BookingSteps({ currentStep = 1 }) {
  const steps = [
    'Билеты',
    'Пассажиры',
    'Оплата',
    'Проверка',
  ];

  return (
    <div className="booking-steps">
      <div className="booking-steps__container">

        {steps.map((step, index) => (
          <div
            key={step}
            className={`booking-steps__item ${
              currentStep === index + 1
                ? 'booking-steps__item--active'
                : ''
            }`}
          >
            <span className="booking-steps__number">
              {index + 1}
            </span>

            <span className="booking-steps__text">
              {step}
            </span>
          </div>
        ))}

      </div>
    </div>
  );
}

export default BookingSteps;