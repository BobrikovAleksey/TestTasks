const getApiCount = (state) => state.api.number;

const getApiUrl = (state) => state.api.url;

const getApiQuery = (state) => {
  const { format, number, type } = state.api;
  return `format=${format}&type=${type}&number=${number}`;
};

const getImages = () => ({
  certificates: `${process.env.BASE_URL}images/certificates.png`,
});

const getTextValue = (state) => state.text.value.split('');

const getTextError = (state) => state.text.error;

const isLoadingText = (state) => state.text.isLoading;

export default {
  getApiCount,
  getApiUrl,
  getApiQuery,
  getImages,
  getTextValue,
  getTextError,
  isLoadingText,
};
