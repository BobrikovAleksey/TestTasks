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
  state.text.value = error;
  state.text.isError = true;
  state.text.isLoading = false;
};

/**
 * @param state
 */
const SET_TEXT_LOADING = (state) => {
  state.text.value = '';
  state.text.isError = false;
  state.text.isLoading = true;
};

/**
 * @param state
 * @param text { string }
 */
const SET_TEXT_VALUE = (state, text) => {
  state.text.value = text;
  state.text.isError = false;
  state.text.isLoading = false;
};

/**
 * @param state
 */
const RESET_TEST = (state) => {
  state.test.cursor = 0;
  state.test.mistakes = 0;
};

/**
 * @param state
 * @param position { number }
 */
const SET_CURSOR = (state, position) => {
  state.test.cursor = position;
};

/**
 * @param state
 * @param count { number }
 */
const SET_MISTAKES = (state, count) => {
  state.test.mistakes = count;
};

/**
 * @param state
 * @param value { boolean }
 */
const SWITCH_TEST_VISIBILITY = (state, value) => {
  state.test.visibility = value;
};

/**
 * @param state
 */
const CLEAR_TIMER = (state) => {
  state.test.timer = {
    id: null,
    end: null,
    start: null,
  };
};

/**
 * @param state
 */
const STOP_TIMER = (state) => {
  state.test.timer.id = null;
};

/**
 * @param state
 * @param timerId { number }
 */
const UPDATE_TIMER = (state, timerId) => {
  const currentTime = new Date();
  state.test.timer = {
    id: timerId,
    end: currentTime,
    start: currentTime,
  };
};

/**
 * @param state
 */
const UPDATE_END_TIMER = (state) => {
  state.test.timer.end = new Date();
};

export default {
  // text
  SET_TEXT_LENGTH,
  SET_TEXT_ERROR,
  SET_TEXT_LOADING,
  SET_TEXT_VALUE,
  // test
  RESET_TEST,
  SET_CURSOR,
  SET_MISTAKES,
  SWITCH_TEST_VISIBILITY,
  // timer
  CLEAR_TIMER,
  STOP_TIMER,
  UPDATE_TIMER,
  UPDATE_END_TIMER,
};
