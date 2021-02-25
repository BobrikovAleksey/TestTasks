import './style';
import React from 'react';

export class CardPreview extends React.Component {
    state = {
        //
    };

    render() {
        const { code, feedbacks, rating, smallImageUrl } = this.props.product;

        return <div className="card-preview">
            <p className="card-preview__id">
                <span className="card-preview__id_secondary">Код:</span>{ code }
            </p>

            <div className="card-preview__image">
                <img src={ smallImageUrl } alt="product" />
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
