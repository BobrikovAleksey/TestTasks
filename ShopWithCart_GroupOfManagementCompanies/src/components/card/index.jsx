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
        return <div className="card">
            <CardPreview />

            <CardDetails />

            <CardPrice />
        </div>
    };
}
