/**
 * Добавляет запись в историю
 * @param commit
 * @param accuracy { number }
 * @param certificate { string }
 * @param speed { number }
 * @param textLength { number }
 * @returns { boolean }
 */
const addItem = ({ commit }, {
  accuracy,
  certificate,
  speed,
  textLength,
}) => {
  if (accuracy === undefined || certificate === undefined || speed === undefined
    || textLength === undefined || Number.isNaN(Number(accuracy)) || Number.isNaN(Number(speed))
    || Number.isNaN(Number(speed))) return false;

  commit('ADD_ITEM', {
    certificate,
    speed: Number(speed),
    accuracy: Number(accuracy),
    textLength: Number(textLength),
  });
  return true;
};

/**
 * Выгружает историю из хранилища браузера
 * @param commit
 */
const loadData = ({ commit }) => {
  commit('SET_LIST', JSON.parse(localStorage.getItem('history')) ?? []);
};

/**
 * Сохраняет историю в хранилище браузера
 */
const saveData = ({ state }) => {
  localStorage.setItem('history', JSON.stringify(state.list));
};

/**
 * Добавляет запись в историю
 * @param commit
 * @param state
 * @param accuracy { number }
 * @param certificate { string }
 * @param speed { number }
 * @param textLength { number }
 */
const addItemWithSave = ({ commit, state }, {
  accuracy,
  certificate,
  speed,
  textLength,
}) => {
  if (!addItem({ commit }, {
    accuracy,
    certificate,
    speed,
    textLength,
  })) return;
  saveData({ state });
};

/**
 * Удаляет историю
 * @param commit
 * @param state
 */
const clear = ({ commit, state }) => {
  commit('SET_LIST', []);
  saveData({ state });
};

export default {
  addItem,
  addItemWithSave,
  clear,
  loadData,
  saveData,
};
