import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

const prices = {
    one: 700,
    two: 1200,
};

const travelTime = 50;

const directions = {
    value: 1,
    list: {
        1: { id: 1, value: 1, title: 'из пункта A в пункт B' },
        2: { id: 2, value: 2, title: 'из пункта B в пункт A' },
        3: { id: 3, value: 3, title: 'из пункта A в пункт B и обратно' },
    },
};

const timetableA = {
    value: null,
    title: directions.list[1].title,
    list: {
        1: { id: 1, value: 10 * 60 },
        2: { id: 2, value: 10 * 60 + 30 },
        3: { id: 3, value: 11 * 60 },
        4: { id: 4, value: 11 * 60 + 30 },
        5: { id: 5, value: 12 * 60 },
        6: { id: 6, value: 12 * 60 + 15 },
        7: { id: 7, value: 12 * 60 + 30 },
        8: { id: 8, value: 12 * 60 + 45 },
        9: { id: 9, value: 13 * 60 },
        10: { id: 10, value: 13 * 60 + 15 },
        11: { id: 11, value: 13 * 60 + 30 },
        12: { id: 12, value: 13 * 60 + 45 },
        13: { id: 13, value: 14 * 60 },
        14: { id: 14, value: 14 * 60 + 15 },
        15: { id: 15, value: 14 * 60 + 30 },
        16: { id: 16, value: 14 * 60 + 45 },
        17: { id: 17, value: 15 * 60 },
        18: { id: 18, value: 15 * 60 + 30 },
        19: { id: 19, value: 16 * 60 },
        20: { id: 20, value: 16 * 60 + 30 },
        21: { id: 21, value: 17 * 60 },
        22: { id: 22, value: 17 * 60 + 15 },
        23: { id: 23, value: 17 * 60 + 30 },
        24: { id: 24, value: 17 * 60 + 45 },
        25: { id: 25, value: 18 * 60 },
        26: { id: 26, value: 18 * 60 + 15 },
        27: { id: 27, value: 18 * 60 + 30 },
        28: { id: 28, value: 18 * 60 + 45 },
        29: { id: 29, value: 19 * 60 },
        30: { id: 30, value: 19 * 60 + 15 },
        31: { id: 31, value: 19 * 60 + 30 },
        32: { id: 32, value: 19 * 60 + 45 },
        33: { id: 33, value: 20 * 60 },
        34: { id: 34, value: 20 * 60 + 30 },
        35: { id: 35, value: 21 * 60 },
        36: { id: 36, value: 21 * 60 + 30 },
        37: { id: 37, value: 22 * 60 },
        38: { id: 38, value: 22 * 60 + 30 },
        39: { id: 39, value: 23 * 60 },
        40: { id: 40, value: 23 * 60 + 30 },
    },
};

const timetableB = {
    value: null,
    title: directions.list[2].title,
    list: {
        1: { id: 1, value: 10 * 60 + travelTime + 5 },
        2: { id: 2, value: 10 * 60 + 30 + travelTime + 5 },
        3: { id: 3, value: 11 * 60 + travelTime + 5 },
        4: { id: 4, value: 11 * 60 + 30 + travelTime + 5 },
        5: { id: 5, value: 12 * 60 + travelTime + 5 },
        6: { id: 6, value: 12 * 60 + 15 + travelTime + 5 },
        7: { id: 7, value: 12 * 60 + 30 + travelTime + 5 },
        8: { id: 8, value: 12 * 60 + 45 + travelTime + 5 },
        9: { id: 9, value: 13 * 60 + travelTime + 5 },
        10: { id: 10, value: 13 * 60 + 15 + travelTime + 5 },
        11: { id: 11, value: 13 * 60 + 30 + travelTime + 5 },
        12: { id: 12, value: 13 * 60 + 45 + travelTime + 5 },
        13: { id: 13, value: 14 * 60 + travelTime + 5 },
        14: { id: 14, value: 14 * 60 + 15 + travelTime + 5 },
        15: { id: 15, value: 14 * 60 + 30 + travelTime + 5 },
        16: { id: 16, value: 14 * 60 + 45 + travelTime + 5 },
        17: { id: 17, value: 15 * 60 + travelTime + 5 },
        18: { id: 18, value: 15 * 60 + 30 + travelTime + 5 },
        19: { id: 19, value: 16 * 60 + travelTime + 5 },
        20: { id: 20, value: 16 * 60 + 30 + travelTime + 5 },
        21: { id: 21, value: 17 * 60 + travelTime + 5 },
        22: { id: 22, value: 17 * 60 + 15 + travelTime + 5 },
        23: { id: 23, value: 17 * 60 + 30 + travelTime + 5 },
        24: { id: 24, value: 17 * 60 + 45 + travelTime + 5 },
        25: { id: 25, value: 18 * 60 + travelTime + 5 },
        26: { id: 26, value: 18 * 60 + 15 + travelTime + 5 },
        27: { id: 27, value: 18 * 60 + 30 + travelTime + 5 },
        28: { id: 28, value: 18 * 60 + 45 + travelTime + 5 },
        29: { id: 29, value: 19 * 60 + travelTime + 5 },
        30: { id: 30, value: 19 * 60 + 15 + travelTime + 5 },
        31: { id: 31, value: 19 * 60 + 30 + travelTime + 5 },
        32: { id: 32, value: 19 * 60 + 45 + travelTime + 5 },
        33: { id: 33, value: 20 * 60 + travelTime + 5 },
        34: { id: 34, value: 20 * 60 + 30 + travelTime + 5 },
        35: { id: 35, value: 21 * 60 + travelTime + 5 },
        36: { id: 36, value: 21 * 60 + 30 + travelTime + 5 },
        37: { id: 37, value: 22 * 60 + travelTime + 5 },
        38: { id: 38, value: 22 * 60 + 30 + travelTime + 5 },
        39: { id: 39, value: 23 * 60 + travelTime + 5 },
        40: { id: 40, value: 23 * 60 + 30 + travelTime + 5 },
    },
};

const minutesToString = function(value) {
    let hours = Math.floor(value / 60);
    hours = String(hours < 24 ? hours : hours - 24);
    const minutes = String(value % 60);
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
};

for (const key of Object.keys(timetableA.list)) {
    timetableA.list[key].valueAsString = minutesToString(timetableA.list[key].value);
    timetableB.list[key].valueAsString = minutesToString(timetableB.list[key].value);
}

timetableA.value = timetableA.list[1].value;
timetableB.value = timetableB.list[1].value;

const state = {
    message: [''],
    minTime: (new Date()).getHours() * 60 + (new Date()).getMinutes(),
    ticketQuantity: 1,
    prices,
    travelTime,
    timetableA,
    timetableB,
    directions,
};

export default {
    state,
    mutations,
    actions,
    getters,
};
