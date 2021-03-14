import {
  canvasBlock
} from './gen-of-markup-ad.js';

import {
  delPopup,
  Z_INDEX_DEFAULT,
  Z_INDEX_OVERLAY,
  mainBlock
} from './form.js';

import {setZIndexElem} from './util.js';

const ALERT_SHOW_TIME = 4000;

//функция, показывающая попап при ошибке загрузки сервера
const showErrorPopupServer = () => {
  const errorPopupServerTemplate = document.querySelector('#error-server').content.querySelector('.error-server');
  const elemClone = errorPopupServerTemplate.cloneNode(true);
  mainBlock.appendChild(elemClone);
  setZIndexElem(canvasBlock, Z_INDEX_OVERLAY);

  setTimeout(() => {
    delPopup('.error-server');
    setZIndexElem(canvasBlock, Z_INDEX_DEFAULT);
  }, ALERT_SHOW_TIME);
};

export {showErrorPopupServer};
