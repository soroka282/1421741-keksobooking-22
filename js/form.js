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
const AdFormFieldset = document.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersSelect = document.querySelectorAll('.map__filter');
const mapFiltersFeatures = document.querySelectorAll('.map__features');

//добавляем класс disabled форме и фильтру, если карта не активировалась
adForm.classList.add('ad-form--disabled');
mapFilters.classList.add('map__filters--disabled');


// функция, добавляющая атрибут disabled
const addAttribute = (variable) => {
  variable.forEach(i => i.setAttribute('disabled', ''));
}

// функция, удаляющая атрибут disabled
const removeAttribute = (variable) => {
  variable.forEach(i => i.removeAttribute('disabled'));
};

//добавляем атрибут disabled, если карта не активировалась
addAttribute(AdFormFieldset);
addAttribute(mapFiltersSelect);
addAttribute(mapFiltersFeatures);

export {
  adForm,
  mapFilters,
  AdFormFieldset,
  mapFiltersSelect,
  removeAttribute,
  mapFiltersFeatures
};
