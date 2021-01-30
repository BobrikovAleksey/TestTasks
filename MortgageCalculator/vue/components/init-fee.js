import inputNumber from './libraries/input-number.js';


// noinspection JSUnusedGlobalSymbols
export default {
    data() {
        return {
            field: null,
        };
    },

    methods: {
        ...inputNumber,

        setValue(value) {
            this.$store.dispatch('setInitFee', value);
        },

        input() {
            const position = this.getPosition();

            this.setValue(Number(this.field.value.replaceAll(' ', '')));
            this.field.value = this.initFeeSeparated;
            this.setPosition(position);

            this.$root.refreshFields([
                { elementId: 'price', value: this.priceSeparated },
            ]);
        },
    },


    computed: {
        initFee() {
            return this.$store.getters.getInitFee;
        },

        initFeeSeparated() {
            return this.$store.getters.getInitFeeSeparated;
        },

        priceSeparated() {
            return this.$store.getters.getPriceSeparated;
        },

        shareOwnFunds() {
            return this.$store.getters.getShareOwnFunds;
        },
    },


    mounted() {
        this.field = this.$el.querySelector('.form-control');
        this.field.value = this.initFeeSeparated;
    },


    template: `
        <div class="input-group">
            <div class="col mb-3">
                <label for="init-fee">Первоначальный взнос</label>

                <div class="input-group">
                    <input class="form-control" type="text" maxlength="13" id="init-fee" v-restrict.number
                           @keydown="keyDown" @input="input" placeholder="Введите натуральное число">

                    <div class="input-group-append">
                        <span class="input-group-text">₽</span>
                        <span class="input-group-text" v-if="shareOwnFunds > 0">
                            {{ shareOwnFunds <= 100 ? shareOwnFunds.toFixed(1) : '> 100' }}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `,
};
