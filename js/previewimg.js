import {showErrorPopup} from './form.js';

const adFormField = document.querySelector('.ad-form__field input[type=file]');
const adFormHeaderPreview = document.querySelector('.ad-form-header__preview img');
const adFormUpload = document.querySelector('.ad-form__upload input[type="file"]');
const adFormPhoto = document.querySelector('.ad-form__photo');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_IMG = 'img/muffin-grey.svg';

//функция, показывающая превью аватара
const showAvatarPreview = (inputFormField, filePreview, compareElements) => {
  inputFormField.addEventListener('change', () => {
    const file = inputFormField.files[0];
    const fileName = file.name.toLowerCase();

    const matches = compareElements.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        filePreview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
    else {showErrorPopup()}
  });
};

showAvatarPreview(adFormField, adFormHeaderPreview, FILE_TYPES);

//функция, показывающая превью изображений галереи
const showImgPreview = (inputFormField, filePreview, compareElements) => {
  inputFormField.addEventListener('change', () => {
    const file = inputFormField.files[0];
    const fileName = file.name.toLowerCase();

    const matches = compareElements.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();
      filePreview.innerHTML = '';

      const img = document.createElement('img');
      reader.addEventListener('load', () => {

        const widthImg = '70';
        const hightImg = '70';
        const altImg = 'Фото жилья';
        const bgColorfilePreview = 'inherit';

        filePreview.style.backgroundColor = bgColorfilePreview;
        img.src = reader.result;
        img.alt = altImg;
        img.width = widthImg;
        img.hight = hightImg;
        filePreview.appendChild(img);
      });

      reader.readAsDataURL(file);
    }
    else {showErrorPopup()}
  });
};

showImgPreview(adFormUpload, adFormPhoto, FILE_TYPES);

export {adFormHeaderPreview, adFormPhoto, DEFAULT_IMG}
