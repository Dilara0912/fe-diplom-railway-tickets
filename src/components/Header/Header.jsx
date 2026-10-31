import './Header.css';

function Header() {
    return (
        <header className="header">
            <div className="header__top">
                <div className="header__logo">
                    Лого
                </div>
            </div>

            <nav className="header__nav">
                <a href="#about">О нас</a>
                <a href="#how">Как это работает</a>
                <a href="#reviews">Отзывы</a>
                <a href="#contacts">Контакты</a>
            </nav>
        </header>
    );
}

export default Header;