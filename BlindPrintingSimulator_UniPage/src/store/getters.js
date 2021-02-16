const getApiCount = (state) => state.api.number;

const getApiUrl = (state) => state.api.url;

const getApiQuery = (state) => {
  const { format, number, type } = state.api;
  return `format=${format}&type=${type}&number=${number}`;
};

const getImages = () => ({
  certificates: `${process.env.BASE_URL}images/certificates.png`,
});

const getStats = (state) => state.stats.list;

// accuracy: {
//   value: (item.accuracy + accuracy) / counter,
//     string: `${Math.floor(((item.accuracy + accuracy) / counter) * 1000) / 10}%`,
// },
// certificate: 'average',
//   speed: (item.speed + speed) / counter,
//   textLength: (item.textLength + textLength) / textLength,

const getTextValue = (state) => state.text.value.split('');

const getTextError = (state) => state.text.error;

const isLoadingText = (state) => state.text.isLoading;

export default {
  getApiCount,
  getApiUrl,
  getApiQuery,
  getImages,
  getStats,
  getTextValue,
  getTextError,
  isLoadingText,
};
