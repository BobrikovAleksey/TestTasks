import { ListNames } from '../store/dictionary.js';


// noinspection JSUnresolvedFunction,JSUnresolvedVariable,JSUnusedGlobalSymbols
export default {
    template: `
        <div class="col-lg-6">
            <h2>{{ title }}</h2>

            <div class="mt-3">
                <v-card v-for="el in dealList" :key="el.id" :deal="el" :name="listName"></v-card>
            </div>
        </div>
    `,

    props: {
        title: {
            type: String,
            default: 'Список задач',
        },
        name: {
            type: String,
            required: true,
        },
    },

    data: function() {
        return {
            listName: ListNames[this.name] ?? ListNames.active,
        };
    },

    methods: {
        ...Vuex.mapActions(['saveDealList', 'loadDealList']),
    },

    computed: {
        ...Vuex.mapGetters({
            activeList: 'getActiveList',
            completeList: 'getCompleteList',
        }),

        dealList: function() {
            return this[`${this.listName}List`];
        },
    },

    created: function() {
        this.saveDealList(this.listName);
        this.loadDealList(this.listName);
    },
};
