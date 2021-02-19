// components
import console from './components/console.js';
import counter from './components/counter.js';
import direction from './components/direction.js';
import points from './components/points.js';
import timetableA from './components/timetableA.js';
import timetableB from './components/timetableB.js';

// storage
import Store from './store/index.js';

Vue.component('v-counter', counter);
Vue.component('v-console', console);
Vue.component('v-direction', direction);
Vue.component('v-points', points);
Vue.component('v-timetable-a', timetableA);
Vue.component('v-timetable-b', timetableB);

Vue.use(Vuex);

const store = new Vuex.Store(Store);

const app = new Vue({
    el: '#app',
    store,

    methods: {
        ...Vuex.mapActions({
            fetchTimetable: 'fetchTimetable',
        }),
    },

    created() {
        this.fetchTimetable();
    },
});
