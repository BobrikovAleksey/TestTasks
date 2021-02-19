import { parseDateList } from '../libs.js';

// fetch

/**
 * Имитация получения json-файла с расписанием
 * @param commit
 */
const fetchTimetable = ({ commit }) => {
    const date = '2021-08-21';

    const data = {
        timezone: {
            title: 'Челябинск',
            value: -300,
        },
        from: 'г. Челябинск',
        to: 'г. Миасс',
        straight: [
            `${date} 18:30:00`,
            `${date} 18:45:00`,
            `${date} 19:00:00`,
            `${date} 19:15:00`,
            `${date} 21:00:00`,
        ],
        back: [
            `${date} 18:30:00`,
            `${date} 18:45:00`,
            `${date} 19:00:00`,
            `${date} 19:15:00`,
            `${date} 19:35:00`,
            `${date} 21:50:00`,
            `${date} 21:55:00`,
        ],
    };

    data.timezone.diff = data.timezone.value - (new Date).getTimezoneOffset();
    data.straight = parseDateList(data.straight);
    data.back = parseDateList(data.back);
    commit('SET_TIMETABLE', data);
};

// ticket

/**
 * Устанавливает количество билетов
 * @param commit
 * @param quantity { number }
 */
const setQuantityTickets= ({ commit }, quantity) => {
    if (typeof quantity !== 'number') return;
    commit('SET_TICKET_QUANTITY', quantity >= 0 ? quantity : 0);
};

/**
 * Устанавливает индекс выбранного времени отправления в обратном направлении (индекс в расписании обратного маршрута)
 * @param commit
 * @param state
 * @param index { number }
 */
const setTicketBackIndex = ({ commit, state }, index = -1) => {
    if (typeof index !== 'number') return;
    if (index >= 0 || index < state.timetable.back.length) {
        commit('SET_TICKET_BACK_INDEX', index);
    } else {
        commit('SET_TICKET_BACK_INDEX', -1);
    }
};

/**
 * Устанавливает индекс выбранного времени отправления в прямом направлении (индекс в расписании прямого маршрута)
 * @param commit
 * @param state
 * @param index { number }
 */
const setTicketStraightIndex = ({ commit, state }, index = -1) => {
    if (typeof index !== 'number') return;
    if (index >= 0 || index < state.timetable.straight.length) {
        commit('SET_TICKET_STRAIGHT_INDEX', index);
    } else {
        commit('SET_TICKET_STRAIGHT_INDEX', -1);
    }
};

// other

/**
 * Устанавливает идентификатор направление
 * @param commit
 * @param state
 * @param id { number }
 */
const setDirectionId = ({ commit, state }, id) => {
    if (typeof id !== 'number' || !state.directions.list.find((el) => el.id === id)) return;
    commit('SET_DIRECTION', id);
};

/**
 * Изменяет текст сообщения
 * @param commit
 * @param message { string|string[] }
 */
const setMessage = ({ commit }, message) => {
    if (typeof message === 'string') message = [message];
    if (!Array.isArray(message)) return;
    commit('SET_MESSAGE', message);
};

export default {
    // fetch
    fetchTimetable,
    // ticket
    setQuantityTickets,
    setTicketBackIndex,
    setTicketStraightIndex,
    // other
    setDirectionId,
    setMessage,
};
