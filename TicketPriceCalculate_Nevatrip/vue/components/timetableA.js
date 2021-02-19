// noinspection JSUnresolvedFunction,JSUnresolvedVariable,JSUnusedGlobalSymbols
export default {
    methods: {
        ...Vuex.mapActions({
            changeTicketStraightIndex: 'setTicketStraightIndex',
        }),

        changeDatetime() {
            this.changeTicketStraightIndex(Number(this.input.value));
        },

        undo() {
            this.changeTicketStraightIndex(-1);
        },
    },

    computed: {
        ...Vuex.mapGetters({
            currentDirectionIndex: 'getCurrentDirectionIndex',
            ticketIndex: 'getTicketStraightIndex',
            timetable: 'getTimetableStraight',
            maxDate: 'getMaxStraightDate',
        }),

        isShow: function () {
            return [1, 3].includes(this.currentDirectionIndex);
        },
    },

    mounted() {
        this.input = this.$el.querySelector('.custom-select');
        this.undo();
    },

    updated() {
        this.changeDatetime();
    },

    template: `
        <div class="input-group mb-3" v-show="isShow">
            <div class="input-group-prepend">
                <label class="input-group-text">Расписание туда</label>
            </div>

            <select class="custom-select" @change="changeDatetime" :value="ticketIndex">
                <option selected disabled hidden value="-1">Выберите дату и время поездки</option>
                <option v-for="(el, index) in timetable" :key="index" :value="index"
                        v-if="currentDirectionIndex !== 3 || !maxDate || el.value < maxDate">
                    {{ el.asString }}
                </option>
            </select>

            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" @click="undo">
                    <i class="fa fa-undo"></i>
                </button>
            </div>
        </div>
    `,
};
