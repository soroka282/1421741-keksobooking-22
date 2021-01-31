// Функция, возвращающая случайное целое число;
const getRandomValue = (min, max) => {
  if (min < 0 || max < 0 || min >= max) {
    throw new Error('Ошибка');
  }
  return Math.round(Math.random() * (max - min) + min);
};

getRandomValue(0, 2);

// Функция, возвращающая случайное число с плавающей точкой;
const getValueFloatPoint = (min, max, placePoint) => {
  if (min < 0 || max < 0 || min >= max) {
    throw new Error('Ошибка');
  }
  let val = Math.random() * (max - min) + min;
  return val.toFixed(placePoint);
};

getValueFloatPoint(1, 3, 2);
