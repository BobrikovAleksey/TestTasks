const getApiQuery = (state) => {
  const { format, number, type } = state.api.config;
  return `format=${format}&type=${type}&number=${number}`;
};

const getApiUrl = (state) => state.api.url;

const getTextLength = (state) => state.api.config.number;

const getText = (state) => state.text.value;

const getTextAsArray = (state) => state.text.value.split('');

const isError = (state) => state.text.isError;

const isLoading = (state) => state.text.isLoading;

export default {
  getApiQuery,
  getApiUrl,
  getText,
  getTextAsArray,
  getTextLength,
  isError,
  isLoading,
};
