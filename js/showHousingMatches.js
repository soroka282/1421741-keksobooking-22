const showHousingMatches = (housing) => {
  if (housing == 'flat') {
    return 'Квартира'
  }
  if (housing == 'bungalow') {
    return 'Бунгало'
  }
  if (housing == 'house') {
    return 'Дом'
  }
  if (housing == 'palace') {
    return 'Дворец'
  }
};

export {showHousingMatches};
