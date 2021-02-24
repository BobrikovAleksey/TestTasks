import './style';
import React from 'react';

export class CardPrice extends React.Component {
    state = {
        //
    };

    render() {
        return <div className="card-price">
            <div className="card-price__tabs">
                <p>Цена за</p>

                <button className="card-price__tab card-price__tab_active">м<sup>2</sup></button>

                <button className="card-price__tab">упаковку</button>
            </div>

            <div className="price-block__content">
                <p className="price-block__price-label">По карте клуба</p>

                <p className="price-block__price-gold">388 Р</p>

                <p className="price-block__price-retail">400 Р</p>

                <p className="price-block__point-label">За баллы: <span>239</span></p>
            </div>

            <div className="price-block__tooltip">
                <p className="price-block__tooltip-label">Продается упаковками:</p>

                <p className="price-block__tooltip-value">1 упак = 2.47 м2</p>
            </div>

            <div>
                <div>
                    <input pattern="^[0–9]$" step="1" min="0" type="number" autoComplete="off" value="1" />

                    <button>inc</button>

                    <button>dec</button>
                </div>
            </div>
        </div>
    };
}
