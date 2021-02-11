/**
 * @param state
 * @param value {number}
 * @constructor
 */
const SET_DIRECTIONS_VALUE = (state, value) => {
    state.directions.value = value;
};

/**
 * @param state
 * @param message {string|string[]}
 * @constructor
 */
const SET_MESSAGE = (state, message) => {
    state.message = message;
};

/**
 * @param state
 * @param value {number}
 * @constructor
 */
const SET_MIN_TIME = (state, value) => {
    state.minTime = value;
};

/**
 * @param state
 * @param value {number}
 * @constructor
 */
const SET_TICKET_QUANTITY = (state, value) => {
    state.ticketQuantity = value;
};

/**
 * @param state
 * @param name {string}
 * @param value {number}
 * @constructor
 */
const SET_TIME_POINT = (state, { name, value }) => {
    state[name].value = value;
};

export default {
    SET_DIRECTIONS_VALUE,
    SET_MESSAGE,
    SET_MIN_TIME,
    SET_TICKET_QUANTITY,
    SET_TIME_POINT,
};
