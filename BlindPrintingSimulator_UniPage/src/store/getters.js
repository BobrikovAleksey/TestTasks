const getPrefixUrl = () => {
  if (window.location.hostname === 'bobrikovaleksey.github.io') {
    return 'https://bobrikovaleksey.github.io/TestTasks/BlindPrintingSimulator_UniPage/dist/';
  }
  return process.env.BASE_URL;
};

const getImages = () => {
  const prefixUrl = getPrefixUrl();
  return {
    certificates: `${prefixUrl}images/certificates.png`,
    fingers: `${prefixUrl}images/fingers.png`,
    keyboard: `${prefixUrl}images/keyboard.png`,
    man: `${prefixUrl}images/man.png`,
    pose: `${prefixUrl}images/pose.png`,
  };
};

export default {
  getImages,
};
