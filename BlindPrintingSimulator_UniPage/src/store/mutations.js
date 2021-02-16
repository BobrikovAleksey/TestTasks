/**
 * @param state
 * @param value { number }
 */
const SET_API_TEXT_COUNT = (state, value) => {
  state.api.number = value;
};

/**
 * @param state
 * @param counter { number }
 * @param list {{ accuracy: { value: number, string: string }, certificate: { string },
 *                speed: { number }, textLength: { number } }[]}
 * @constructor
 */
const SET_STATS = (state, { counter, list }) => {
  state.stats = {
    counter,
    list,
  };
};

/**
 * @param state
 * @param list {{ accuracy: { value: number, string: string }, certificate: { string },
 *                speed: { number }, textLength: { number } }[]}
 * @constructor
 */
const SET_STATS_LIST = (state, list) => {
  state.stats = {
    counter: state.stats.counter + 1,
    list,
  };
};

/**
 * @param state
 * @constructor
 */
const SET_TEXT_LOADING = (state) => {
  state.text = {
    isLoading: true,
    error: '',
    value: '',
  };
};

/**
 * @param state
 * @param error { string|Error }
 * @constructor
 */
const SET_TEXT_ERROR = (state, error) => {
  state.text = {
    isLoading: false,
    error,
    value: '',
  };
};

/**
 * @param state
 * @param text {string}
 * @constructor
 */
const SET_TEXT_VALUE = (state, text) => {
  state.text = {
    isLoading: false,
    error: '',
    value: text,
  };
};

export default {
  SET_API_TEXT_COUNT,
  SET_STATS,
  SET_STATS_LIST,
  SET_TEXT_LOADING,
  SET_TEXT_ERROR,
  SET_TEXT_VALUE,
};
