import './Reviews.css';

import review1 from '../../assets/images/review-1.png';
import review2 from '../../assets/images/review-2.png';

function Reviews() {
    return (
        <section className="reviews">
            <div className="container">
                <h2>Отзывы</h2>

                <div className="reviews-list">
                    <div className="review-card">
                        <img src={review1} alt="" />

                        <div className="review-card-content">
                            <h3>Екатерина Вальнова</h3>

                            <p>
                                Доброжелательные подсказки
                                на всех этапах помогут правильно заполнить
                                поля и без затруднений купить авиа или ж/д
                                билет, даже если вы заказываете онлайн билет
                                впервые.
                            </p>
                        </div>
                    </div>

                    <div className="review-card">
                        <img src={review2} alt="" />

                        <div className="review-card-content">
                            <h3>Евгений Стрыкало</h3>

                            <p>
                                СМС-сопровождение до посадки
                                Сразу после оплаты ж/д билетов
                                и за 3 часа до отправления мы пришлем вам
                                СМС-напоминание о поездке.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="reviews-dots">
                <span className="active"></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </section>
    );
}

export default Reviews;

