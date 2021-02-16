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
 * @param value { number }
 */
const setTextLength = ({ commit }, value) => {
  const newValue = Number(value);
  if (value === undefined || Number.isNaN(newValue)) return;
  commit('SET_TEXT_LENGTH', newValue > 0 && newValue < 7 ? newValue : 3);
};

export default {
  fetchText,
  setTextLength,
};
