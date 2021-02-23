import {
  createCardAds,
  makeMarkup,
  makeMarkupTypeHouse,
  makeMarkupRoomsGuests,
  makeMarkupCheckin,
  getFeaturesInMarkup,
  getPhotosInMarkup
} from './generationofmarkupad.js';

import {
  adForm,
  mapFilters,
  makePageDeactivated,
  addressInput,
  setCoordinates
} from './form.js';

/* global L:readonly */

//добавлеяем карту
const map = L.map('map-canvas')
  //удаляем disabled у формы, поиска, если карта загрузилась
  .on('load', () => {
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
    makePageDeactivated();
  })
  .setView({
    lat: 35.6895,
    lng: 139.692,
  }, 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

//добавляем "главный" маркер
const mainIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
  shadowUrl: 'leaflet/images/marker-shadow.png',
  shadowSize: [80, 60],
  shadowAnchor: [25, 60],
});

const mainPoint = L.marker(
  {
    lat: 35.6895,
    lng: 139.692,
  },
  {
    draggable: true,
    icon: mainIcon,
  },
);
mainPoint.addTo(map);

//событие изменения координат "главной" метки
mainPoint.on('moveend', (evt) => {
  setCoordinates(addressInput, evt);
});

//добавляем массив "обычных" меткок
createCardAds.forEach((element) => {

  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
    shadowUrl: 'leaflet/images/marker-shadow.png',
    shadowSize: [80, 60],
    shadowAnchor: [25, 60],
  });

  const points = L.marker(
    {
      lat: element.location.x,
      lng: element.location.y,
    },
    {
      icon: icon,
    });

  // Шаблон карточки объявления
  const adTemplate = document.querySelector('#card').content.querySelector('.popup');

  //Клонируем шаблон
  const adElement = adTemplate.cloneNode(true);

  //получаем заголовок, адресс, описание, аватар, цену жилья в разметке
  makeMarkup(adElement, element.offer.title, '.popup__title');
  makeMarkup(adElement, element.offer.address, '.popup__text--address');
  makeMarkup(adElement, element.offer.description, '.popup__description');
  makeMarkup(adElement, element.author.avatar, '.popup__avatar');
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
  getPhotosInMarkup(adElement, element.offer.photos, '.popup__photos');

  points
    .addTo(map)
    .bindPopup(adElement,
      {
        keepInView: true,
      },
    );
});
