//const DEFAULT_TYPE_HOUSE = 'any';

const housingTypeFilter = document.querySelector('#housing-type');

// const getAdRank = (data) => {
//   let rank = 0;

//   if (data.offer.type === (housingTypeFilter.value || DEFAULT_TYPE_HOUSE)) {
//     rank += 2;
//   }
//   return rank;
// };

// const sortAds = (dataA, dataB) => {
//   const rankA = getAdRank(dataA);
//   const rankB = getAdRank(dataB);

//   return rankB - rankA;
// }

const setTypeHouse = (cb) => {
  housingTypeFilter.addEventListener('input', (evt) => {
    evt.target.value = housingTypeFilter.value;
    cb();
  });
};

export {
  //sortAds,
  setTypeHouse,
  housingTypeFilter
};
