/**
 * Возвращает promise с ответом от сервера
 * @param getters
 * @param state
 * @returns {Promise<any>}
 */
const fetchTextFromFishText = async ({ getters }) => {
  const response = await fetch(`${getters.getApiUrl}?${getters.getApiQuery}`);
  return response.json();
};

/**
 * Получает случайный текст для тестирования
 * @param commit
 * @param getters
 * @param state
 */
const fetchText = ({ commit, getters, state }) => {
  const { error, status } = state.api;

  commit('SET_TEXT_LOADING');
  fetchTextFromFishText({ getters }).then((data) => {
    if (data[status.name] === status.value) {
      commit('SET_TEXT_VALUE', data[state.api.value]);
    } else {
      commit('SET_TEXT_ERROR', `Код ошибки: ${error.code}. \nСообщение: ${error.message}`);
    }
  }).catch((err) => {
    commit('SET_TEXT_ERROR', err);
  });
};

/**
 * Добавляет запись в статистику (реализована на скорую руку)
 * @param commit
 * @param state
 * @param data {{ accuracy: number, certificate: string, speed: number, textLength: number }}
 */
const addItemToStats = ({ commit, state }, data) => {
  const newList = [...state.stats.list, data];
  commit('SET_STATS_LIST', newList.sort((a, b) => {
    if (a.speed > b.speed) return -1;
    if (a.speed === b.speed && a.accuracy > b.accuracy) return -1;
    if (a.accuracy === b.accuracy && a.textLength < b.textLength) return -1;
    return 1;
  }));
};

/**
 * Выгружает статистику из хранилища браузера
 * @param commit
 */
const loadStats = ({ commit }) => {
  const data = JSON.parse(localStorage.getItem('stats')) ?? { counter: 0, list: [] };
  commit('SET_STATS', data);
};

/**
 * Сохраняет статистику в хранилище браузера
 */
const saveStats = ({ state }) => {
  localStorage.setItem('stats', JSON.stringify(state.stats));
};

/**
 * Удаляет статистику
 * @param commit
 * @param state
 */
const clearStats = ({ commit, state }) => {
  commit('SET_STATS', { counter: 0, list: [] });
  saveStats({ state });
};

/**
 * Устанавливает указанное количество предложений в тексте для теста
 * @param commit
 * @param value { number }
 */
const setApiTextCount = ({ commit }, value) => {
  commit('SET_API_TEXT_COUNT',
    typeof value === 'number' && value >= 1 && value <= 6 ? value : 5);
};

export default {
  fetchText,
  addItemToStats,
  clearStats,
  loadStats,
  saveStats,
  setApiTextCount,
};
