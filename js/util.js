//функция, связывающая тип жилья
const HouseTypes = {
  flat : 'Квартира',
  bungalow : 'Бунгало',
  house : 'Дом',
  palace : 'Дворец',
}

const showHousingMatches = (housing) => {
  return HouseTypes[housing];
};

// Функция для склонения слов;
const showDeclensionOfWord = (number, textForms) => {
  number = Math.abs(number) % 100;
  const num = number % 10;
  if (number > 10 && number < 20) { return textForms[2]; }
  if (num > 1 && num < 5) { return textForms[1]; }
  if (num == 1) { return textForms[0]; }
  return textForms[2];
};

// Функция, возвращающая случайное число
const getRandomValue = (min, max) => {
  if (min < 0 || max < 0 || min >= max) {
    throw new Error('Ошибка');
  }
  return Math.round(Math.random() * (max - min) + min);
};

// Функция, возвращающая случайное число с плавающей точкой;
const getValueFloatPoint = (min, max, placePoint) => {
  if (min < 0 || max < 0 || min >= max) {
    throw new Error('Ошибка');
  }
  let val = Math.random() * (max - min) + min;
  return val.toFixed(placePoint);
};

// функция, добавляющая атрибут disabled
const addAttribute = (variable, attribute) => {
  variable.forEach(i => i.setAttribute(attribute, ''));
}

// функция, удаляющая атрибут disabled
const removeAttribute = (variable, attribute) => {
  variable.forEach(i => i.removeAttribute(attribute));
};

export {
  getRandomValue,
  getValueFloatPoint,
  showDeclensionOfWord,
  showHousingMatches,
  addAttribute,
  removeAttribute
};
