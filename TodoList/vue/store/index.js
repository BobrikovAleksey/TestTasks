import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';


const state = {
    activeDeals: {
        list: [
            { id: 1, title: 'Такие дела', color: 'primary'},
            { id: 2, title: 'Такие дела', color: 'warning'},
            { id: 3, title: 'Такие дела', color: 'primary'},
            { id: 4, title: 'Такие дела', color: 'warning'},
        ],
        loading: false,
    },
    completeDeals: {
        list: [
            { id: 5, title: 'А эти уже закрыты', color: 'warning'},
            { id: 6, title: 'А эти уже закрыты', color: 'primary'},
            { id: 7, title: 'А эти уже закрыты', color: 'warning'},
            { id: 8, title: 'А эти уже закрыты', color: 'primary'},
        ],
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
