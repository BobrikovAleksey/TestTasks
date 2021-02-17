/**
 * Возвращает ответ сервера со случайным текстом
 * @param getters
 * @returns { Promise<any> }
 */
const fetchTextFromFishText = async ({ getters }) => {
  const response = await fetch(`${getters.getApiUrl}?${getters.getApiQuery}`);
  return response.json();
};

/**
 * Устанавливает случайный текст
 * @param commit
 * @param getters
 * @param state
 */
const fetchText = ({ commit, getters, state }) => {
  const { fields } = state.api;
  commit('SET_TEXT_LOADING');

  fetchTextFromFishText({ getters })
    .then((data) => {
      if (data[fields.status.name] === fields.status.valueTrue) {
        commit('SET_TEXT_VALUE', data[fields.result]);
      } else {
        commit('SET_TEXT_ERROR',
          `Код ошибки: ${fields.error.code}.\nСообщение: ${fields.error.value}`);
      }
    })
    .catch((err) => commit('SET_TEXT_ERROR', err));
};

/**
 * Устанавливает количество предложений в тексте
 * @param commit
 * @param state
 * @param value { number }
 */
const setTextLength = ({ commit, state }, value) => {
  const newValue = Number(value);
  if (value === undefined || Number.isNaN(newValue)) return;

  const { min, max } = state.text.length;
  commit('SET_TEXT_LENGTH', newValue >= min && newValue <= max ? newValue : 3);
};

/**
 * Сбрасывает таймер
 * @param commit
 * @param state
 */
const clearTimer = ({ commit, state }) => {
  if (state.test.timer.id !== null) clearInterval(state.test.timer.id);
  commit('CLEAR_TIMER');
};

/**
 * Устанавливает таймер и выполнение callback-функции по нему
 * @param commit
 * @param state
 * @param callback { function }
 * @returns { boolean }
 */
const startTimer = ({ commit, state }, callback) => {
  clearTimer({ commit, state });
  if (typeof callback !== 'function') return false;
  commit('UPDATE_TIMER', setInterval(callback, 1000));
  return true;
};

const stopTimer = ({ commit, state }) => {
  if (state.test.timer.id !== null) {
    clearInterval(state.test.timer.id);
    commit('STOP_TIMER');
  }
};

/**
 * Обновляет текущее положение таймера
 * @param commit
 * @param state
 */
const updateEndTimer = ({ commit, state }) => {
  if (state.test.timer.id === null) return;
  commit('UPDATE_END_TIMER');
};

/**
 * Перемещает курсор в тексте
 * @param commit
 * @param state
 * @param increment { number }
 */
const incCursorPosition = ({ commit, state }, increment = 1) => {
  if (typeof increment !== 'number') return;
  commit('SET_CURSOR', state.test.cursor + increment);
};

/**
 * Увеличивает счетчик ошибок
 * @param commit
 * @param state
 * @param increment { number }
 */
const incMistakes = ({ commit, state }, increment = 1) => {
  if (typeof increment !== 'number') return;
  commit('SET_MISTAKES', state.test.mistakes + increment);
};

/**
 * Сбрасывает данные теста
 * @param commit
 * @param state
 */
const resetTest = ({ commit, state }) => {
  clearTimer({ commit, state });
  commit('RESET_TEST');
};

/**
 * Изменяет позицию курсора в тексте
 * @param commit
 * @param value { number }
 */
const setCursorPosition = ({ commit }, value) => {
  if (typeof value !== 'number') return;
  commit('SET_CURSOR', value);
};

/**
 * Переключает видимость теста
 * @param commit
 * @param state
 * @param position { boolean|null }
 */
const switchTestVisibility = ({ commit, state }, position = null) => {
  if (typeof position !== 'boolean') {
    commit('SWITCH_TEST_VISIBILITY', !state.test.visibility);
  } else {
    commit('SWITCH_TEST_VISIBILITY', position);
  }
};

export default {
  // text
  fetchText,
  setTextLength,
  // timer
  clearTimer,
  startTimer,
  stopTimer,
  updateEndTimer,
  // test
  incCursorPosition,
  incMistakes,
  resetTest,
  setCursorPosition,
  switchTestVisibility,
};
