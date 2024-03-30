const API_URL_BASE = 'https://31.javascript.htmlacademy.pro/kekstagram/data';
const API_URL_SEND = 'https://31.javascript.htmlacademy.pro/kekstagram/';

const getData = () =>
  fetch(API_URL_BASE)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Не удалось загрузить данные');
      }
    });

const sendData = (data) =>
  fetch(API_URL_SEND, {
    method: 'POST',
    body: data,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Не удалось отправить данные');
      }
    });

export { getData, sendData };
