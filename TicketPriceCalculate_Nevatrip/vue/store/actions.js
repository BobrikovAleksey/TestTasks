/**
 * Устанавливает направление
 * @param commit
 * @param value {number|string}
 */
const setDirection = ({ commit }, value) => {
    const newValue = Number(value);
    if (isNaN(newValue)) return;

    commit('SET_DIRECTIONS_VALUE', newValue);
};

/**
 * Изменяет текст сообщения
 * @param commit
 * @param message {string|string[]}
 */
const setMessage = ({ commit }, message) => {
    if (typeof message === 'string') message = [message];
    if (!Array.isArray(message)) return;

    commit('SET_MESSAGE', message);
};

/**
 * Устанавливает ограничение времени отправления
 * @param commit
 * @param value {number|string}
 */
const setMinTime = ({ commit }, value) => {
    const newValue = Number(value);
    if (isNaN(newValue)) return;

    commit('SET_MIN_TIME', newValue);
};

/**
 * Устанавливает количество билетов
 * @param commit
 * @param value {number|string}
 */
const setTicketQuantity = ({ commit }, value) => {
    const newValue = Number(value);
    if (isNaN(newValue)) return;

    commit('SET_TICKET_QUANTITY', newValue);
};

/**
 * Устанавливает время отправления из указанной точки
 * @param commit
 * @param state
 * @param name {string} 'a' | 'b'
 * @param value {number|string}
 */
const setTimePoint = ({ commit, state }, { name, value }) => {
    const newValue = Number(value);
    if (isNaN(newValue) || !state[name] || state[name].value === newValue) return;

    commit('SET_TIME_POINT', { name, value: newValue });
};

export default {
    setDirection,
    setMessage,
    setMinTime,
    setTicketQuantity,
    setTimePoint,
};
