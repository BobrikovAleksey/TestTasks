/**
 * Сравнивает два элемента между собой (для сортировки)
 * @param left {{ accuracy: number, speed: number, textLength: number }}
 * @param right {{ accuracy: number, speed: number, textLength: number }}
 * @returns {number}
 */
const compare = (left, right) => {
  if (left.speed > right.speed) return -1;
  if (left.speed < right.speed) return 1;
  if (left.accuracy > right.accuracy) return -1;
  if (left.accuracy < right.accuracy) return 1;
  if (left.textLength > right.textLength) return -1;
  if (left.textLength < right.textLength) return 1;
  return 0;
};

/**
 * @param state
 * @param item {{ accuracy: number, certificate: string, speed: number, textLength: number }}
 * @constructor
 */
const ADD_ITEM = (state, item) => {
  const list = [...state.list];
  list.push(item);
  list.sort(compare);
  state.list = list.slice(0, 5);
};

/**
 * @param state
 * @param list {{ accuracy: number, certificate: string, speed: number, textLength: number }[]}
 * @constructor
 */
const SET_LIST = (state, list) => {
  state.list = list;
};

export default {
  ADD_ITEM,
  SET_LIST,
};
