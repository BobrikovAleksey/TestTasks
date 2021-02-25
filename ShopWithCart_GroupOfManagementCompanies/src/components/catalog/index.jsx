import './style';
import React from 'react';

import { Card } from 'Components/card';

export class Catalog extends React.Component {
    render() {
        const { goods } = this.props;

        return <ul>{
            goods.map((el, key) => <li key={ key }>
                <Card product={ el } />
            </li>)
        }</ul>
    };
}
