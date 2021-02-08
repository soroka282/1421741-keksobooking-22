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

//функции для создания массива из 10 сгенерированных JS-объектов
const PHOTOS_HOTEL = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const TYPE_HOTEL = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const TITLE_DESCRIPTION = 'Милая, уютная квартира в центре Токио';
const DESCRIPTION = 'описание помещения';
const MIN_X = 35.65000;
const MAX_X = 35.70000;
const MIN_Y = 139.70000;
const MAX_Y = 139.80000;
const RANGE = 5;
const AVATAR_NUMBER_MIN = 1;
const AVATAR_NUMBER_MAX = 8
const ROOMS_MIN = 0;
const ROOMS_MAX = 10;
const PRICE_MIN = 0;
const PRICE_MAX = 10000;
const GUESTS_MIN = 0;
const GUESTS_MAX = 10;

const getRandomArrayElement = (element) => {
  return element[getRandomValue(0, element.length -1)];
};

const getRandomArray = (arr) => {
  const results = [];
  results.push(arr.slice(0, Math.ceil(Math.random() * arr.length)));
  return results;
};

const locationX = getValueFloatPoint(MIN_X, MAX_X, RANGE);
const locationY = getValueFloatPoint(MIN_Y, MAX_Y, RANGE);

const createCardAd = () => {
  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomValue(AVATAR_NUMBER_MIN, AVATAR_NUMBER_MAX) + '.png',
    },
    offer: {
      title: TITLE_DESCRIPTION,
      address: locationX + ', ' + locationY,
      price: getRandomValue(PRICE_MIN, PRICE_MAX) + '',
      type: getRandomArrayElement(TYPE_HOTEL),
      rooms: getRandomValue(ROOMS_MIN, ROOMS_MAX),
      guests: getRandomValue(GUESTS_MIN, GUESTS_MAX),
      checkin: getRandomArrayElement(TIME),
      checkout: getRandomArrayElement(TIME),
      features: getRandomArray(FEATURES),
      description: DESCRIPTION,
      photos: getRandomArray(PHOTOS_HOTEL),
    },
    location: {
      x: locationX,
      y: locationY,
    },
  }
}

const similarCardsAd = new Array(10).fill(null).map(() => createCardAd());
similarCardsAd;
