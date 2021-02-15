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
 * Устанавливает указанное количество предложений в тексте для теста
 * @param commit
 * @param value { number }
 */
const setApiTextCount = ({ commit }, value) => {
  commit('SET_API_TEXT_COUNT',
    typeof value === 'number' && value >= 3 && value <= 7 ? value : 5);
};

export default {
  fetchText,
  setApiTextCount,
};
