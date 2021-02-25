import './style';
import React from 'react';

export class CardDetails extends React.Component {
    state = {
        //
    };

    render() {
        const { title, description } = this.props.product;

        return <div className="card-details">
            <h3 className="card-details__name">{ title }</h3>

            <button className="card-details__availability">
                <i className="material-icon card-details__availability-icon">query_builder</i>

                <span className="card-details__availability-text">Посмотреть наличие</span>
            </button>

            <nav className="card-details__breadcrumbs">
                <a className="card-details__link" href="#">Интерьер и отделка</a>

                <a className="card-details__link" href="#">Напольные покрытия</a>

                <a className="card-details__link" href="#">Ламинат</a>

                <a className="card-details__link" href="#">Ламинат 31 класс</a>
            </nav>

            <p className="card-details__description">{ description }</p>

            <button className="card-details__related">С товаром может понадобиться</button>
        </div>
    };
}
