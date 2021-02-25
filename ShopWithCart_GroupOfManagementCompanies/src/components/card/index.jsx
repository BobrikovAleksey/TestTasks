import './style';
import React from 'react';

import { CardDetails } from './card-details';
import { CardPreview } from './card-preview';
import { CardPrice } from './card-price';

export class Card extends React.Component {
    state = {
        //
    };

    render() {
        const { product } = this.props

        return <div className="card">
            <CardPreview product={ product } />

            <CardDetails product={ product } />

            <CardPrice product={ product } />
        </div>
    };
}
