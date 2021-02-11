export default {
    methods: {
        ...Vuex.mapActions({
            setTimePoint: 'setTimePoint',
        }),

        handleChange: function () {
            const value = Number(this.input.value);

            this.setTimePoint({ name: 'timetableB', value });
        },
    },

    computed: {
        ...Vuex.mapGetters({
            direction: 'getDirectionsValue',
            minTime: 'getMinTime',
            list: 'getTimetableBList',
            title: 'getTimetableBTitle',
            minValue: 'getTimetableAValue',
            travelTime: 'getTravelTime',
        }),

        isShow: function () {
            return [2, 3].includes(this.direction);
        },
    },

    mounted() {
        this.input = this.$el.querySelector('.custom-select');
        this.handleChange();
    },

    updated() {
        this.handleChange();
    },

    template: `
        <div class="input-group mb-3" v-show="isShow">
            <div class="input-group-prepend">
                <label class="input-group-text">Расписание</label>
            </div>

            <select class="custom-select" @change="handleChange">
                <option v-for="el in list" :key="el.id" :value="el.value"
                        v-if="direction !== 3 && el.value > minTime || el.value > (minValue + travelTime)">
                    {{ el.valueAsString }} ({{ title }})
                </option>
            </select>
        </div>
    `,
};
