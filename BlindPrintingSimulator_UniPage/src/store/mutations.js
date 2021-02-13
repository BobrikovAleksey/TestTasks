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
  SET_TEXT_LOADING,
  SET_TEXT_ERROR,
  SET_TEXT_VALUE,
};
