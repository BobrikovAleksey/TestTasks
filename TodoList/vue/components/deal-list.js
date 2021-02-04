import { ListNames } from '../store/dictionary.js';


// noinspection JSUnresolvedFunction,JSUnresolvedVariable,JSUnusedGlobalSymbols
export default {
    template: `
        <div class="col-lg-6">
            <h2>Активные задачи {{listName}}</h2>

            <div class="mt-3">
                <v-card v-for="el in dealList" :key="el.id" :deal="el" :name="listName"></v-card>
            </div>
        </div>
    `,

    props: {
        name: {
            type: String,
            required: true,
        },
    },

    methods: {
        ...Vuex.mapActions(['saveDealList', 'loadDealList']),
    },

    computed: {
        ...Vuex.mapGetters({
            activeList: 'getActiveList',
            completeList: 'getCompleteList',
        }),

        listName: function() {
            return ListNames[this.name] ?? ListNames.active;
        },

        dealList: function() {
            return this[`${this.listName}List`];
        },
    },

    created: function() {
        this.saveDealList(this.listName);
        this.loadDealList(this.listName);
    },
};
