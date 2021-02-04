// noinspection JSUnusedGlobalSymbols
export default {
    methods: {
        ...Vuex.mapActions({

        }),

        /**
         * Очистка формы и временного хранилища
         */
        clear() {
            // this.setPercentAnchor(null);
            // this.refPercentAnchors.init();
            //
            // this.setPrice(0);
            // this.fieldPprice.value = '';
            //
            // this.setInitFee(0);
            // this.fieldInitFee.value = '';
            //
            // this.setLoanTerm(this.loanTermDefault);
            // this.selectLoanTerm.value = this.loanTermDefault;
            //
            // this.setInterestRate(0);
            // this.fieldInterestRate.value = '';
            //
            // localStorage.clear();
        },

        /**
         * Сохраняет данные формы во временное хранилище
         */
        saveData() {
            // localStorage.setItem('price', this.price.toString());
            // localStorage.setItem('initFee', this.initFee.toString());
            // localStorage.setItem('percentAnchor', this.percentAnchor);
            // localStorage.setItem('loanTerm', this.loanTermAtYears.toString());
            // localStorage.setItem('interestRate', this.interestRate.toString());
        },
    },


    computed: {
        ...Vuex.mapGetters({
            // initFee: 'getInitFee',
            // interestRate: 'getInterestRate',
            // loanTermDefault: 'getLoanTermDefault',
            // loanTermAtYears: 'getLoanTermAtYears',
            // percentAnchor: 'getPercentAnchor',
            // price: 'getPrice',
        }),
    },


    mounted() {
        // const refs = this.$root.$refs;
        // this.refPercentAnchors = refs.percentAnchors;
        // this.fieldPprice = refs.price.field;
        // this.fieldInitFee = refs.initFee.field;
        // this.selectLoanTerm = refs.loanTerm.select;
        // this.fieldInterestRate = refs.interestRate.field;
    },


    template: `
        <div class="row d-flex justify-content-center mb-4">
            <button type="button" class="btn btn-success col-4 m-2" @click="saveData">Сохранить</button>

            <button type="button" class="btn btn-info col-4 m-2" @click="clear">Очистить</button>
        </div>
    `,
};
