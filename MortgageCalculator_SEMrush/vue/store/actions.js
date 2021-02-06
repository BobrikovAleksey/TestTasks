import MT from './mutation-types.js';


// noinspection JSUnusedGlobalSymbols
const actions = {
    setInitFee({ commit, state }, value) {
        if (typeof value !== 'number') {
            commit(MT.SET_INIT_FEE, 0);
            return;
        }

        commit(MT.SET_INIT_FEE, Math.floor(value));

        if (state.percentAnchor !== null) {
            const price = state.initFee * 100 / state.percentAnchor;
            commit(MT.SET_PRICE, isFinite(price) && price > 0 ? Math.round(price) : 0);
        }
    },

    setInterestRate({ commit, state }, value) {
        if (typeof value !== 'number') {
            commit(MT.SET_INTEREST_RATE, 0);
            return;
        }

        commit(MT.SET_INTEREST_RATE, (Math.round(value * 100) % 10000) / 100);
    },

    setLoanTermMonth({ commit, state }, value) {
        if (typeof value !== 'number') {
            commit(MT.SET_LOAN_TERM_FROM_MONTH, state.loanTerm.default * 12);
            return;
        }

        commit(MT.SET_LOAN_TERM_FROM_MONTH, Math.round(value));
    },

    setLoanTermYear({ commit, state }, value) {
        if (typeof value !== 'number') {
            commit(MT.SET_LOAN_TERM_FROM_YEAR, state.loanTerm.default);
            return;
        }

        commit(MT.SET_LOAN_TERM_FROM_YEAR, Math.floor(value));
    },

    setPercentAnchor({ commit, state }, value) {
        if (value !== null && typeof value !== 'number') {
            return;
        }

        if (value !== null && value > 0) {
            commit(MT.SET_INIT_FEE, Math.round(state.price * value / 100));
            commit(MT.SET_PERCENT_ANCHOR, value);
            return;
        }

        commit(MT.SET_PERCENT_ANCHOR, null);
    },

    setPrice({ commit, state }, value) {
        if (typeof value !== 'number') {
            commit(MT.SET_PRICE, 0);
            return;
        }

        commit(MT.SET_PRICE, Math.floor(value));

        if (state.percentAnchor !== null) {
            const initFee = state.price * state.percentAnchor / 100;
            commit(MT.SET_INIT_FEE, initFee > 0 ? Math.round(initFee) : 0);
        }
    },

    /**
     *  Выгружает сохраненные данные или устанавливает значения по умолчанию
     */
    loadData({ commit }) {
        let price = localStorage.getItem('price');
        let initFee = localStorage.getItem('initFee');
        let percentAnchor = localStorage.getItem('percentAnchor');
        let loanTerm = localStorage.getItem('loanTerm');
        let interestRate = localStorage.getItem('interestRate');

        price = price !== null ? Number(price) : 20000000;
        initFee = initFee !== null ? Number(initFee) : 3000000;
        if (percentAnchor !== null) {
            percentAnchor !== 'null' ? Number(percentAnchor) : null;
        } else {
            percentAnchor = 15;
        }
        loanTerm = loanTerm !== null ? Number(loanTerm) : 10;
        interestRate = interestRate !== null ? Number(interestRate) : 10;

        commit(MT.SET_PRICE, price);
        commit(MT.SET_INIT_FEE, initFee);
        commit(MT.SET_PERCENT_ANCHOR, percentAnchor);
        commit(MT.SET_LOAN_TERM_FROM_YEAR, loanTerm);
        commit(MT.SET_INTEREST_RATE, interestRate);
    },
};

export default actions;
