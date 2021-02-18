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
