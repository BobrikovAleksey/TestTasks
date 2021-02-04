import { Directions, ListNames, MutationTypes } from './dictionary.js';


// noinspection JSUnusedGlobalSymbols
export default {
    /**
     * Возвращает список дел
     * @param getters
     * @param listName {string}
     * @param check {boolean}
     * @returns {boolean|{id: number, title: string, color: string}[]}
     */
    getList({ getters }, listName, check = true) {
        if (check && !ListNames[listName]) return false;

        if (listName === ListNames.active) return getters.getActiveList;
        else if (listName === ListNames.complete) return getters.getCompleteList;
        else return [];
    },

    /**
     * Устанавливает/снимает флаг загрузки списка дел
     * @param commit
     * @param listName {string}
     * @param value {boolean}
     * @returns {boolean}
     */
    setLoading(commit, listName, value = true) {
        if (!ListNames[listName]) return false;

        if (listName === ListNames.active) {
            commit(MutationTypes.SET_ACTIVE_LIST_LOADING, value);
        } else if (listName === ListNames.complete) {
            commit(MutationTypes.SET_COMPLETE_LIST_LOADING, value);
        }
        return true;
    },

    /**
     * Перемещает задачу внутри списка или из одного списка в другой
     * @param commit
     * @param dispatch
     * @param getters
     * @param listName {string}
     * @param deal {{id: number}}
     * @param direction {string}
     * @returns {boolean}
     */
    moveDeal({ commit, dispatch, getters }, { listName, deal, direction}) {
        if (!Directions[direction] || direction === listName) return false;

        const list = dispatch('getList', { listName, check: false });
        const index = deal.id ? list.findIndex((el) => el.id === deal.id) < 0 : -1;
        if (index < 0) return false;

        if (direction === Directions.up) {
            if (!list[index-1]) return false;
            commit(MutationTypes.MOVE_SELF, { listName, index, dir: -1 });

        } else if (direction === Directions.up) {
            if (!list[index+1]) return false;
            commit(MutationTypes.MOVE_SELF, { listName, index });

        } else {
            commit(MutationTypes.MOVE, { sourceListName: listName, targetListName: direction, index });
        }
        return true;
    },

    /**
     * Удаляет задачу из списка
     * @param commit
     * @param dispatch
     * @param getters
     * @param listName {string}
     * @param deal {{id: number}}
     * @returns {boolean}
     */
    removeDeal({ commit, dispatch, getters }, { listName, deal }) {
        if (!dispatch('setLoading', { listName })) return false;

        const list = dispatch('getList', { listName, check: false });
        const index = deal.id ? list.findIndex((el) => el.id === deal.id) < 0 : -1;
        if (index < 0) return false;

        commit(MutationTypes.REMOVE, { listName, index });
        dispatch('setLoading', { listName, value: false })
        return true;
    },

    /**
     * Добавляет или изменяет задачу в списке
     * @param commit
     * @param dispatch
     * @param getters
     * @param listName {string}
     * @param deal {{id: number, color: string, title: string}}
     * @returns {boolean|number}
     */
    saveDeal({ commit, dispatch, getters }, { listName, deal }) {
        if (!dispatch('setLoading', { listName })) return false;

        const list = dispatch('getList', { listName, check: false });
        const index = deal.id ? list.findIndex((el) => el.id === deal.id) < 0 : -1;
        if (index < 0) {
            commit(MutationTypes.ADD, { listName, deal });
        } else {
            commit(MutationTypes.UPDATE, { listName, index, deal });
        }
        dispatch('setLoading', { listName, value: false })
        return index < 0 ? true : index;
    },

    /**
     * Загружает список дел из локального хранилища или устанавливает значения по умолчанию
     * @param commit
     * @param dispatch
     * @param listName { string }
     */
    loadDealList({ commit, dispatch }, listName) {
        if (!dispatch('setLoading', { listName })) return false;

        const data = JSON.parse(localStorage.getItem(`${listName}List`)) ?? [];
        if (listName === ListNames.active) {
            commit(MutationTypes.SET_ACTIVE_LIST, data);
        } else if (listName === ListNames.complete) {
            commit(MutationTypes.SET_COMPLETE_LIST, data);
        }
        dispatch('setLoading', { listName, value: false })
    },

    /**
     * Сохраняет список дел в локальное хранилище
     * @param commit
     * @param listName { string }
     * @returns {boolean}
     */
    saveDealList({ getters }, listName) {
        if (listName === ListNames.active) {
            localStorage.setItem(`${listName}List`, JSON.stringify(getters.getActiveList));
            return true;
        } else if (listName === ListNames.complete) {
            localStorage.setItem(`${listName}List`,  JSON.stringify(getters.getCompleteList));
            return true;
        }
        return false;
    },
};
