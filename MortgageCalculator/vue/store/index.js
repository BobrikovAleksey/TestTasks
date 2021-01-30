import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';


const state = {
    initFee: 0,

    interestRate: {
        percent: 10,
        yearValue: 10 / 100,
        monthValue: 10 / 1200,
    },

    loanTerm: {
        default: 10,
        months: 10 * 12,
        years: 10,
        range: {
            min: 5,
            max: 30,
        },
    },

    percentAnchor: null,

    price: 0,
};


export default {
    state,
    mutations,
    actions,
    getters,
};
