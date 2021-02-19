// noinspection JSUnresolvedFunction,JSUnresolvedVariable
export default {
    computed: {
        ...Vuex.mapGetters({
            fromPoint: 'getFromPoint',
            toPoint: 'getToPoint',
        }),
    },

    template: `
        <h2 class="mb-4">из {{ fromPoint }} в {{ toPoint }}</h2>
    `,
};
