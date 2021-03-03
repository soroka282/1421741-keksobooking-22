const SIMILAR_AD_COUNT = 10;

//получение данных
const getData = (onSucsess, onFail) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => {
      onSucsess(data.slice(0, SIMILAR_AD_COUNT))
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
