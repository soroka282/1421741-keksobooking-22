import {similarCardsAd} from './data.js';
import {showDeclensionOfWord, showHousingMatches} from './util.js';

// блок вставки объявления
const canvasBlock = document.querySelector('.map__canvas');

// Шаблон карточки объявления
const adTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarListFragment = document.createDocumentFragment();

//генерируем необходимые данные из массива
const createCardAds = similarCardsAd;
createCardAds.forEach((element) => {

  //Клонируем шаблон
  const adElement = adTemplate.cloneNode(true);

  //находим необходимый класс в разметке
  //проверяем, есть ли необходимые данные в массиве
  //записываем полученные данные в разметку, либо прячем при их отсутсвии

  const makeMarkup = (data, selector, text = '') => {
    if(data) {
      adElement.querySelector(selector).textContent = data + text;
    } else {
      adElement.querySelector(selector).classList.add('hidden');
    }
  };
  //получаем заголовок, адресс, описание, аватар, цену жилья в разметке
  makeMarkup(element.offer.title, '.popup__title');
  makeMarkup(element.offer.address, '.popup__text--address');
  makeMarkup(element.offer.description, '.popup__description');
  makeMarkup(element.author.avatar, '.popup__avatar');
  makeMarkup(element.offer.price, '.popup__text--price', ' ₽/ночь');

  //получаем тип жилья в разметке
  const makeMarkupTypeHouse = (data, selector) => {
    if(data) {
      adElement.querySelector(selector).textContent = showHousingMatches(data);
    } else {
      adElement.querySelector(selector).classList.add('hidden');
    }
  };
  makeMarkupTypeHouse(element.offer.type, '.popup__type');

  //получаем количество гостей и комнат в разметке
  const makeMarkupRoomsGuests = (rooms, guests, selector) => {

    //добавляем массивы склоняемых слов
    const roomTextForms = ['комната', 'комнаты', 'комнат'];
    const guestTextForms = ['гостя', 'гостей', 'гостей'];

    //добавляем функцию для их склонения
    const declensionOfRoom = showDeclensionOfWord(rooms, roomTextForms);
    const declensionOfGuests = showDeclensionOfWord(guests, guestTextForms);

    //ищем подходящий селектор
    const capacityElement = adElement.querySelector(selector);

    if(rooms && guests) {
      capacityElement.textContent = `${rooms} ${declensionOfRoom} для ${guests} ${declensionOfGuests}`;
    } else {
      capacityElement.classList.add('hidden');
    }
  };
  makeMarkupRoomsGuests(element.offer.rooms, element.offer.guests, '.popup__text--capacity');

  //получаем дату заезда и выезда в разметке
  const makeMarkupCheckin = (checkin, checkout, selector) => {
    const timeElement = adElement.querySelector(selector);

    if(checkin && checkout) {
      timeElement.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
    } else {
      timeElement.classList.add('hidden');
    }
  };
  makeMarkupCheckin(element.offer.checkin, element.offer.checkout, '.popup__text--time');

  //получаем список фич в разметке
  const getFeaturesInMarkup = (data, selector) => {
    const featuresElement = adElement.querySelector(selector);
    featuresElement.innerHTML = '';
    data.forEach(el => {
      featuresElement.
        insertAdjacentHTML('beforeend', el.map((feature => `<li class="popup__feature popup__feature--${feature}"></li>`))
          .join(''));
    });
  };
  getFeaturesInMarkup(element.offer.features, '.popup__features');

  //получаем список фото в разметке
  const getPhotosInMarkup = (data, selector) => {
    const photosElement = adElement.querySelector(selector);
    photosElement.innerHTML = '';
    data.forEach(el => {
      photosElement.
        insertAdjacentHTML('beforeend', el.map((photo =>`<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`))
          .join(''));
    });
  };
  getPhotosInMarkup(element.offer.photos, '.popup__photos');

  //вставляем данные в рамзетку
  similarListFragment.appendChild(adElement);
});

canvasBlock.appendChild(similarListFragment);


