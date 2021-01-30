// noinspection JSUnusedGlobalSymbols
export default {
    methods: {
        setValue(value) {
            this.$store.dispatch('setLoanTermYear', value);
        },

        change(event) {
            const value = Number(event.target.value);

            this.setValue(value);
            if (this.loanTermAtYears !== value) {
                event.target.value = this.loanTermAtYears;
            }
        },
    },


    computed: {
        loanTermAtMonths() {
            return this.$store.getters.getLoanTermAtMonths;
        },

        loanTermRange() {
            return this.$store.getters.getLoanTermRange;
        },

        loanTermAtYears() {
            return this.$store.getters.getLoanTermAtYears;
        },
    },


    mounted() {
        this.$el.querySelector('.custom-select').value = this.loanTermAtYears;
    },


    template: `
        <div class="input-group mt-2">
            <div class="col mb-3">
                <label class="my-1 mr-2" for="loan-term">Срок кредита</label>

                <div class="input-group">
                    <select class="custom-select" id="loan-term" @change="change">
                        <option v-for="n in (loanTermRange.max - (loanTermRange.min - 1))" :key="n">
                            {{ n + (loanTermRange.min - 1) }}
                        </option>
                    </select>

                    <div class="input-group-append">
                        <span class="input-group-text">лет</span>
                    </div>
                </div>
            </div>
        </div>
    `,
};
