import './style';
import React from 'react';

const priceFields = {
    main: {
        retail: 'priceRetail',
        gold: 'priceGold',
    },
    secondary: {
        retail: 'priceRetailAlt',
        gold: 'priceGoldAlt',
    },
};

const priceTypes = {
    gold: 'gold',
    points: 'points',
    retail: 'retail',
};

export class CardPrice extends React.Component {
    state = {
        hasAlternative: this.props.hasAlternateUnit,
        prices: priceFields.secondary,
    };

    /**
     * Возвращает цену продукта
     * @param type { string }
     */
    getPrice(type = priceTypes.retail) {
        const { prices } = this.state;
        const { product } = this.props;
        switch (type) {
            default:
            case priceTypes.retail: return Math.floor(Number(product[prices.retail]) * 100) / 100;
            case priceTypes.gold: return Math.floor(Number(product[prices.gold]) * 100) / 100;
            case priceTypes.points: return Math.floor((Number(product[priceFields.main.retail]) / 4) * 100) / 100;
        }
    };

    /**
     * Возвращает соотношение
     * @param alternative { boolean }
     */
    getRatio(alternative = false) {
        const { unitRatio, unitRatioAlt } = this.props.product;
        return Math.floor(Number(alternative ? unitRatioAlt : unitRatio) * 100) / 100;
    }

    render() {
        const { unit, unitAlt } = this.props.product;

        return <div className="card-price">
            <div className="card-price__tabs">
                <p>Цена за</p>

                <button className="card-price__tab card-price__tab_active">{ unitAlt }</button>

                <button className="card-price__tab">{ unit }</button>
            </div>

            <div className="price-block__content">
                <p className="price-block__price-label">По карте клуба</p>

                <p className="price-block__price-gold">{ this.getPrice(priceTypes.gold) } Р</p>

                <p className="price-block__price-retail">{ this.getPrice() } Р</p>

                <p className="price-block__point-label">За баллы: <span>{ this.getPrice(priceTypes.points) }</span></p>
            </div>

            <div className="price-block__tooltip">
                <p className="price-block__tooltip-label">Продается упаковками:</p>

                <p className="price-block__tooltip-value">
                    { `${this.getRatio()} ${unit} = ${this.getRatio(true)} ${unitAlt}` }
                </p>
            </div>

            <div>
                <div>
                    <input pattern="^[0–9]$" step="1" min="0" type="number" autoComplete="off" value="1" readOnly />

                    <button>inc</button>

                    <button>dec</button>
                </div>
            </div>
        </div>
    };
}
