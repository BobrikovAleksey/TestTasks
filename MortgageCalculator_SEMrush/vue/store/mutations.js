import MT from './mutation-types.js';


// noinspection JSUnusedGlobalSymbols
const mutations = {
    /**
     * Устанавливает новое значение первоначального платежа
     * @param state
     * @param value integer
     */
    [MT.SET_INIT_FEE](state, value) {
        state.initFee = value;
    },

    /**
     * Устанавливает новое значение процентной ставки
     * @param state
     * @param percent integer
     */
    [MT.SET_INTEREST_RATE](state, percent) {
        state.interestRate.percent = percent;
        state.interestRate.yearValue = percent / 100;
        state.interestRate.monthValue = percent / 1200;
    },

    /**
     * Устанавливает новое значение срока ипотеки (в количестве месяцев)
     * @param state
     * @param months integer
     */
    [MT.SET_LOAN_TERM_FROM_MONTH](state, months) {
        state.loanTerm.years = Math.round(months * 10 / 12) / 10;
        state.loanTerm.months = months;
    },

    /**
     * Устанавливает новое значение срока ипотеки (в количестве лет)
     * @param state
     * @param years integer
     */
    [MT.SET_LOAN_TERM_FROM_YEAR](state, years) {
        state.loanTerm.years = years;
        state.loanTerm.months = Math.round(years * 12);
    },

    /**
     * Устанавливает новое значение процентного якоря
     * @param state
     * @param value integer|null
     */
    [MT.SET_PERCENT_ANCHOR](state, value) {
        state.percentAnchor = value;
    },

    /**
     * Устанавливает новое значение цены
     * @param state
     * @param value integer
     */
    [MT.SET_PRICE](state, value) {
        state.price = value;
    },
};

export default mutations;
