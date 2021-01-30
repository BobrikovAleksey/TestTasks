// directives
import verifier from './directives/verifier.js';

// components
// import card from './components/card.js';
// import controlPanel from './components/control-panel.js';
// import initFee from './components/init-fee.js';
// import interestRate from './components/interest-rate.js';
// import loanTerm from './components/loan-term.js';
// import percentAnchors from './components/percent-anchors.js';
// import price from './components/price.js';

// storage
import Store from './store/index.js';


Vue.directive('restrict', verifier);

// Vue.component('Card', card);
// Vue.component('ControlPanel', controlPanel);
// Vue.component('InitFee', initFee);
// Vue.component('InterestRate', interestRate);
// Vue.component('LoanTerm', loanTerm);
// Vue.component('PercentAnchors', percentAnchors);
// Vue.component('Price', price);

Vue.use(Vuex);

const store = new Vuex.Store(Store);

const app = new Vue({
    el: '#app',
    store,

    methods: {
        loadData() {
            // this.$store.dispatch('loadData');
        },

        /**
         * Обновляет переданные поля
         * @param list array { elementId, value }
         */
        refreshFields(list) {
            list.forEach((item) => {
                const el = this.$el.querySelector(`#${item.elementId}`);

                if (el) {
                    el.value = item.value;
                }
            });
        },
    },

    computed: {
        // loanBodySeparated() {
        //     return this.$store.getters.getLoanBodySeparated;
        // },
        //
        // monthPaymentSeparated() {
        //     return this.$store.getters.getMonthPaymentSeparated;
        // },
        //
        // overpaymentSeparated() {
        //     return this.$store.getters.getOverpaymentSeparated;
        // },
        //
        // requiredIncomeSeparated() {
        //     return this.$store.getters.getRequiredIncomeSeparated;
        // },
    },

    created() {
        this.loadData();
    },
});
