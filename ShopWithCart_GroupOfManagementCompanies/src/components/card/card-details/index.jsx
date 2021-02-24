import './style';
import React from 'react';

export class CardDetails extends React.Component {
    state = {
        //
    };

    render() {
        return <div className="card-details">
            <h3 className="card-details__name">Ламинат Kronospan Kronofix 31 класс дуб альпийский 2,47 кв.м 7 мм</h3>

            <button className="card-details__availability">
                <i className="fa fa-check-circle card-details__availability-icon"></i>

                <span className="card-details__availability-text">Посмотреть наличие</span>
            </button>

            <nav className="card-details__breadcrumbs">
                <a className="card-details__link" href="#">Интерьер и отделка</a>

                <a className="card-details__link" href="#">Напольные покрытия</a>

                <a className="card-details__link" href="#">Ламинат</a>

                <a className="card-details__link" href="#">Ламинат 31 класс</a>
            </nav>

            <p className="card-details__description">
                Количество в упаковке: 2,47; Бренд: Kronospan; Коллекция: Kronofix; Тип товара: Ламинат; Толщина: 7;
                Длина: 1285; Ширина: 192; Количество в упаковки
            </p>

            <button className="card-details__related">С товаром может понадобиться</button>
        </div>
    };
}
