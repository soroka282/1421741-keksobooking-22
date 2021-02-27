import {addAttribute, removeAttribute} from './util.js';

const MinCostsHousing = {
  bungalow : 0,
  flat : 1000,
  house : 5000,
  palace : 10000,
};

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;
const MIN_PRICE_VALUE = 0;

const roomValues = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const priceHousingInput = document.querySelector('#price');
const typeHousingInput = document.querySelector('#type');
const timeInInput = document.querySelector('#timein');
const timeOutInput = document.querySelector('#timeout');
const adForm = document.querySelector('.ad-form');
const adFormFieldset = document.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersSelect = document.querySelectorAll('.map__filter');
const mapFiltersFeatures = document.querySelectorAll('.map__features');
const titleInputForm = document.querySelector('#title');
const addressInput = document.querySelector('#address');
const roomNumberSelect = document.querySelector('#room_number');
const capacityElements = document.querySelector('#capacity');

//Зависимость минимального значения и плейсхолдера поля «Цена за ночь» от типа жилья
typeHousingInput.addEventListener('input', function() {
  priceHousingInput.setAttribute('min', MinCostsHousing[typeHousingInput.value]);
  priceHousingInput.setAttribute('placeholder', MinCostsHousing[typeHousingInput.value]);
});

//Обработчики событий «Время заезда», «Время выезда»
//выбор опции одного поля автоматически изменят значение другого
timeInInput.addEventListener('input', function() {
  timeOutInput.selectedIndex = timeInInput.selectedIndex ;
});

timeOutInput.addEventListener('input', function() {
  timeInInput.selectedIndex = timeOutInput.selectedIndex ;
});

//добавляем класс disabled форме и фильтру, если карта не активировалась
adForm.classList.add('ad-form--disabled');
mapFilters.classList.add('map__filters--disabled');

//добавляем атрибут disabled, если карта не активировалась
const makePageActivated = () => {
  addAttribute(adFormFieldset, 'disabled');
  addAttribute(mapFiltersSelect, 'disabled');
  addAttribute(mapFiltersFeatures, 'disabled');
};
makePageActivated();

//удаляем атрибут disabled, если карта не активировалась
const makePageDeactivated = () => {
  removeAttribute(adFormFieldset, 'disabled');
  removeAttribute(mapFiltersSelect, 'disabled');
  removeAttribute(mapFiltersFeatures, 'disabled');
};

//связывание значения поля адреса с расположением "главной" метки
const setCoordinates = (variables, evt) => {
  const placePoint = 5;
  variables.value = ` ${(evt.target.getLatLng().lat).toFixed(placePoint)} , ${(evt.target.getLatLng().lng).toFixed(placePoint)}`;
};

// валидация поля заголовка объявления
titleInputForm.addEventListener('input', (evt) => {
  const valueLength = evt.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    evt.setCustomValidity(`Ещё минимум ${(MIN_TITLE_LENGTH - valueLength)} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    evt.setCustomValidity(`Удалите лишние ' ${(valueLength - MAX_TITLE_LENGTH)} симв.`);
  } else {
    evt.setCustomValidity('');
  }
  evt.reportValidity();
});

//валидация поля "цена за ночь"
priceHousingInput.addEventListener('input', (evt) => {
  if (evt.value > MAX_PRICE_VALUE) {
    evt.setCustomValidity(`Максимум ${MAX_PRICE_VALUE}`);
  } else if (evt.value < MIN_PRICE_VALUE) {
    evt.setCustomValidity(`Отрицательные числа не допускаются. Минимум ${MIN_PRICE_VALUE}`);
  } else {
    evt.setCustomValidity('');
  }
  evt.reportValidity();
});

//формула для валидации поля "колчисетво комнат и количество мест"
const onRoomsNumberSelect = (peopleAmount) => {
  const seatingCapacityOptions = capacityElements.querySelectorAll('option');

  seatingCapacityOptions.forEach((option) => {
    option.disabled = true;
  });

  roomValues[peopleAmount].forEach((seatsAmount) => {
    seatingCapacityOptions.forEach((option) => {
      if (Number(option.value) === seatsAmount) {
        option.disabled = false;
        option.selected = true;
      }
    });
  });
};

// зависимость "колчисетво комнат и количество мест" по-умолчанию при открытии страницы
onRoomsNumberSelect(roomValues[1]);

//валидация поля "колчисетво комнат и количество мест"
roomNumberSelect.addEventListener('input', (evt) => {
  onRoomsNumberSelect(evt.target.value);
});

export {
  adForm,
  mapFilters,
  adFormFieldset,
  mapFiltersSelect,
  mapFiltersFeatures,
  makePageDeactivated,
  addressInput,
  setCoordinates
};
