import {similarCardsAd} from './data.js';
import {showDeclensionOfWord, showHousingMatches} from './util.js';

// блок вставки объявления
const canvasBlock = document.querySelector('.map__canvas');

// Шаблон карточки объявления
const adTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarListFragment = document.createDocumentFragment();


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
  const roomTextForms = ['комната', 'комнаты', 'комнат'];
  const guestTextForms = ['гостя', 'гостей', 'гостей'];

  //добавляем функцию для их склонения
  const declensionOfRoom = showDeclensionOfWord(rooms, roomTextForms);
  const declensionOfGuests = showDeclensionOfWord(guests, guestTextForms);

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
//генерируем необходимые данные из массива

const createCardAds = similarCardsAd();

createCardAds.forEach((element) => {

  //Клонируем шаблон
  const adElement = adTemplate.cloneNode(true);

  //получаем заголовок, адресс, описание, аватар, цену жилья в разметке
  makeMarkup(adElement, element.offer.title, '.popup__title');
  makeMarkup(adElement, element.offer.address, '.popup__text--address');
  makeMarkup(adElement, element.offer.description, '.popup__description');
  makeMarkupSrc(adElement, element.author.avatar, '.popup__avatar');
  makeMarkup(adElement, element.offer.price, '.popup__text--price', ' ₽/ночь');

  //получаем тип жилья в разметке
  makeMarkupTypeHouse(adElement, element.offer.type, '.popup__type');

  //получаем количество гостей и комнат в разметке
  makeMarkupRoomsGuests(adElement, element.offer.rooms, element.offer.guests, '.popup__text--capacity');

  //получаем дату заезда и выезда в разметке
  makeMarkupCheckin(adElement, element.offer.checkin, element.offer.checkout, '.popup__text--time');

  //получаем список фич в разметке
  getFeaturesInMarkup(adElement, element.offer.features, '.popup__features');

  //получаем список фото в разметке
  getPhotosInMarkup(adElement, element.offer.photos, '.popup__photos' );

  //вставляем данные в рамзетку
  similarListFragment.appendChild(adElement);

});
//canvasBlock.appendChild(similarListFragment)

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
