const  URL_GET = 'https://22.javascript.pages.academy/keksobooking/data';
const  URL_SEND = 'https://22.javascript.pages.academy/keksobooking';

//получение данных
const getData = (onSucsess, onFail) => {
  fetch(URL_GET)
    .then((response) => response.json())
    .then((data) => {
      onSucsess(data);
    })
    .catch(() => onFail())
};

//отправка формы на сервер
const sendData = (onSuccess, onFail, body) => {

  fetch(
    URL_SEND,
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
