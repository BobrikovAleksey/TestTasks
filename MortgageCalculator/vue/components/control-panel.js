// noinspection JSUnusedGlobalSymbols
export default {
    methods: {
        setInitFee(value) {
            this.$store.dispatch('setInitFee', value);
        },

        setInterestRate(value) {
            this.$store.dispatch('setInterestRate', value);
        },

        setLoanTerm(value) {
            this.$store.dispatch('setLoanTermYear', value);
        },

        setPercentAnchor(value) {
            this.$store.dispatch('setPercentAnchor', value);
        },

        setPrice(value) {
            this.$store.dispatch('setPrice', value);
        },

        /**
         * Очистка формы и временного хранилища
         */
        clear() {
            this.setPercentAnchor(null);
            this.$root.$refs.percentAnchors.init();

            this.setPrice(0);
            this.$root.$refs.price.getInput().value = '';

            this.setInitFee(0);
            this.$root.$refs.initFee.getInput().value = '';

            this.setLoanTerm(this.loanTermDefault);
            this.$root.$refs.loanTerm.getSelect().value = this.loanTermDefault;

            this.setInterestRate(0);
            this.$root.$refs.interestRate.getInput().value = '';

            localStorage.clear();
        },

        /**
         * Сохраняет данные формы во временное хранилище
         */
        saveData() {
            localStorage.setItem('price', this.price.toString());
            localStorage.setItem('initFee', this.initFee.toString());
            localStorage.setItem('percentAnchor', this.percentAnchor.toString());
            localStorage.setItem('loanTerm', this.loanTermAtYears.toString());
            localStorage.setItem('interestRate', this.interestRate.toString());
        },
    },


    computed: {
        initFee() {
            return this.$store.getters.getInitFee;
        },

        interestRate() {
            return this.$store.getters.getInterestRate;
        },

        loanTermDefault() {
            return this.$store.getters.getLoanTermDefault;
        },

        loanTermAtYears() {
            return this.$store.getters.getLoanTermAtYears;
        },

        percentAnchor() {
            return this.$store.getters.getPercentAnchor;
        },

        price() {
            return this.$store.getters.getPrice;
        },
    },


    template: `
        <div class="row d-flex justify-content-center mb-4">
            <button type="button" class="btn btn-success col-4 m-2" @click="saveData">Сохранить</button>

            <button type="button" class="btn btn-info col-4 m-2" @click="clear">Очистить</button>
        </div>
    `,
};
