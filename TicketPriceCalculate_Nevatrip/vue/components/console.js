import { getCurrentDatetime } from '../libs.js';

// noinspection JSUnresolvedFunction,JSUnresolvedVariable
export default {
    data: () => ({
        date: null,
        timerID: null,
    }),

    methods: {
        /**
         * Обновляет текущую дату в время
         */
        updateCurrentDatetime: function() {
            this.date = getCurrentDatetime();
        },
    },

    computed: {
        ...Vuex.mapGetters({
            message: 'getMessage',
        }),
    },

    created() {
        this.updateCurrentDatetime();
        this.timerID = setInterval(this.updateCurrentDatetime, 1000);
    },

    destroy() {
        clearInterval(this.timerID);
        this.timerID = null;
    },

    template: `
        <div class="card bg-light mb-3">
            <div class="card-header">Результат</div>

            <div class="card-body">
                <p v-for="str in message">{{ str }}</p>
            </div>

            <div class="card-footer text-right">{{ date }}</div>
        </div>
    `,
};
