import './HowItWorks.css';
import workBg from '../../assets/images/work-bg.png';

import computer from '../../assets/icons/computer.svg';
import office from '../../assets/icons/office.svg';
import globe from '../../assets/icons/globe.svg';

function HowItWorks() {
  return (
    <section
      className="how"
      style={{ backgroundImage: `url(${workBg})` }}
    >
      <div className="container">
        <div className="how-header">
          <h2>Как это работает</h2>

          <button>Узнать больше</button>
        </div>

        <div className="how-items">
          <div className="how-item">
            <img src={computer} alt="" />
            <p>Удобный заказ на сайте</p>
          </div>

          <div className="how-item">
            <img src={office} alt="" />
            <p>Нет необходимости ехать в офис</p>
          </div>

          <div className="how-item">
            <img src={globe} alt="" />
            <p>Огромный выбор направлений</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;