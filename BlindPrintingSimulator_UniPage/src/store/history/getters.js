const getList = (state) => state.list.map((el) => ({
  certificate: el.certificate,
  speed: `${Math.floor(el.speed)} зн./мин`,
  accuracy: `${Math.floor(el.accuracy * 1000) / 10}%`,
  textLength: el.textLength,
}));

export default {
  getList,
};
