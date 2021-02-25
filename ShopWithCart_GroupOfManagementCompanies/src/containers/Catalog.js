import React from 'react';
import { connect } from 'react-redux';
import { fetchGoods, fetchGoodsWithApi } from 'Store/actions/goods';

import { Catalog } from 'Components/catalog';

class CatalogContainer extends React.Component {
    componentDidMount() {
        const { fetchGoodsWithApi } = this.props;
        fetchGoodsWithApi && fetchGoodsWithApi();
    };

    render() {
        const { goods } = this.props;

        return (
            <Catalog goods={ goods }/>
        );
    };
}

function mapStateToProps(state, ownProps) {
    return {
        goods: state.goods.entries,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchGoods: () => dispatch(fetchGoods()),
        fetchGoodsWithApi: () => dispatch(fetchGoodsWithApi()),
    };
}

export const CatalogRedux = connect(mapStateToProps, mapDispatchToProps)(CatalogContainer);
