const imgUploadForm = document.querySelector('.img-upload__form');
const inputFile = document.querySelector('.img-upload__input');
const formOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');
const hashtagInput = imgUploadForm.querySelector('.hashtag-input');
const commentInput = imgUploadForm.querySelector('.comment-input');
const effectLevelSlider = document.querySelector('.effect-level__slider');

inputFile.addEventListener('change', () => {
  formOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

cancelButton.addEventListener('click', () => {
  formOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    formOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});

cancelButton.addEventListener('click', () => {
  formOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  inputFile.value = '';
  const otherInputs = imgUploadForm.querySelectorAll('otherInput');
  otherInputs.forEach((input) => {
    input.value = '';
  });
});

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');

scaleControlSmaller.addEventListener('click', () => {
  let scaleValue = parseInt(scaleControlValue.value, 10);
  if (scaleValue > 25) {
    scaleValue -= 25;
    scaleControlValue.value = `${scaleValue} %`;
    imgPreview.style.transform = `scale(${scaleValue / 100})`;
  }
});

scaleControlBigger.addEventListener('click', () => {
  let scaleValue = parseInt(scaleControlValue.value, 10);
  if (scaleValue < 100) {
    scaleValue += 25;
    scaleControlValue.value = `${scaleValue} %`;
    imgPreview.style.transform = `scale(${scaleValue / 100})`;
  }
});

const pristine = new Pristine(imgUploadForm);

// const isValid = pristine.validate();


// pristine.addValidator(hashtagInput, function (value) {
//   const hashtags = value.split(' ');

//   for (let i = 0; i < hashtags.length; i++) {
//     const hashtag = hashtags[i];

//     if (!hashtag.startsWith('#')) {
//       return false;
//     }

//     if (hashtag.length > 20) {
//       return false;
//     }

//     if (/[^a-zа-яё0-9#]/i.test(hashtag)) {
//       return false;
//     }
//   }
//   return true;
// }, 'Неверный формат хэштега. Хэштег должен начинаться с символа #, содержать от 1 до 19 буквенно-цифровых символов и не содержать специальных символов или пробелов.', 2);

// pristine.addValidator(commentInput, function (value) {
//   if (value === '') {
//     return true;
//   }
//   return value.length <= 140;
// }, 'Комментарий не может быть длиннее 140 символов.', 2);

// commentInput.addEventListener('keydown', function (evt) {
//   if (evt.key === 'Escape') {
//     evt.stopPropagation();
//   }
// });

// pristine.addValidator(hashtagInput, (value) => {
//   const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
//   return hashtag.test(value);
// }, 'Неверный формат хэштега. Хэштег должен начинаться с символа # и содержать от 1 до 19 буквенно-цифровых символов.', 2);

// pristine.addValidator(commentInput, (value) =>
//   value.length <= 140, 'Комментарий не может быть длиннее 140 символов.', 2);

// commentInput.addEventListener('keydown', (evt) => {
//   if (evt.key === 'Escape') {
//     evt.stopPropagation();
//   }
// });

// imgUploadForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();

//   submitButton.disabled = true;

//   const isValid = pristine.validate();

//   if (isValid) {
//     imgUploadForm.reset();
//     scaleControlValue.value = '100%';
//     imgPreview.style.transform = 'scale(1)';
//     imgPreview.style.filter = 'none';
//     effectLevelSlider.noUiSlider.set(100);
//   } else {
//     // Если форма невалидна, показываем ошибки
//   }

//   submitButton.disabled = false;
// });

// // Получаем элементы управления эффектами
// const effectControls = document.querySelectorAll('.effects__radio');
// const effectLevelValue = document.querySelector('.effect-level__value');

// // Инициализируем слайдер noUiSlider
// noUiSlider.create(effectLevelSlider, {
//   start: 100,
//   range: {
//     min: 0,
//     max: 100
//   }
// });

// // Обработчик изменения значения слайдера
// effectLevelSlider.noUiSlider.on('update', (values, handle) => {
//   effectLevelValue.value = values[handle];
//   // Обновляем CSS-стиль изображения в зависимости от выбранного эффекта и значения слайдера
//   updateImageStyle();
// });

// // Обработчики переключения эффектов
// effectControls.forEach((control) => {
//   control.addEventListener('change', () => {
//     // Сбрасываем значение слайдера до начального значения (100%)
//     effectLevelSlider.noUiSlider.set(100);

//     // Обновляем CSS-стиль изображения в зависимости от выбранного эффекта
//     updateImageStyle();
//   });
// });

// function updateImageStyle() {
//   // Получаем выбранный эффект
//   const selectedEffect = document.querySelector('.effects__radio:checked').value;

//   // Получаем значение слайдера
//   const sliderValue = effectLevelSlider.noUiSlider.get();

//   // Обновляем CSS-стиль изображения в зависимости от выбранного эффекта
//   switch (selectedEffect) {
//     case 'chrome':
//       imgPreview.style.filter = `grayscale(${sliderValue / 100})`;
//       break;
//     case 'sepia':
//       imgPreview.style.filter = `sepia(${sliderValue / 100})`;
//       break;
//     case 'marvin':
//       imgPreview.style.filter = `invert(${sliderValue}%)`;
//       break;
//     case 'phobos':
//       imgPreview.style.filter = `blur(${sliderValue / 10}px)`;
//       break;
//     case 'heat':
//       imgPreview.style.filter = `brightness(${sliderValue / 33.3 + 1})`;
//       break;
//     case 'none':
//     default:
//       imgPreview.style.filter = 'none';
//       break;
//   }
// }

