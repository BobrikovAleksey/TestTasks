import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';


const state = {
    activeDeals: {
        list: [],
        loading: false,
    },
    completeDeals: {
        list: [],
        loading: false,
    },
    lastInsertedId: 1,
};

export default {
    state,
    mutations,
    actions,
    getters,
};
