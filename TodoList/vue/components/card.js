import { Directions } from '../store/dictionary.js';


// noinspection JSUnresolvedFunction,JSUnresolvedVariable,JSUnusedGlobalSymbols
export default {
    template: `
        <div class="card mb-2">
            <div class="card-header d-flex justify-content-between">
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-primary" @click="moveUp">
                        <i class="fa fa-arrow-up"></i>
                    </button>

                    <button type="button" class="btn btn-primary" @click="moveDown">
                        <i class="fa fa-arrow-down"></i>
                    </button>

                    <button type="button" class="btn btn-warning">
                        <i class="fa fa-arrow-right"></i>
                    </button>
                </div>

                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-info">
                        <i class="fa fa-pencil"></i>
                    </button>

                    <button type="button" class="btn btn-danger">
                        <i class="fa fa-trash-o"></i>
                    </button>
                </div>
            </div>

            <div class="card-body" :class="colorSchema">
                <h5 class="card-title">{{ deal.title }}</h5>
            </div>
        </div>
    `,

    props: {
        deal: {
            type: Object,
            required: true,
        },
        name: {
            type: String,
            default: 'active',
        }
    },

    methods: {
        ...Vuex.mapActions({
            move: 'moveDeal',
        }),

        moveUp: function() {
            this.move({ listName: name, deal: this.deal, direction: Directions.up });
        },

        moveDown: function() {
            this.move({ listName: name, deal: this.deal, direction: Directions.down });
        },
    },

    computed: {
        /**
         * Возвращает цветовую схему карточки
         * @returns {string}
         */
        colorSchema: function () {
            const color = this.deal.color ?? 'secondary';
            return `border-${color} text-${color}`;
        },
    },
};
