import './style';
import React from 'react';

export class CardPreview extends React.Component {
    state = {
        //
    };

    getImage() {
        const { primaryImageUrl } = this.props.product;
        const lastDotIndex = primaryImageUrl.lastIndexOf('.');
        return `${primaryImageUrl.substring(0, lastDotIndex)}_220x200_1${primaryImageUrl.substring(lastDotIndex)}`;
    };

    render() {
        const { code } = this.props.product;
        const rating = Math.round(Math.random() * 5);
        const feedbacks = rating > 0 ? Math.round(Math.random() * 99 + 1) : 0;

        return <div className="card-preview">
            <p className="card-preview__id">
                <span className="card-preview__id_secondary">Код:</span>{ Number(code) }
            </p>

            <div className="card-preview__image">
                <img src={ this.getImage() } alt="product" />
            </div>

            <p className="card-preview__rating">
                <span className="card-preview__rating-stars">
                    { [1, 2, 3, 4, 5].map((el, key) => {
                        const modifier = rating >= el ? 'card-preview__rating-star_active' : '';
                        return <i className={`material-icon card-preview__rating-star ${modifier}`} key={ key }>star</i>
                    })}
                </span>

                <span className="card-preview__rating-counter">({ feedbacks })</span>
            </p>
        </div>
    };
}
