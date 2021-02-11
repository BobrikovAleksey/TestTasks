export default {
    methods: {
        ...Vuex.mapActions({
            setDirection: 'setDirection',
        }),

        handleChange: function (event) {
            this.setDirection(Number(event.target.value));
        },
    },

    computed: {
        ...Vuex.mapGetters({
            list: 'getDirectionsList',
            value: 'getDirectionsValue',
        }),
    },

    template: `
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text">Направление</label>
            </div>

            <select class="custom-select" @change="handleChange">
                <option v-for="el in list" :key="el.id" :value="el.value">{{ el.title }}</option>
            </select>
        </div>
    `,
};
