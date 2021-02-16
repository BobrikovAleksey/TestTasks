import { createStore } from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
// modules
import history from './history';
import testing from './testing';

export default createStore({
  state: {},
  mutations,
  actions,
  getters,

  modules: {
    history,
    testing,
  },
});
