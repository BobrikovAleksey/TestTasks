import React from 'react';
import { connect } from 'react-redux';
import { fetchGoods } from 'Store/actions/goods';

import { Catalog } from 'Components/catalog';

class CatalogContainer extends React.Component {
    componentDidMount() {
        const { fetchGoods } = this.props;
        fetchGoods && fetchGoods();
    };

    render() {
        const { goods } = this.props;

        return (
            <Catalog goods={ goods }/>
        );
    };
}

function mapStateToProps(state, ownProps) {
    const goods = state.goods.entries;

    return {
        goods,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchGoods: () => dispatch(fetchGoods()),
    };
}

export const CatalogRedux = connect(mapStateToProps, mapDispatchToProps)(CatalogContainer);
