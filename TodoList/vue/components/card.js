import {Directions, ListNames} from '../store/dictionary.js';


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

                    <button type="button" class="btn btn-warning" @click="moveToList">
                        <i class="fa fa-arrow-right"></i>
                    </button>
                </div>

                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-info" @click="openEditor">
                        <i v-show="!editor.isVisibility" class="fa fa-pencil"></i>
                        <i v-show="editor.isVisibility" class="fa fa-times"></i>
                    </button>

                    <button v-show="editor.isVisibility" type="button" class="btn btn-info" @click="save">
                        <i class="fa fa-check"></i>
                    </button>

                    <button type="button" class="btn btn-danger" @click="remove">
                        <i class="fa fa-trash-o"></i>
                    </button>
                </div>
            </div>

            <div class="card-body" :class="colorSchema">
                <h5 class="card-title">{{ deal.title }}</h5>

                <textarea v-show="editor.isVisibility" class="w-100" maxlength="512" rows="4"
                          v-model="editor.value"></textarea>
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
            required: true,
        },
    },

    data: function() {
        return {
            editor: {
                isVisibility: false,
                value: this.deal.title,
            },
        };
    },

    methods: {
        ...Vuex.mapActions({
            _move: 'moveDeal',
            _remove: 'removeDeal',
            _save: 'saveDeal',
        }),

        moveDown: function() {
            this._move({ listName: this.name, deal: this.deal, direction: Directions.down });
        },

        moveToList: function() {
            if (this.name === ListNames.active) {
                this._move({ listName: ListNames.active, deal: this.deal, direction: Directions.complete });
            } else if (this.name === ListNames.complete) {
                this._move({ listName: ListNames.complete, deal: this.deal, direction: Directions.active });
            }
        },

        moveUp: function() {
            this._move({ listName: this.name, deal: this.deal, direction: Directions.up });
        },

        openEditor: function() {
            this.editor.isVisibility = !this.editor.isVisibility;
            if (!this.editor.isVisibility) this.editor.value = this.deal.title;
        },

        remove: function() {
            this._remove({ listName: this.name, deal: this.deal });
        },

        save: function() {
            const newDeal = { ...this.deal };
            newDeal.title = this.editor.value;
            this._save({ listName: this.name, deal: newDeal });
            this.editor.isVisibility = false;
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
