// components
import direction from './components/direction.js';
import timetableA from './components/timetableA.js';
import timetableB from './components/timetableB.js';

// storage
import Store from './store/index.js';


Vue.component('v-direction', direction);
Vue.component('v-timetable-a', timetableA);
Vue.component('v-timetable-b', timetableB);

Vue.use(Vuex);


const store = new Vuex.Store(Store);

/**
 * Преобразует время в минутах в формат 'hh:mm'
 * @param value {number}
 * @returns {string}
 */
const minutesToString = function(value) {
    let hours = Math.floor(value / 60);
    hours = String(hours < 24 ? hours : hours - 24);
    const minutes = String(value % 60);
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
};

/**
 * Возвращает переданную строку с первым заглавным символом
 * @param str {string}
 * @returns {string}
 */
const upperFirst = function(str) {
    return str[0].toUpperCase() + str.slice(1 - str.length);
};


const app = new Vue({
    el: '#app',
    store,

    data: {
        quantity: 1,
        date: null,
        timerID: null,
    },

    methods: {
        ...Vuex.mapActions({
            setMessage: 'setMessage',
            setMinTime: 'setMinTime',
            setTicketQuantity: 'setTicketQuantity',
        }),

        /**
         * Возвращает одну из трех форм слова, в зависимости от числа
         * @param number {number}
         * @param textForms {string[]}
         * @returns {string|string}
         */
        declOfNum: function (number, textForms = ['билет', 'билета', 'билетов']) {
            number = Math.floor(Math.abs(number)) % 100;
            if (number > 10 && number < 20) return textForms[2];
            number %= 10;
            if (number > 1 && number < 5) return textForms[1];
            if (number === 1) return textForms[0];
            return textForms[2];
        },

        /**
         * Возвращает число в виде строки с заполнением до требуемой длины указанным символом
         * @param value {number|string}
         * @param length {number}
         * @param fillSymbol {string}
         * @returns {string}
         */
        numberToStr: function(value, length = 2, fillSymbol = '0') {
            return String(value).padStart(length, fillSymbol);
        },

        /**
         * Возвращает текущую дату и время в виде строки 'dd.MM.yyyy h:mm:ss'
         * @returns {string}
         */
        getCurrentDate: function() {
            const date = new Date;
            const seconds = this.numberToStr(date.getSeconds());
            const minutes = this.numberToStr(date.getMinutes());
            const hours = date.getHours();
            const day = this.numberToStr(date.getDay());
            const month = this.numberToStr(date.getMonth());
            const year = date.getFullYear();

            return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
        },

        getCurrentTime: function() {
            const date = new Date();
            this.date = this.getCurrentDate();
            this.setMinTime(date.getHours() * 60 + date.getMinutes());
        },

        handleKeyDownQuantityTickets: function(event) {
            if (['-', '+', '.', ',', 'e'].includes(event.key)) event.preventDefault();
        },

        handleChangeQuantityTickets: function() {
            const quantity = Number(this.quantity);
            if (isNaN(quantity) || quantity < 0) this.quantity = '';

            this.setTicketQuantity(Number(this.quantity));
        },

        handleCalculate: function() {
            if (this.ticketQuantity < 1) {
                this.setMessage(['Вы не указали сколько билетов хотели бы приобрести']);
                return;
            }

            const cost = this.ticketQuantity * this.price;

            const messages = [
                `Вы выбрали ${this.ticketQuantity} ${this.declOfNum(this.ticketQuantity)} по маршруту 
                 ${this.directionsList[this.directionsValue].title} стоимостью ${cost} руб.`,
                `Это путешествие займет у Вас
                 ${this.travelTime.full < 60 ? this.travelTime.full + ' мин.' : minutesToString(this.travelTime.full)}
                 (в пути ${this.travelTime.road < 60 ? this.travelTime.road + 'мин.' : minutesToString(this.travelTime.road)})`,
            ];

            if ([3].includes(this.directionsValue)) {
                messages.push(`${upperFirst(this.titleA)} теплоход отправляется в ${minutesToString(this.valueA)},
                    а прибудет в ${minutesToString(this.valueA + this.getTravelTime)}`);
                messages.push(`${upperFirst(this.titleB)} теплоход отправляется в ${minutesToString(this.valueB)},
                    а прибудет в ${minutesToString(this.valueB + this.getTravelTime)}`);
            } else if ([2].includes(this.directionsValue)) {
                messages.push(`${upperFirst(this.titleB)} теплоход отправляется в ${minutesToString(this.valueB)},
                    а прибудет в ${minutesToString(this.valueB + this.getTravelTime)}`);
            } else if ([1].includes(this.directionsValue)) {
                messages.push(`${upperFirst(this.titleA)} теплоход отправляется в ${minutesToString(this.valueA)},
                    а прибудет в ${minutesToString(this.valueA + this.getTravelTime)}`);
            }

            this.setMessage(messages);
        },
    },

    computed: {
        ...Vuex.mapGetters({
            directionsList: 'getDirectionsList',
            directionsValue: 'getDirectionsValue',
            getTravelTime: 'getTravelTime',
            message: 'getMessage',
            prices: 'getPrices',
            ticketQuantity: 'getTicketQuantity',
            titleA: 'getTimetableATitle',
            titleB: 'getTimetableBTitle',
            valueA: 'getTimetableAValue',
            valueB: 'getTimetableBValue',
        }),

        price: function() {
            if ([3].includes(this.directionsValue)) return this.prices.two;
            return this.prices.one;
        },

        travelTime: function() {
            if ([3].includes(this.directionsValue)) {
                return {
                    full: this.valueB - this.valueA + this.getTravelTime,
                    road: this.getTravelTime * 2,
                };
            }
            return {
                full: this.getTravelTime,
                road: this.getTravelTime,
            };
        },
    },

    created() {
        this.date = this.getCurrentDate();
        this.timerID = setInterval(this.getCurrentTime, 1000);
    },

    destroy() {
        clearInterval(this.timerID);
    },
});
