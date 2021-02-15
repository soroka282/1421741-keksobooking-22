import {similarCardsAd} from './data.js';
import {showDeclensionOfWord} from './showDeclensionOfWord.js';
import {showHousingMatches} from './showHousingMatches.js';

// блок вставки объявления
const canvasBlock = document.querySelector('.map__canvas');

// Шаблон карточки объявления
const adTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarListFragment = document.createDocumentFragment();

//генерируем необходимые данные из массива
const createCardAds = similarCardsAd;
createCardAds.forEach((element) => {

  const title = element.offer.title;
  const address = element.offer.address;
  const price = element.offer.price;
  const type = element.offer.type;
  const rooms = element.offer.rooms;
  const guests = element.offer.guests;
  const checkin = element.offer.checkin;
  const checkout = element.offer.checkout;
  const description = element.offer.description;
  const features = element.offer.features;
  const photos = element.offer.photos;
  const avatar = element.author.avatar;

  //Клонируем шаблон
  const adElement = adTemplate.cloneNode(true);

  //находим необходимый класс в разметке
  //проверяем, есть ли необходимые данные в массиве
  //записываем полученные данные в разметку, либо прячем при их отсутсвии
  const titleElement = adElement.querySelector('.popup__title');
  title ? titleElement.textContent = title : titleElement.classList.add('hidden');

  const addressElement = adElement.querySelector('.popup__text--address');
  address ? addressElement.textContent = address : addressElement.classList.add('hidden');

  const priceElement = adElement.querySelector('.popup__text--price');
  price ? priceElement.textContent = price + ' ₽/ночь': priceElement.classList.add('hidden');

  const typeElement = adElement.querySelector('.popup__type');
  type ? typeElement.textContent = showHousingMatches(type) : typeElement.classList.add('hidden');

  //добавляем массивы склоняемых слов и функцию для их склонения
  const roomTextForms = ['комната', 'комнаты', 'комнат'];
  const guestTextForms = ['гостя', 'гостей', 'гостей'];
  const CapacityElement = adElement.querySelector('.popup__text--capacity');
  rooms && guests ?
    CapacityElement.textContent = rooms  + ' ' + showDeclensionOfWord(rooms, roomTextForms) + ' для ' + guests + ' ' + showDeclensionOfWord(guests, guestTextForms)
    : CapacityElement.classList.add('hidden');

  const timeElement = adElement.querySelector('.popup__text--time');
  checkin && checkout ?
    timeElement.textContent = 'Заезд после ' + checkin + ' , выезд до ' + checkout
    : timeElement.classList.add('hidden');

  const descriptionElement = adElement.querySelector('.popup__description');
  description
    ? descriptionElement.textContent = description
    : descriptionElement.classList.add('hidden');

  const featuresElement = adElement.querySelector('.popup__features')
  featuresElement.innerHTML = '';
  features.forEach(el => {
    featuresElement.insertAdjacentHTML('beforeend', el.map((feature => '<li class="popup__feature popup__feature--' + feature +  '"></li>')).join(''));
  });

  const photosElement = adElement.querySelector('.popup__photos');
  photosElement.innerHTML = '';
  photos.forEach((el) => {
    photosElement.insertAdjacentHTML('beforeend', el.map((photo =>'<img src=" ' + photo + ' " class="popup__photo" width="45" height="40" alt="Фотография жилья">')).join(''));
  });

  const avatarElement =  adElement.querySelector('.popup__avatar');
  avatarElement.src = avatar;
  avatar ? avatarElement.src : avatarElement.classList.add('hidden');

  //вставляем данные в рамзетку
  similarListFragment.appendChild(adElement);
});

canvasBlock.appendChild(similarListFragment);


