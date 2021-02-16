import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const formats = {
  json: 'json',
  html: 'html',
};

const types = {
  // доступный диапазон [ 1 .. 500 ]
  sentence: 'sentence',
  // доступный диапазон [ 1 .. 100 ]
  paragraph: 'paragraph',
  // доступный диапазон [ 1 .. 500 ]
  title: 'title',
};

const api = {
  url: 'https://fish-text.ru/get',
  config: {
    format: formats.json,
    type: types.sentence,
    number: 3,
  },
  fields: {
    result: 'text',
    error: {
      code: 'errorCode',
      value: 'text',
    },
    status: {
      name: 'status',
      valueTrue: 'success',
      valueFalse: 'error',
    },
  },
};

export default {
  namespaced: true,

  state: {
    api,
    text: {
      value: '',
      isLoading: false,
      isError: false,
    },
  },
  mutations,
  actions,
  getters,
};
