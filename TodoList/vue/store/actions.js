import { Directions, ListNames, MutationTypes } from './dictionary.js';


/**
 * Возвращает список дел
 * @param getters
 * @param listName {string}
 * @param check {boolean}
 * @returns {boolean|{id: number, title: string, color: string}[]}
 */
const getList = ({ getters }, { listName, check = true }) => {
    if (check && !ListNames[listName]) return false;

    if (listName === ListNames.active) return getters.getActiveList;
    else if (listName === ListNames.complete) return getters.getCompleteList;
    else return [];
};

/**
 * Устанавливает/снимает флаг загрузки списка дел
 * @param commit
 * @param listName {string}
 * @param value {boolean}
 * @returns {boolean}
 */
const setLoading = ({ commit } , { listName, value = true }) => {
    if (!ListNames[listName]) return false;

    if (listName === ListNames.active) {
        commit(MutationTypes.SET_ACTIVE_LIST_LOADING, value);
    } else if (listName === ListNames.complete) {
        commit(MutationTypes.SET_COMPLETE_LIST_LOADING, value);
    }
    return true;
};

/**
 * Сохраняет список дел в локальное хранилище
 * @param getters
 * @param listName {string}
 * @returns {boolean}
 */
const saveToLocalStorage = ({ getters }, listName) => {
    if (listName === ListNames.active) {
        localStorage.setItem(`${listName}List`, JSON.stringify(getters.getActiveList));
        return true;
    } else if (listName === ListNames.complete) {
        localStorage.setItem(`${listName}List`, JSON.stringify(getters.getCompleteList));
        return true;
    }
    return false;
};


// noinspection JSUnusedGlobalSymbols
export default {
    /**
     * Перемещает задачу внутри списка или из одного списка в другой
     * @param commit
     * @param getters
     * @param listName {string}
     * @param deal {{id: number}}
     * @param direction {string}
     * @returns {boolean}
     */
    moveDeal({ commit, getters }, { listName, deal, direction}) {
        if (!Directions[direction] || direction === listName) return false;

        const list = getList({ getters }, { listName, check: false });
        if (!list) return false;

        const index = deal.id ? list.findIndex((el) => el.id === deal.id) : -1;
        if (index < 0) return false;

        if (direction === Directions.up) {
            if (!list[index-1]) return false;
            commit(MutationTypes.MOVE_SELF, { listName, index, dir: -1 });
            saveToLocalStorage({ getters }, listName);

        } else if (direction === Directions.down) {
            if (!list[index+1]) return false;
            commit(MutationTypes.MOVE_SELF, { listName, index });
            saveToLocalStorage({ getters }, listName);

        } else {
            commit(MutationTypes.MOVE, { sourceListName: listName, targetListName: direction, index });
            saveToLocalStorage({ getters }, listName);
            saveToLocalStorage({ getters }, direction);
        }
        return true;
    },

    /**
     * Удаляет задачу из списка
     * @param commit
     * @param getters
     * @param listName {string}
     * @param deal {{id: number}}
     * @returns {boolean}
     */
    removeDeal({ commit, getters }, { listName, deal }) {
        if (!setLoading({ commit }, { listName })) return false;

        const list = getList({ getters }, { listName, check: false });
        const index = deal.id ? list.findIndex((el) => el.id === deal.id) : -1;
        if (index < 0) return false;

        commit(MutationTypes.REMOVE, { listName, index });
        saveToLocalStorage({ getters }, listName);
        setLoading({ commit }, { listName, value: false });
        return true;
    },

    /**
     * Добавляет или изменяет задачу в списке
     * @param commit
     * @param getters
     * @param listName {string}
     * @param deal {{id: number, color: string, title: string}}
     * @returns {boolean|number}
     */
    saveDeal({ commit, getters }, { listName, deal }) {
        if (!setLoading({ commit }, { listName })) return false;

        const list = getList({ getters }, { listName, check: false });
        const index = deal.id ? list.findIndex((el) => el.id === deal.id) : -1;

        if (index < 0) {
            commit(MutationTypes.ADD, { listName, deal: { ...deal } });
        } else {
            commit(MutationTypes.UPDATE, { listName, index, deal });
        }

        saveToLocalStorage({ getters }, listName);
        setLoading({ commit }, { listName, value: false });
        return index < 0 ? true : index;
    },

    /**
     * Загружает список дел из локального хранилища или устанавливает значения по умолчанию
     * @param commit
     * @param listName {string}
     */
    loadDealList({ commit }, listName) {
        if (!setLoading({ commit }, { listName })) return false;

        const data = JSON.parse(localStorage.getItem(`${listName}List`)) ?? [];
        if (listName === ListNames.active) {
            commit(MutationTypes.SET_ACTIVE_LIST, data);
        } else if (listName === ListNames.complete) {
            commit(MutationTypes.SET_COMPLETE_LIST, data);
        }
        setLoading({ commit }, { listName, value: false });
    },

    /**
     * Сохраняет список дел в локальное хранилище
     * @param getters
     * @param listName {string}
     * @returns {boolean}
     */
    saveDealList({ getters }, listName) {
        return saveToLocalStorage({ getters }, listName);
    },
};
