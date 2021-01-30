import './library.js';


// noinspection JSUnusedGlobalSymbols
const getters = {
    getInitFee: (state) => state.initFee,
    getInitFeeSeparated: (state) => separateDigits(state.initFee),
    getInterestRate: (state) => state.interestRate.percent,
    getLoanTermAtMonths: (state) => state.loanTerm.months,
    getLoanTermAtYears: (state) => state.loanTerm.years,
    getLoanTermDefault: (state) => state.loanTerm.default,
    getLoanTermRange: (state) => state.loanTerm.range,
    getPercentAnchor: (state) => state.percentAnchor,
    getPrice: (state) => state.price,
    getPriceSeparated: (state) => separateDigits(state.price),

    /**
     * Возвращает долю собственных средств
     * @param state
     * @returns {number}
     */
    getShareOwnFunds: (state) => {
        const result = Math.round(state.initFee * 1000 / state.price) / 10;
        return !isNaN(result) && isFinite(result) ? result : 0;
    },

    /**
     * Возвращает тело кредита
     * C = W - A, где C - тело кредита, W - стоимость недвижимости, A - первоначальный взнос
     *
     * @returns {number}
     */
    getLoanBody: (state) => {
        const result = state.price - state.initFee;
        return result > 0 ? result : 0;
    },
    getLoanBodySeparated: (state, getters) => separateDigits(getters.getLoanBody),

    /**
     * Возвращает ежемесячный платеж
     * P = C * (I / 1200 + (I / 1200) / ((1 + I / 1200) ^ n - 1)), где P - ежемесячный платеж, C - тело кредита,
     * I - процентная ставка, n - срок кредитования (в месяцах)
     *
     * @returns {number}
     */
    getMonthPayment: (state, getters) => {
        const monthRate = state.interestRate.monthValue;
        const coefficient = (monthRate + monthRate / (Math.pow(1 + monthRate, state.loanTerm.months) - 1));
        const result = getters.getLoanBody * coefficient;
        return !isNaN(result) && isFinite(result) ? result : 0;
    },
    getMonthPaymentSeparated: (state, getters) => separateDigits(getters.getMonthPayment),

    /**
     * Возвращает переплату по кредиту
     * L = P * n - W + A, где L - переплата, P - ежемесячный платеж, n - срок кредитования (в месяцах),
     * W - стоимость недвижимости, A - первоначальный взнос
     *
     * @returns {number}
     */
    getOverpayment: (state, getters) => {
        const result = getters.getMonthPayment * state.loanTerm.months - getters.getLoanBody;
        return isNaN(result) || result < 0 ? 0 : result;
    },
    getOverpaymentSeparated: (state, getters) => separateDigits(getters.getOverpayment),

    /**
     * Возвращает необходимый доход
     * I = 5 * P / 3, где I - необходимый доход, P - ежемесячный платеж
     *
     * @returns {number}
     */
    getRequiredIncome: (state, getters) => 5 * getters.getMonthPayment / 3,
    getRequiredIncomeSeparated: (state, getters) => separateDigits(getters.getRequiredIncome),
};

export default getters;
