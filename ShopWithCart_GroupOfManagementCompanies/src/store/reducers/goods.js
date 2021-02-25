import { types } from 'Store/actions/goods';

const initialState = {
    entries: [],
    loading: false,
};

export const goodsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_GOODS: return {
            ...state,
            entries: action.payload,
        };
        default: return state;
    }
}
