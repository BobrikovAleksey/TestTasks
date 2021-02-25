import { createStore, applyMiddleware, compose } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';

import { rootReducer } from './reducers';

export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(logger, thunk),
        window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__']()
    )
);
