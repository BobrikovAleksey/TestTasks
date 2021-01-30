export default {
    methods: {
        ...Vuex.mapActions({
            setValue: 'setInterestRate',
        }),

        input() {
            this.setValue(Number(this.field.value.replaceAll(',', '.')));
        },

        keyDown(event) {
            const input = event.target;
            const leftValue = input.value.slice(0, input.selectionStart);
            const rightValue = input.value.slice(input.selectionEnd, input.value.length);
            let value = input.value;

            if (/^[0-9.,]+$/.test(event.key)) {
                value = leftValue + event.key + rightValue;

            } else if ((input.selectionStart !== input.selectionEnd) && ([8, 46].includes(event.keyCode))) {
                value = leftValue + rightValue;

            } else if (input.selectionStart === input.selectionEnd) {
                if (event.keyCode === 8) { // Backspace
                    value = leftValue.slice(0, leftValue.length - 1) + rightValue;

                } else if (event.keyCode === 46) { // Delete
                    value = leftValue + rightValue.slice(1, rightValue.length);
                }
            }

            const pattern = /^([1-9]?[0-9]?[,.]{1,1}[0-9]?[1-9]?)$|^([1-9]?[0-9]?)$/

            if (!value || value && pattern.test(value)) return;

            else if (input.selectionStart === input.selectionEnd) {
                if (event.keyCode === 8) { // Backspace
                    input.selectionStart = input.selectionEnd = input.selectionStart - 1;
                    return;

                } else if (event.keyCode === 46) { // Delete
                    input.selectionStart = input.selectionEnd = input.selectionEnd + 1;
                    return;
                }
            }

            event.preventDefault();
        },
    },


    computed: {
        ...Vuex.mapGetters({
            interestRate: 'getInterestRate',
        }),
    },


    mounted() {
        this.field = this.$el.querySelector('.form-control');
        this.field.value = this.interestRate;
    },


    template: `
        <div class="input-group">
            <div class="col mb-3">
                <label for="interest-rate">Процентная ставка</label>

                <div class="input-group">
                    <input class="form-control" type="text" maxlength="51" id="interest-rate" v-restrict.number.decimal
                           @keydown="keyDown" @input="input" placeholder="Введите число от 0.01 до 99.99">

                    <div class="input-group-append">
                        <span class="input-group-text">%</span>
                    </div>
                </div>
            </div>
        </div>
    `,
};
