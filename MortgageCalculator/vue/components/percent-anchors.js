export default {
    data() {
        return {
            percentList: [
                { id: 1, value: 10 },
                { id: 2, value: 15 },
                { id: 3, value: 20 },
                { id: 4, value: 25 },
                { id: 5, value: 30 },
                { id: 6, value: 35 },
            ],
        };
    },

    methods: {
        init() {
            const radioList = this.$el.querySelectorAll('input[type="radio"]');

            for (let i = 0; i < radioList.length; i++) {
                if (radioList[i].getAttribute('value') === String(this.percentAnchor)) {
                    radioList[i].parentNode.click();
                    return;
                }
            }

            this.setValue(null);
            radioList[0].parentNode.click();
        },

        setValue(value) {
            this.$store.dispatch('setPercentAnchor', value);
        },

        change(event) {
            const value = event.target.getAttribute('value');

            if (value === 'null')  this.setValue(null);

            else this.setValue(Number(value));

            this.$root.refreshFields([
                { elementId: 'init-fee', value: this.initFeeSeparated },
            ]);
        },
    },


    computed: {
        initFeeSeparated() {
            return this.$store.getters.getInitFeeSeparated;
        },

        percentAnchor() {
            return this.$store.getters.getPercentAnchor;
        },
    },


    mounted() {
        this.init();
    },


    template: `
        <div class="btn-toolbar d-flex flex-wrap justify-content-center" role="toolbar" data-toggle="buttons">
            <div class="btn-group btn-group-toggle m-1">
                <label class="btn btn-info">
                    <input type="radio" name="options" autocomplete="off" value="null" @change="change">
                    {{ percentAnchor !== null ? 'Отключить' : 'Отключено' }}
                </label>
            </div>

            <div class="btn-group btn-group-toggle m-1">
                <label class="btn btn-info" v-for="item in percentList" v-if="item.id < 3" :key="item.id">
                    <input type="radio" name="options" autocomplete="off" :value="item.value" @change="change">
                    {{ item.value }}%
                </label>
            </div>

            <div class="btn-group btn-group-toggle m-1">
                <label class="btn btn-info" v-for="item in percentList" v-if="item.id > 2 && item.id < 5" :key="item.id">
                    <input type="radio" name="options" autocomplete="off" :value="item.value" @change="change">
                    {{ item.value }}%
                </label>
            </div>

            <div class="btn-group btn-group-toggle m-1">
                <label class="btn btn-info" v-for="item in percentList" v-if="item.id > 4 && item.id < 7" :key="item.id">
                    <input type="radio" name="options" autocomplete="off" :value="item.value" @change="change">
                    {{ item.value }}%
                </label>
            </div>
        </div>
    `,
};
