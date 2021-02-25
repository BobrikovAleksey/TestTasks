import { combineReducers } from 'redux';
// import { cartReducer as cart } from './cart';
import { goodsReducer as goods } from './goods';

export const rootReducer = combineReducers({
    // cart,
    goods,
});
