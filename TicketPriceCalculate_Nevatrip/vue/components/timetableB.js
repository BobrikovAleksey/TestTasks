// noinspection JSUnresolvedFunction,JSUnresolvedVariable,JSUnusedGlobalSymbols
export default {
    methods: {
        ...Vuex.mapActions({
            changeTicketBackIndex: 'setTicketBackIndex',
        }),

        changeDatetime() {
            this.changeTicketBackIndex(Number(this.input.value));
        },

        undo() {
            this.changeTicketBackIndex(-1);
        },
    },

    computed: {
        ...Vuex.mapGetters({
            currentDirectionIndex: 'getCurrentDirectionIndex',
            ticketIndex: 'getTicketBackIndex',
            timetable: 'getTimetableBack',
            minDate: 'getMinBackDate',
        }),

        isShow: function () {
            return [2, 3].includes(this.currentDirectionIndex);
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
                <label class="input-group-text">Расписание обратно</label>
            </div>

            <select class="custom-select" @change="changeDatetime" :value="ticketIndex">
                <option selected disabled hidden value="-1">Выберите дату и время поездки</option>
                <option v-for="(el, index) in timetable" :key="index" :value="index"
                        v-if="currentDirectionIndex !== 3 || !minDate || el.value > minDate">
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
