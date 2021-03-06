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
        prices: this.props.hasAlternateUnit ? priceFields.secondary : priceFields.main,
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
            case priceTypes.retail: return product[prices.retail];
            case priceTypes.gold: return product[prices.gold];
            case priceTypes.points: return product.priceInPoints;
        }
    };

    /**
     * Возвращает соотношение
     * @param alternative { boolean }
     */
    getRatio(alternative = false) {
        const { unitRatio, unitRatioAlt } = this.props.product;
        return Math.floor((alternative ? unitRatioAlt : unitRatio) * 100) / 100;
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

                <p className="price-block__price-gold">{ this.getPrice(priceTypes.gold) ?? 0 } Р</p>

                <p className="price-block__price-retail">{ this.getPrice() ?? 0 } Р</p>

                <p className="price-block__point-label">За баллы:
                    <span>{ this.getPrice(priceTypes.points) ?? 0 }</span>
                </p>
            </div>

            <div className="price-block__tooltip">
                <p className="price-block__tooltip-label">Продается упаковками:</p>

                <p className="price-block__tooltip-value">
                    { `${this.getRatio() ?? 1} ${unit} = ${this.getRatio(true) ?? 1} ${unitAlt}` }
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
