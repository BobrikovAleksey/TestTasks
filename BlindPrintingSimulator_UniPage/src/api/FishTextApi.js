const numbers = {
  sentence: 6, // [ 1 .. 500 ]
  paragraph: 3, // [ 1 .. 100 ]
  title: 1, // [ 1 .. 500 ]
};

const types = {
  sentence: `type=sentence&${numbers.sentence}`,
  paragraph: `type=paragraph&${numbers.paragraph}`,
  title: `type=title&${numbers.title}`,
};

const formats = {
  json: 'json',
  html: 'html',
};

/**
 * Возвращает ошибку в виде текста
 * @param errorCode { number }
 * @param text { string }
 * @returns { string|boolean }
 */
const getError = ({ errorCode, text }) => {
  if (errorCode) return `Код ошибки: ${errorCode}. \nСообщение: ${text}`;
  return false;
};

/**
 * Возвращает статус ответа
 * @param status { string }
 * @returns { boolean }
 */
const getStatus = ({ status }) => status === 'success';

/**
 * Возвращает текст из полученных данных
 * @param text { string }
 */
const getValue = ({ text }) => text;

export default {
  url: 'https://fish-text.ru/get',
  params: `${types.sentence}&format=${formats.json}`,
  getError,
  getStatus,
  getValue,
};
