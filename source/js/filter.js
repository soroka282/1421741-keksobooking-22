import {mapFilters} from './form.js';

const DEFAULT = 'any';
const PRICE_LOW = 10000;
const PRICE_HIGH = 50000;

const filterTypeHousing = document.querySelector('#housing-type');
const filterPriceHousing = document.querySelector('#housing-price');
const filterGuestsHousing = document.querySelector('#housing-guests');
const filterRoomsHousing = document.querySelector('#housing-rooms');
const filterFeatures = document.querySelector('#housing-features');
const filterFeature = filterFeatures.querySelectorAll('[name="features"]');

const checkType = (data) => {
  return filterTypeHousing.value === DEFAULT || data.offer.type === filterTypeHousing.value;
};

const checkPrice = (data) => {
  const PriceHousing = {
    any : DEFAULT,
    middle : data.offer.price >= PRICE_LOW && data.offer.price <= PRICE_HIGH,
    low : data.offer.price < PRICE_LOW,
    high : data.offer.price > PRICE_HIGH,
  }
  return PriceHousing[filterPriceHousing.value];
};

const checkRooms = (data) => {
  return filterRoomsHousing.value === DEFAULT || data.offer.rooms === Number(filterRoomsHousing.value);
};

const checkGuests = (data) => {
  return filterGuestsHousing.value === DEFAULT || data.offer.guests === Number(filterGuestsHousing.value);
};

const checkFeatures = (data) => {

  for (let i = 0; i < filterFeature.length; i++) {
    if (filterFeature[i].checked) {
      if (data.offer.features.indexOf(filterFeature[i].value) === -1) {
        return false
      }
    }
  }
  return true
};


const getFilteredAds = (data) => {
  return (
    checkType(data) &&
    checkPrice(data) &&
    checkRooms(data) &&
    checkGuests(data) &&
    checkFeatures(data)
  )
};

const setFilterChange = (cb) => {
  mapFilters.addEventListener('change', () => {
    cb();
  });
};

export {
  setFilterChange,
  getFilteredAds
};
