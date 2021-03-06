import {setTypeHouse} from './filter.js';

//получение данных
const getData = (onSucsess, onFail) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      onSucsess(data);
      setTypeHouse(() => onSucsess(data));
    })
    .catch(() => onFail())
};

//отправка формы на сервер
const sendData = (onSuccess, onFail, body) => {

  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    })
};

export {getData, sendData};
