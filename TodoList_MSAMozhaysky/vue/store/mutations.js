import { MutationTypes } from './dictionary.js';


/**
 * Возвращает максимальный id в массиве объектов
 * @param list {{id: number}[]}
 * @returns {number}
 */
const getMax = (list) => {
    return list.reduceRight((max, el) => (max < el.id) ? el.id : max, 0);
};

export default {
    /**
     * Добавляет задачу
     * @param state
     * @param listName {string}
     * @param deal {{id: number, color: string, title: string}}
     */
    [MutationTypes.ADD](state, { listName, deal }) {
        deal.id = ++state.lastInsertedId;
        state[`${listName}Deals`].list.push(deal);
    },

    /**
     * Перемещает задачу из одного списка в другой
     * @param state
     * @param index {number}
     * @param sourceListName {string}
     * @param targetListName {string}
     */
    [MutationTypes.MOVE](state, { index, sourceListName, targetListName }) {
        state[`${targetListName}Deals`].list.push(state[`${sourceListName}Deals`].list[index]);
        state[`${sourceListName}Deals`].list.splice(index, 1);
    },

    /**
     * @param state
     * @param dir {number}
     * @param index {number}
     * @param listName {string}
     */
    [MutationTypes.MOVE_SELF](state, { dir = 1, index, listName}) {
        const list = state[`${listName}Deals`].list;
        const tmp = list[index];
        list.splice(index, 1, list[index + dir]);
        list.splice(index + dir, 1, tmp);
    },

    /**
     * @param state
     * @param index {number}
     * @param listName {string}
     */
    [MutationTypes.REMOVE](state, { index, listName}) {
        state[`${listName}Deals`].list.splice(index, 1);
    },

    /**
     * @param state
     * @param deal {{id: number, title: string}}
     * @param index {number}
     * @param listName {string}
     */
    [MutationTypes.UPDATE](state, { deal, index, listName} ) {
        state[`${listName}Deals`].list.splice(index, 1, deal);
    },

    /**
     * @param state
     * @param data {array}
     */
    [MutationTypes.SET_ACTIVE_LIST](state, data) {
        state.lastInsertedId = Math.max(getMax(data), state.lastInsertedId);
        state.activeDeals.list = [...data];
    },

    /**
     * @param state
     * @param loading {boolean}
     */
    [MutationTypes.SET_ACTIVE_LIST_LOADING](state, loading ) {
        state.activeDeals.loading = loading;
    },

    /**
     * @param state
     * @param data {array}
     */
    [MutationTypes.SET_COMPLETE_LIST](state, data ) {
        state.lastInsertedId = Math.max(getMax(data), state.lastInsertedId);
        state.completeDeals.list = [...data];
    },

    /**
     * @param state
     * @param loading {boolean}
     */
    [MutationTypes.SET_COMPLETE_LIST_LOADING](state, loading ) {
        state.completeDeals.loading = loading;
    },
};
