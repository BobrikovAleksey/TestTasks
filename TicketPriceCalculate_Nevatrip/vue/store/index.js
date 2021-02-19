import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

const directions = {
    current: 1,
    list: [
        { id: 1, title: 'туда' },
        { id: 2, title: 'обратно' },
        { id: 3, title: 'туда и обратно' },
    ],
};

const travel = {
    price: {
        one: 700,
        two: 1200,
    },
    time: {
        straight: 50,
        back: 50,
    },
};

const state = {
    directions,
    travel,
    message: [''],
    timetable: {},
    tickets: {
        straightIndex: -1,
        backIndex: -1,
        quantity: 1,
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
};
