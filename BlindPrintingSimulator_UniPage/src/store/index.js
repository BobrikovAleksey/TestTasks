import { createStore } from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
// modules
import history from './history';
import testing from './testing';

const vuexOptions = {
  state: {},
  mutations,
  actions,
  getters,

  modules: {
    history,
    testing,
  },
};

export default createStore(vuexOptions);
