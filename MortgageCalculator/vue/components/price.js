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
            this.$store.dispatch('setPrice', value);
        },

        input() {
            const position = this.getPosition();

            this.setValue(Number(this.field.value.replaceAll(' ', '')));
            this.field.value = this.priceSeparated;
            this.setPosition(position);

            this.$root.refreshFields([
                { elementId: 'init-fee', value: this.initFeeSeparated },
            ]);
        },
    },


    computed: {
        initFeeSeparated() {
            return this.$store.getters.getInitFeeSeparated;
        },

        price() {
            return this.$store.getters.getPrice;
        },

        priceSeparated() {
            return this.$store.getters.getPriceSeparated;
        },
    },


    mounted() {
        this.field = this.$el.querySelector('.form-control');
        this.field.value = this.priceSeparated;
    },


    template: `
        <div class="input-group">
            <div class="col mb-3">
                <label for="price">Стоимость недвижимости</label>

                <div class="input-group">
                    <input class="form-control" type="text" maxlength="13" id="price" v-restrict.number
                           @keydown="keyDown" @input="input" placeholder="Введите натуральное число">

                    <div class="input-group-append">
                        <span class="input-group-text">₽</span>
                    </div>
                </div>
            </div>
        </div>
    `,
};
