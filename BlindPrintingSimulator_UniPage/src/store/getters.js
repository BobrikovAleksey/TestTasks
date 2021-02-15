const getImages = () => ({
  certificates: `${process.env.BASE_URL}images/certificates.png`,
});

const getTextValue = (state) => state.text.value.split('');

const getTextError = (state) => state.text.error;

const isLoadingText = (state) => state.text.isLoading;

export default {
  getImages,
  getTextValue,
  getTextError,
  isLoadingText,
};
