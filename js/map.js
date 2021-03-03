import {
  makeMarkupSrc,
  makeMarkup,
  makeMarkupTypeHouse,
  makeMarkupRoomsGuests,
  makeMarkupCheckin,
  getFeaturesInMarkup,
  getPhotosInMarkup
} from './genofmarkupad.js';

import {
  adForm,
  mapFilters,
  makePageDeactivated,
  addressInput,
  setCoordinates
} from './form.js';

import {showErrorPopupServer} from './showerrorpopupserver.js';

import {getData} from './api.js';

/* global L:readonly */
const LAT_CENTER_MAP = 35.6895;
const LNG_CENTER_MAP =  139.692;
const ZOOM_MAP = 12;
const LAT_MAIN_POINT = 35.6895;
const LNG_MAIN_POINT = 139.692;
const ICON_SIZE_X = 52;
const ICON_SIZE_Y = 52;
const ICON_ANCHOR_X = 26;
const ICON_ANCHOR_Y = 52;
const SHADOW_SIZE_X = 80;
const SHADOW_SIZE_Y = 60;
const SHADOW_ANCHOR_X = 25;
const SHADOW_ANCHOR_Y = 60;

//добавлеяем карту
const map = L.map('map-canvas')
  //удаляем disabled у формы, поиска, если карта загрузилась
  .on('load', () => {
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
    makePageDeactivated();
  })
  .setView({
    lat: LAT_CENTER_MAP,
    lng: LNG_CENTER_MAP,
  }, ZOOM_MAP);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

//добавляем "главный" маркер
const mainIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [ICON_SIZE_X, ICON_SIZE_Y],
  iconAnchor: [ICON_ANCHOR_X, ICON_ANCHOR_Y],
  shadowUrl: 'leaflet/images/marker-shadow.png',
  shadowSize: [SHADOW_SIZE_X, SHADOW_SIZE_Y],
  shadowAnchor: [SHADOW_ANCHOR_X, SHADOW_ANCHOR_Y],
});

const mainPoint = L.marker(
  {
    lat: LAT_MAIN_POINT,
    lng: LNG_MAIN_POINT,
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

//возвращаем метку в положение по-умолчанию
const getCoordMainPointDefault = () => {
  mainPoint.setLatLng(L.latLng(LAT_MAIN_POINT, LNG_MAIN_POINT))
};

const renderPoints = (data) => {
//добавляем массив "обычных" меткок
  data.forEach((element) => {

    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [ICON_SIZE_X, ICON_SIZE_Y],
      iconAnchor: [ICON_ANCHOR_X, ICON_ANCHOR_Y],
      shadowUrl: 'leaflet/images/marker-shadow.png',
      shadowSize: [SHADOW_SIZE_X, SHADOW_SIZE_Y],
      shadowAnchor: [SHADOW_ANCHOR_X, SHADOW_ANCHOR_Y],
    });

    const points = L.marker(
      {
        lat: element.location.lat,
        lng: element.location.lng,
      },
      {
        icon: icon,
      });

    // Шаблон карточки объявления
    const adTemplate = document.querySelector('#card').content.querySelector('.popup');
    const similarListFragment = document.createDocumentFragment();
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

    points
      .addTo(map)
      .bindPopup(adElement,
        {
          keepInView: true,
        },
      );
  });
};

getData(renderPoints, showErrorPopupServer);

export {getCoordMainPointDefault};
