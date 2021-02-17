//Зависимость минимального значения и плейсхолдера поля «Цена за ночь» от типа жилья

const MIN_COST_HOUSING = {
  bungalow : 0,
  flat : 1000,
  house : 5000,
  palace : 10000,
};

const priceHousingInput = document.querySelector('#price');
const typeHousingInput = document.querySelector('#type');

typeHousingInput.addEventListener('input', function() {
  let value;

  if (typeHousingInput.value === 'bungalow') {
    value = MIN_COST_HOUSING.bungalow;
  }
  if (typeHousingInput.value === 'flat') {
    value = MIN_COST_HOUSING.flat;
  }
  if (typeHousingInput.value === 'house') {
    value = MIN_COST_HOUSING.house;
  }
  if (typeHousingInput.value === 'palace') {
    value = MIN_COST_HOUSING.palace;
  }
  priceHousingInput.setAttribute('min', value);
  priceHousingInput.setAttribute('placeholder', value);
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
