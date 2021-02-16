import { createStore } from 'vuex';
import history from './history';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const responseFormats = {
  json: 'json',
  html: 'html',
};

const types = {
  sentence: 'sentence', // [ 1 .. 500 ]
  paragraph: 'paragraph', // [ 1 .. 100 ]
  title: 'title', // [ 1 .. 500 ]
};

const api = {
  url: 'https://fish-text.ru/get',
  format: responseFormats.json,
  number: 3,
  type: types.sentence,
  value: 'text',
  status: {
    name: 'status',
    value: 'success',
  },
  error: {
    code: 'errorCode',
    message: 'text',
  },
};

export default createStore({
  state: {
    api,
    stats: {
      counter: 0,
      list: [], // 1 - элемент среднее значение
    },
    text: {
      isLoading: false,
      error: false,
      value: '',
    },
  },
  mutations,
  actions,
  getters,
  modules: {
    history,
  },
});
