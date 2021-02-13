import FishTextApi from '@/api/FishTextApi';

/**
 * Возвращает promise с ответом от сервера
 * @returns {Promise<any>}
 */
const fetchTextFromFishText = async () => {
  const response = await fetch(`${FishTextApi.url}?${FishTextApi.params}`);
  return response.json();
};

/**
 * Получает случайный текст для тестирования
 * @param commit
 */
const fetchText = ({ commit }) => {
  commit('SET_TEXT_LOADING');
  fetchTextFromFishText().then((data) => {
    if (FishTextApi.getStatus(data)) {
      commit('SET_TEXT_VALUE', FishTextApi.getValue(data));
    } else {
      commit('SET_TEXT_ERROR', FishTextApi.getError(data));
    }
  }).catch((error) => {
    commit('SET_TEXT_ERROR', error);
  });
};

export default {
  fetchText,
};
