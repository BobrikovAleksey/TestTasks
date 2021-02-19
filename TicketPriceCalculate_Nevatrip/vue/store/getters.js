import {
    formatTimetable,
} from '../libs.js';

// direction

const getCurrentDirection = (state) => state.directions.list.find((el) => el.id === state.directions.current);

const getCurrentDirectionIndex = (state) => state.directions.current;

const getDirectionList = (state) => state.directions.list;

// timetable

const getFromPoint = (state) => state.timetable.from ?? 'A';

const getToPoint = (state) => state.timetable.to ?? 'B';

const getTimetableBack = (state) => {
    const { timezone, back } = state.timetable;
    if (!back) return [];
    return formatTimetable(back, timezone);
};

const getTimetableStraight = (state) => {
    const { timezone, straight } = state.timetable;
    if (!straight) return [];
    return formatTimetable(straight, timezone);
};

// ticket

const getQuantityTickets = (state) => state.tickets.quantity;

const getTicketBack = (state, getters) => getters.getTimetableBack[state.tickets.backIndex] ?? null;

const getTicketBackIndex = (state) => state.tickets.backIndex;

const getTicketPrice = (state) => state.directions.current === 3 ? state.travel.price.two : state.travel.price.one;

const getTicketStraight = (state, getters) => getters.getTimetableStraight[state.tickets.straightIndex] ?? null;

const getTicketStraightIndex = (state) => state.tickets.straightIndex;

const getCostTickets = (state, getters) => state.tickets.quantity * getters.getTicketPrice;

// other

const getMaxStraightDate = (state, getters) => {
    if (!getters.getTicketBack) return null;
    const date = new Date(getters.getTicketBack.value);
    date.setMinutes(date.getMinutes() - state.travel.time.straight);
    return date;
};

const getMinBackDate = (state, getters) => {
    if (!getters.getTicketStraight) return null;
    const date = new Date(getters.getTicketStraight.value);
    date.setMinutes(date.getMinutes() + state.travel.time.straight);
    return date;
};

const getMessage = (state) => state.message;

const getTravelTime = (state) => state.travel.time;

const getTravelTimeRoad = (state) => {
    switch (state.directions.current) {
        default: return 0;
        case 1: return state.travel.time.straight;
        case 2: return state.travel.time.back;
        case 3: return state.travel.time.straight + state.travel.time.back;
    }
};

const getTravelTimeFull = (state, getters) => {
    if (state.directions.current === 3 && state.tickets.straightIndex >= 0 && state.tickets.backIndex >= 0) {
        const time = Math.ceil((getters.getTicketBack.value - getters.getTicketStraight.value) / 60000);
        return time + getters.getTravelTimeRoad;
    }
    return getters.getTravelTimeRoad;
};

export default {
    // direction
    getCurrentDirection,
    getCurrentDirectionIndex,
    getDirectionList,
    // timetable
    getFromPoint,
    getToPoint,
    getTimetableBack,
    getTimetableStraight,
    // ticket
    getCostTickets,
    getQuantityTickets,
    getTicketBack,
    getTicketBackIndex,
    getTicketPrice,
    getTicketStraight,
    getTicketStraightIndex,
    // other
    getMaxStraightDate,
    getMinBackDate,
    getMessage,
    getTravelTime,
    getTravelTimeFull,
    getTravelTimeRoad,
}
