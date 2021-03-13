import {
  addAttribute,
  removeAttribute,
  isEscEvent,
  setZIndexElem
} from './util.js';

import {getCoordPointDefault} from './main.js';
import {canvasBlock} from './genofmarkupad.js';
import {sendData} from './api.js';
import {adFormHeaderPreview, adFormPhoto, DEFAULT_IMG} from './previewimg.js'

const MinCostsHousing = {
  bungalow : 0,
  flat : 1000,
  house : 5000,
  palace : 10000,
};

const roomValues = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;
const MIN_PRICE_VALUE = 0;
const Z_INDEX_DEFAULT = 0;
const Z_INDEX_OVERLAY = -1;

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
const adFormReset = document.querySelector('.ad-form__reset');
const mainBlock = document.querySelector('main');

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

//находим шаблоны в разметке
const successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
const errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');
const errorButton = errorPopupTemplate.querySelector('.error__button');

//функция, сбрасывающая значения формы
const resetForm = () => {
  adForm.reset();
  mapFilters.reset();
  getCoordPointDefault();
  adFormHeaderPreview.src = DEFAULT_IMG;
  adFormPhoto.innerHTML = '';
};

//функция, удаляет атрибут при его наличии, либо снимает обработчик при его отсутствии
const delPopup = (attribute) => {
  document.querySelector(attribute);

  if(document.querySelector(attribute)) {
    document.querySelector(attribute).remove();
  } else {
    document.removeEventListener('click', () => {
      document.querySelector(attribute).remove();
    });
  }
};

//обработчик событий, сбрасывающий форму при клике на кнопку "сброс"
adFormReset.addEventListener('click', () => {
  resetForm();
});

//функция, показывающая "удачный" попап
const showSuccessPopup = () => {
  const elemClone = successPopupTemplate.cloneNode(true);
  mainBlock.append(elemClone);
  setZIndexElem(canvasBlock, Z_INDEX_OVERLAY);

  //обработчики событий скрытия "удачного" попапа
  document.addEventListener('click', () => {
    delPopup('.success');
    setZIndexElem(canvasBlock, Z_INDEX_DEFAULT);
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      delPopup('.success');
      setZIndexElem(canvasBlock, Z_INDEX_DEFAULT);
    }
  });
}

//функция, показывающая попап при ошибке
const showErrorPopup = () => {
  const elemClone = errorPopupTemplate.cloneNode(true);
  mainBlock.appendChild(elemClone);
  setZIndexElem(canvasBlock, Z_INDEX_OVERLAY);

  //обработчики событий скрытия попапа, показывающего ошибку
  document.addEventListener('click', () => {
    delPopup('.error');
    setZIndexElem(canvasBlock, Z_INDEX_DEFAULT);
  });

  errorButton.addEventListener('click', () => {
    delPopup('.error');
    setZIndexElem(canvasBlock, Z_INDEX_DEFAULT);
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault(evt);
      delPopup('.error');
      setZIndexElem(canvasBlock, Z_INDEX_DEFAULT);
    }
  });
};

const sendSuccessForm = () => {
  showSuccessPopup();
  resetForm();
};

//функция отправки формы на сервер
const setUserFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      sendSuccessForm,
      showErrorPopup,
      new FormData(evt.target),
    )
  });
};

setUserFormSubmit();

export {
  adForm,
  mapFilters,
  adFormFieldset,
  mapFiltersSelect,
  mapFiltersFeatures,
  makePageDeactivated,
  addressInput,
  setCoordinates,
  delPopup,
  mainBlock,
  Z_INDEX_DEFAULT,
  Z_INDEX_OVERLAY,
  showErrorPopup
};
