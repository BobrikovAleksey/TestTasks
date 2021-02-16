const getImages = () => ({
  certificates: `${process.env.BASE_URL}images/certificates.png`,
  fingers: `${process.env.BASE_URL}images/fingers.png`,
  keyboard: `${process.env.BASE_URL}images/keyboard.png`,
  man: `${process.env.BASE_URL}images/man.png`,
  pose: `${process.env.BASE_URL}images/pose.png`,
});

export default {
  getImages,
};
