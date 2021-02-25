import 'Styles/main';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'Store';

import { CatalogRedux } from 'Containers/Catalog';

class App extends React.Component {
    state = {
        //
    };

    render() {
        return <div>
            <CatalogRedux />
        </div>;
    }
}

ReactDom.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.querySelector('#root')
);
