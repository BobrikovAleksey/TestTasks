const getApiQuery = (state) => {
  const { format, number, type } = state.api.config;
  return `format=${format}&type=${type}&number=${number}`;
};

const getApiUrl = (state) => state.api.url;

const getMaxLength = (state) => state.text.length.max;

const getMinLength = (state) => state.text.length.min;

const getText = (state) => state.text.value;

const getTextAsArray = (state) => state.text.value.split('');

const getTextLength = (state) => state.api.config.number;

const isError = (state) => state.text.isError;

const isLoading = (state) => state.text.isLoading;

const getAccuracy = (state) => {
  const textLength = state.text.value.length;
  if (textLength === 0) return 1;
  return (textLength - state.test.mistakes) / textLength;
};

const getAccuracyAsStr = (state, getters) => `${Math.floor(getters.getAccuracy * 1000) / 10}%`;

const getCursor = (state) => state.test.cursor;

const getMistakes = (state) => state.test.mistakes;

const getPercentage = (state) => {
  const textLength = state.text.value.length;
  if (textLength === 0) return 0;
  return Math.floor((state.test.cursor / textLength) * 100);
};

const getTimer = (state) => {
  if (state.test.timer.start === null) return 0;
  return state.test.timer.end - state.test.timer.start;
};

const getSpeed = (state, getters) => {
  if (getters.getTimer === 0) return 0;
  return (state.test.cursor / getters.getTimer) * 60000;
};

const getSpeedAsStr = (state, getters) => `${Math.floor(getters.getSpeed)}`;

const isCompletedTest = (state) => state.text.value.length > 0
  && state.test.cursor >= state.text.value.length;

const isTestInProgress = (state) => state.test.timer.id !== null;

const isVisibilityTest = (state) => state.test.visibility;

export default {
  // api
  getApiQuery,
  getApiUrl,
  // text
  getMaxLength,
  getMinLength,
  getText,
  getTextAsArray,
  getTextLength,
  isError,
  isLoading,
  // test
  getAccuracy,
  getAccuracyAsStr,
  getCursor,
  getMistakes,
  getPercentage,
  getSpeed,
  getSpeedAsStr,
  getTimer,
  isCompletedTest,
  isTestInProgress,
  isVisibilityTest,
};
