import { Colors, ListNames } from "../store/dictionary.js";


// noinspection JSUnresolvedVariable,JSUnusedGlobalSymbols
export default {
    template: `
        <div>
            <h2>Новая задача</h2>

            <div class="row">
                <div class="col-lg-8">
                    <textarea class="w-100" maxlength="512" rows="4" v-model="deal.title"></textarea>
                </div>

                <div class="col-lg-4 d-flex flex-column">
                    <button type="button" class="btn btn-success m-2" @click="save">Добавить</button>

                    <button type="button" class="btn btn-info m-2" @click="clear">Очистить</button>
                </div>
            </div>
        </div>
    `,

    data: function() {
        return {
            deal: {
                color: Colors.primary,
                title: '',
            },
        };
    },

    methods: {
        ...Vuex.mapActions({
            _save: 'saveDeal',
        }),

        /**
         * Очищает поле ввода задачи
         */
        clear() {
            this.deal.title = '';
        },

        /**
         * Создает задачу в списке активных
         */
        save() {
            if (!this.deal.title) return;

            this._save({ listName: ListNames.active, deal: this.deal });
            this.deal.title = '';
        },
    },

    computed: {
        ...Vuex.mapGetters({
            lastInsertedId: 'getLastInsertedId',
        }),
    },

    mounted: function() {

    },
};
