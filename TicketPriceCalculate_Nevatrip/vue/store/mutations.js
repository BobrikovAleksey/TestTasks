// ticket

/**
 * @param state
 * @param index { number }
 */
const SET_TICKET_BACK_INDEX = (state, index) => {
    state.tickets.backIndex = index;
};

/**
 * @param state
 * @param index { number }
 */
const SET_TICKET_STRAIGHT_INDEX = (state, index) => {
    state.tickets.straightIndex = index;
};

/**
 * @param state
 * @param quantity { number }
 */
const SET_TICKET_QUANTITY = (state, quantity) => {
    state.tickets.quantity = quantity;
};

// other

/**
 * @param state
 * @param value { number }
 */
const SET_DIRECTION = (state, value) => {
    state.directions.current = value;
};

/**
 * @param state
 * @param message { string[] }
 */
const SET_MESSAGE = (state, message) => {
    state.message = message;
};

/**
 * @param state
 * @param data {{ timezone: { name: string, value: number }, from: string, to: string,
 *                straight: string[]|'yyyy-mm-dd hh:mm:ss', back: string[]|'yyyy-mm-dd hh:mm:ss' }}
 */
const SET_TIMETABLE = (state, data) => {
    state.timetable = { ...data };
};

export default {
    // ticket
    SET_TICKET_BACK_INDEX,
    SET_TICKET_STRAIGHT_INDEX,
    SET_TICKET_QUANTITY,
    // other
    SET_DIRECTION,
    SET_MESSAGE,
    SET_TIMETABLE,
};
