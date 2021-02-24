import './style';
import React from 'react';

export class CardPreview extends React.Component {
    state = {
        //
    };

    render() {
        return <div className="card-preview">
            <p className="card-preview__id">
                <span className="card-preview__id_secondary">Код:</span>147264
            </p>

            <div className="card-preview__image">
                <img src="//cs.petrovich.ru/images/2557176/original-160x182-fit.jpg" alt="product"/>
            </div>

            <p className="card-preview__rating">
                <span className="card-preview__rating-stars">
                    <i className="material-icon card-preview__rating-star">star</i>
                    <i className="material-icon card-preview__rating-star">star</i>
                    <i className="material-icon card-preview__rating-star">star</i>
                    <i className="material-icon card-preview__rating-star">star</i>
                    <i className="material-icon card-preview__rating-star">star</i>
                </span>

                <span className="card-preview__rating-counter">(6)</span>
            </p>
        </div>
    };
}
