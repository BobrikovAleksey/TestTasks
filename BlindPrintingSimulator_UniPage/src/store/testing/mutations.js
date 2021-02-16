/**
 * @param state
 * @param value { number }
 */
const SET_TEXT_LENGTH = (state, value) => {
  state.api.config.number = value;
};

/**
 * @param state
 * @param error { string|Error }
 * @constructor
 */
const SET_TEXT_ERROR = (state, error) => {
  state.text = {
    value: error,
    isError: true,
    isLoading: false,
  };
};

/**
 * @param state
 */
const SET_TEXT_LOADING = (state) => {
  state.text = {
    value: '',
    isError: false,
    isLoading: true,
  };
};

/**
 * @param state
 * @param text { string }
 */
const SET_TEXT_VALUE = (state, text) => {
  state.text = {
    value: text,
    isError: false,
    isLoading: false,
  };
};

export default {
  SET_TEXT_LENGTH,
  SET_TEXT_ERROR,
  SET_TEXT_LOADING,
  SET_TEXT_VALUE,
};
