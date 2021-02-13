const getTextValue = (state) => state.text.value.split('');

const getTextError = (state) => state.text.error;

const isLoadingText = (state) => state.text.isLoading;

export default {
  getTextValue,
  getTextError,
  isLoadingText,
};
