import {
    declOfNum,
    getDateOptions as dateOptions,
    minutesToString,
} from '../libs.js';

// noinspection JSUnresolvedFunction,JSUnresolvedVariable,JSUnusedGlobalSymbols
export default {
    data: () => ({
        quantity: 0,
    }),

    methods: {
        ...Vuex.mapActions({
            setMessage: 'setMessage',
            setQuantityTickets: 'setQuantityTickets',
        }),

        calculate() {
            const quantity = this.quantityTickets;

            if (quantity < 1) {
                this.setMessage('Вы не указали сколько билетов хотели бы приобрести');
                return;
            }

            if ([1, 3].includes(this.currentDirectionIndex) && !this.ticketStraight) {
                this.setMessage('Вы не указали время отправления в прямом направлении');
                return;
            }

            if ([2, 3].includes(this.currentDirectionIndex) && !this.ticketBack) {
                this.setMessage('Вы не указали время отправления в обратном направлении');
                return;
            }

            const full = minutesToString(this.fullTime);
            const road = minutesToString(this.roadTime);
            const messages = [
                `Вы выбрали ${quantity} ${declOfNum(quantity)} по направлению ${this.currentDirection.title}
                 стоимостью ${this.cost} руб.`,
                `Это путешествие займет у Вас ${full} (в пути  ${road})`,
            ];

            if ([1, 3].includes(this.currentDirectionIndex)) {
                let dateArrival = new Date(this.ticketStraight.value);
                dateArrival.setMinutes(dateArrival.getMinutes() + this.travelTime.straight);
                dateArrival = dateArrival.toLocaleString('ru', dateOptions);
                messages.push(`Туда теплоход отправляется ${this.ticketStraight.asString}, а прибудет ${dateArrival}`);
            }

            if ([2, 3].includes(this.currentDirectionIndex)) {
                let dateArrival = new Date(this.ticketBack.value);
                dateArrival.setMinutes(dateArrival.getMinutes() + this.travelTime.back);
                dateArrival = dateArrival.toLocaleString('ru', dateOptions);
                messages.push(`Обратно теплоход отправляется в ${this.ticketBack.asString}, а прибудет ${dateArrival}`);
            }

            this.setMessage(messages);
        },

        changeQuantity(step) {
            this.quantity = Number(this.quantity) + step;
            if (this.quantity < 0) this.quantity = 0;
            this.setQuantityTickets(Number(this.quantity));
        },

        handleInput() {
            this.setQuantityTickets(Number(this.quantity));
        },

        handleKeyDown(event) {
            if (event.key.length === 1 && !(/[0-9]/.test(event.key))) event.preventDefault();
        },
    },

    computed: {
        ...Vuex.mapGetters({
            cost: 'getCostTickets',
            currentDirection: 'getCurrentDirection',
            currentDirectionIndex: 'getCurrentDirectionIndex',
            quantityTickets: 'getQuantityTickets',
            roadTime: 'getTravelTimeRoad',
            fullTime: 'getTravelTimeFull',
            ticketBack: 'getTicketBack',
            ticketStraight: 'getTicketStraight',
            travelTime: 'getTravelTime',
        }),
    },

    mounted() {
        this.input = this.$el.querySelector('.form-control');
        this.quantity = this.quantityTickets;
    },

    template: `
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <div class="input-group-text" id="btnGroupAddon">Количество билетов</div>
                <button class="btn btn-outline-secondary" type="button" @click="changeQuantity(-1)">
                    <i class="fa fa-minus"></i>
                </button>
            </div>

            <input type="text" class="form-control" placeholder="Введите количество билетов" v-model="quantity"
                   @keydown="handleKeyDown" @input="handleInput" />

            <div class="input-group-append" id="button-addon4">
                <button class="btn btn-outline-secondary" type="button" @click="changeQuantity(1)">
                    <i class="fa fa-plus"></i>
                </button>
                <button class="btn btn-outline-secondary" type="button" @click="calculate">Посчитать</button>
            </div>
        </div>
    `,
};
