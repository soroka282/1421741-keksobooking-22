import {addAttribute, removeAttribute} from './util.js';

//Зависимость минимального значения и плейсхолдера поля «Цена за ночь» от типа жилья
const MinCostsHousing = {
  bungalow : 0,
  flat : 1000,
  house : 5000,
  palace : 10000,
};

const priceHousingInput = document.querySelector('#price');
const typeHousingInput = document.querySelector('#type');

typeHousingInput.addEventListener('input', function() {
  priceHousingInput.setAttribute('min', MinCostsHousing[typeHousingInput.value]);
  priceHousingInput.setAttribute('placeholder', MinCostsHousing[typeHousingInput.value]);
});

//Обработчики событий «Время заезда», «Время выезда»
//выбор опции одного поля автоматически изменят значение другого
const timeInInput = document.querySelector('#timein');
const timeOutInput = document.querySelector('#timeout');

timeInInput.addEventListener('input', function() {
  timeOutInput.selectedIndex = timeInInput.selectedIndex ;
});

timeOutInput.addEventListener('input', function() {
  timeInInput.selectedIndex = timeOutInput.selectedIndex ;
});

const adForm = document.querySelector('.ad-form');
const adFormFieldset = document.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersSelect = document.querySelectorAll('.map__filter');
const mapFiltersFeatures = document.querySelectorAll('.map__features');

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
const addressInput = document.querySelector('#address');
const setCoordinates = (variables, evt) => {
  const placePoint = 5;
  variables.value = ` ${(evt.target.getLatLng().lat).toFixed(placePoint)} , ${(evt.target.getLatLng().lng).toFixed(placePoint)}`;
};

// валидация поля заголовка объявления
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const titleInputForm = document.querySelector('#title');

titleInputForm.addEventListener('input', () => {
  const valueLength = titleInputForm.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInputForm.setCustomValidity(`Ещё минимум ${(MIN_TITLE_LENGTH - valueLength)} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInputForm.setCustomValidity(`Удалите лишние ' ${(valueLength - MAX_TITLE_LENGTH)} симв.`);
  } else {
    titleInputForm.setCustomValidity('');
  }
  titleInputForm.reportValidity();
});

//валидация поля "цена за ночь"
const MAX_PRICE_VALUE = 1000000;
const MIN_PRICE_VALUE = 0;

priceHousingInput.addEventListener('input', () => {
  if (priceHousingInput.value > MAX_PRICE_VALUE) {
    priceHousingInput.setCustomValidity(`Максимум ${MAX_PRICE_VALUE}`);
  } else if (priceHousingInput.value < MIN_PRICE_VALUE) {
    priceHousingInput.setCustomValidity(`Отрицательные числа не допускаются. Минимум ${MIN_PRICE_VALUE}`);
  } else {
    priceHousingInput.setCustomValidity('');
  }
  priceHousingInput.reportValidity();
});

//валидация поля "колчисетво комнат и количество мест"
const CapacityOptionValue = {
  threeGuest : 3,
  twoGuest : 2,
  oneGuest : 1,
  notGuest : 0,
}
const RoomNumberValue = {
  oneRoom : 1,
  twoRoom : 2,
  threeRoom : 3,
  hundredRoom : 100,
}

const roomNumberSelect = document.querySelector('#room_number');
const capacitySelect = document.querySelector('#capacity');

//функция для добавления атрибута disabled option
const addAttributeDisabled = (attribute, selectElem) => {
  attribute[selectElem].setAttribute('disabled', '');
};

//функция для удаления атрибута disabled option
const removeAttributeDisabled = (attribute, selectElem) => {
  attribute[selectElem].removeAttribute('disabled');
};

//значение по умолчанию при открытии страницы для выбранных селекторов
if (roomNumberSelect.value == RoomNumberValue.oneRoom) {
  capacitySelect.value = roomNumberSelect.value;
  addAttributeDisabled(capacitySelect, CapacityOptionValue.notGuest);
  addAttributeDisabled(capacitySelect, CapacityOptionValue.oneGuest);
  addAttributeDisabled(capacitySelect, CapacityOptionValue.threeGuest);
  removeAttributeDisabled(capacitySelect, CapacityOptionValue.twoGuest);
}

//валидация поля в зависимости от выбранных параметров
roomNumberSelect.addEventListener('input', () => {

  if (roomNumberSelect.value == RoomNumberValue.hundredRoom) {
    capacitySelect.selectedIndex = roomNumberSelect.selectedIndex;
    addAttributeDisabled(capacitySelect, CapacityOptionValue.oneGuest);
    addAttributeDisabled(capacitySelect, CapacityOptionValue.twoGuest);
    addAttributeDisabled(capacitySelect, CapacityOptionValue.notGuest);
    removeAttributeDisabled(capacitySelect, CapacityOptionValue.threeGuest);

  } else if (roomNumberSelect.value == RoomNumberValue.oneRoom) {
    capacitySelect.value = roomNumberSelect.value;
    addAttributeDisabled(capacitySelect, CapacityOptionValue.notGuest);
    addAttributeDisabled(capacitySelect, CapacityOptionValue.oneGuest);
    addAttributeDisabled(capacitySelect, CapacityOptionValue.threeGuest);
    removeAttributeDisabled(capacitySelect, CapacityOptionValue.twoGuest);

  } else if (roomNumberSelect.value == RoomNumberValue.twoRoom) {
    capacitySelect.value = roomNumberSelect.value;
    addAttributeDisabled(capacitySelect, CapacityOptionValue.notGuest);
    addAttributeDisabled(capacitySelect, CapacityOptionValue.threeGuest);
    removeAttributeDisabled(capacitySelect, CapacityOptionValue.twoGuest);
    removeAttributeDisabled(capacitySelect, CapacityOptionValue.oneGuest);

  } else if (roomNumberSelect.value == RoomNumberValue.threeRoom) {
    capacitySelect.value = roomNumberSelect.value;
    addAttributeDisabled(capacitySelect, CapacityOptionValue.threeGuest);
    removeAttributeDisabled(capacitySelect, CapacityOptionValue.twoGuest);
    removeAttributeDisabled(capacitySelect, CapacityOptionValue.oneGuest);
    removeAttributeDisabled(capacitySelect, CapacityOptionValue.notGuest);
  }
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
