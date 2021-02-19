// noinspection JSUnresolvedFunction,JSUnresolvedVariable
export default {
    methods: {
        ...Vuex.mapActions({
            changeDirectionId: 'setDirectionId',
        }),

        handleChange(event) {
            this.changeDirectionId(Number(event.target.value));
        },
    },

    computed: {
        ...Vuex.mapGetters({
            currentDirectionIndex: 'getCurrentDirectionIndex',
            directions: 'getDirectionList',
        }),
    },

    template: `
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text">Направление</label>
            </div>

            <select class="custom-select" @change="handleChange" :value="currentDirectionIndex">
                <option v-for="dir in directions" :key="dir.id" :value="dir.id">{{ dir.title }}</option>
            </select>
        </div>
    `,
};
