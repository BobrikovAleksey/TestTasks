// components
import card from './components/card.js';
import controlPanel from './components/control-panel.js';
import dealList from './components/deal-list.js';

// storage
import Store from './store/index.js';


Vue.component('v-card', card);
Vue.component('v-deal-list', dealList);
Vue.component('v-control-panel', controlPanel);

Vue.use(Vuex);


const store = new Vuex.Store(Store);


const app = new Vue({
    el: '#app',
    store,
});
