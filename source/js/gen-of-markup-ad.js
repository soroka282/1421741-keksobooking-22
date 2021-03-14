// import {similarCardsAd} from './data.js';
import {showDeclensionOfWord, showHousingMatches} from './util.js';

const canvasBlock = document.querySelector('.map__canvas');

//находим необходимый класс в разметке
//проверяем, есть ли необходимые данные в массиве
//записываем полученные данные в разметку, либо прячем при их отсутсвии
const makeMarkup = (template, data, selector, text = '') => {
  if(data) {
    template.querySelector(selector).textContent = data + text;
  } else {
    template.querySelector(selector).classList.add('hidden');
  }
};

//получаем аватар в разметке
const makeMarkupSrc = (template, data, selector) => {
  if(data) {
    template.querySelector(selector).src = data;
  } else {
    template.querySelector(selector).classList.add('hidden');
  }
};

//получаем тип жилья в разметке
const makeMarkupTypeHouse = (template, data, selector) => {
  if(data) {
    template.querySelector(selector).textContent = showHousingMatches(data);
  } else {
    template.querySelector(selector).classList.add('hidden');
  }
};

//получаем количество гостей и комнат в разметке
const makeMarkupRoomsGuests = (template, rooms, guests, selector) => {

  //добавляем массивы склоняемых слов
  const ROOMS_TEXT_FORMS = ['комната', 'комнаты', 'комнат'];
  const GUEST_TEXT_FORMS = ['гостя', 'гостей', 'гостей'];

  //добавляем функцию для их склонения
  const declensionOfRoom = showDeclensionOfWord(rooms, ROOMS_TEXT_FORMS);
  const declensionOfGuests = showDeclensionOfWord(guests, GUEST_TEXT_FORMS);

  //ищем подходящий селектор
  const capacityElement = template.querySelector(selector);

  if(rooms && guests) {
    capacityElement.textContent = `${rooms} ${declensionOfRoom} для ${guests} ${declensionOfGuests}`;
  } else {
    capacityElement.classList.add('hidden');
  }
};

//получаем дату заезда и выезда в разметке
const makeMarkupCheckin = (template, checkin, checkout, selector) => {
  const timeElement = template.querySelector(selector);

  if(checkin && checkout) {
    timeElement.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else {
    timeElement.classList.add('hidden');
  }
};

//получаем список фич в разметке
const getFeaturesInMarkup = (template, data, selector) => {
  const featuresElement = template.querySelector(selector);
  featuresElement.innerHTML = '';
  data.forEach(el => {
    featuresElement.
      insertAdjacentHTML('beforeend', `<li class="popup__feature popup__feature--${el}"></li>`);
  });
};

//получаем список фото в разметке
const getPhotosInMarkup = (template, data, selector) => {
  const photosElement = template.querySelector(selector);
  photosElement.innerHTML = '';
  data.forEach(el => {
    photosElement.
      insertAdjacentHTML('beforeend', `<img src="${el}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
  });
};

export {
  makeMarkupSrc,
  makeMarkup,
  makeMarkupTypeHouse,
  makeMarkupRoomsGuests,
  makeMarkupCheckin,
  getFeaturesInMarkup,
  getPhotosInMarkup,
  canvasBlock
};
