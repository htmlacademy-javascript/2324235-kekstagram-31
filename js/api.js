const API_URL = 'https://31.javascript.htmlacademy.pro/kekstagram/data';

const getData = () =>
  fetch(API_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Не удалось загрузить данные');
      }
    });

const sendData = (data) =>
  fetch(API_URL, {
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
