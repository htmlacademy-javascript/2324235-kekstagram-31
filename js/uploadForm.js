const imgUploadForm = document.querySelector('.img-upload__form');
const inputFile = document.querySelector('.img-upload__input');
const formOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');
const hashtagInput = imgUploadForm.querySelector('.text__hashtags');
const commentInput = imgUploadForm.querySelector('.text__description');
// const effectLevelSlider = document.querySelector('.effect-level__slider');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

inputFile.addEventListener('change', () => {
  formOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

cancelButton.addEventListener('click', () => {
  formOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

document.addEventListener('keydown', onEscKeyDown);

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

let message = 'Неверный формат хэштега.';
pristine.addValidator(hashtagInput, (value) => {
  if (!value) {
    return true;
  }

  const hashtags = value.split(' ');

  if (hashtags.length > 5) {
    message = 'Слишком много хэштегов. Максимум 5.';
    return false;
  }

  const lowerCaseHashtags = hashtags.map((hashtag) => hashtag.toLowerCase());
  const hashDuplicates = new Set(lowerCaseHashtags).size !== lowerCaseHashtags.length;

  if (hashDuplicates) {
    message = 'Хэштеги не должны повторяться.';
    return false;
  }

  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];
    if (hashtag === '#') {
      return false;
    }
    if (!hashtag.startsWith('#')) {
      message = 'Хэштег должен начинаться с символа #.';
      return false;
    }
    if (hashtag.length > 20) {
      message = 'Хэштег не может быть длиннее 20 символов.';
      return false;
    }

    if (/[^a-zа-яё0-9#]/i.test(hashtag)) {
      message = 'Хэштег может содержать только буквы и цифры.';
      return false;
    }
  }
  return true;
}, () => message, 2);

hashtagInput.addEventListener('focus', () => {
  document.removeEventListener('keydown', onEscKeyDown);
});

hashtagInput.addEventListener('blur', () => {
  document.addEventListener('keydown', onEscKeyDown);
});

function onEscKeyDown(evt) {
  if (evt.key === 'Escape' && !evt.target.closest('.text__hashtags')) {
    formOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
}

document.addEventListener('keydown', onEscKeyDown);

pristine.addValidator(commentInput, (value) => {
  if (value === '') {
    return true;
  }
  return value.length <= 140;
}, 'Комментарий не может быть длиннее 140 символов.', 2);

commentInput.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  submitButton.disabled = true;

  const isValid = pristine.validate();

  if (isValid) {
    scaleControlValue.value = '100%';
    imgPreview.style.transform = 'scale(1)';
    imgPreview.style.filter = 'none';
    // effectLevelSlider.noUiSlider.set(100);
    imgUploadForm.submit();
    imgUploadForm.reset();
  } else {
    // Если форма невалидна, показываем ошибки
  }
  submitButton.disabled = false;
});

// let slider = document.getElementById('slider');

// noUiSlider.create(slider, {
//   start: [20, 80],
//   connect: true,
//   range: {
//     'min': 0,
//     'max': 100
//   }
// });

// const effects = document.querySelectorAll('.effects__radio');
// const effectLevelValue = document.querySelector('.effect-level__value');
// const imgUploadPreview = document.querySelector('.img-upload__preview img');

// let currentEffect = 'none';
// let previousEffect = 'none';
// let previousEffectLevel = 100;

// effects.forEach((effect) => {
//   effect.addEventListener('change', (evt) => {
//     imgUploadPreview.classList.remove(`effects__preview--${currentEffect}`);
//     currentEffect = evt.target.value;
//     imgUploadPreview.classList.add(`effects__preview--${currentEffect}`);

//     if (currentEffect === 'none') {
//       imgUploadPreview.style.filter = 'none';
//       effectLevelSlider.style.visibility = 'hidden';
//       imgUploadPreview.classList.add(`effects__preview--${previousEffect}`);
//       effectLevelSlider.noUiSlider.set(previousEffectLevel);
//     } else {
//       effectLevelSlider.style.visibility = 'visible';
//       effectLevelSlider.noUiSlider.set(100);
//       previousEffect = currentEffect;
//       previousEffectLevel = effectLevelValue.value;
//     }
//   });
// });

// effectLevelSlider.noUiSlider.on('update', (_, handle, unencoded) => {
//   effectLevelValue.value = unencoded[handle];

//   switch (currentEffect) {
//     case 'chrome':
//       imgUploadPreview.style.filter = `grayscale(${unencoded[handle] / 100})`;
//       break;
//     case 'sepia':
//       imgUploadPreview.style.filter = `sepia(${unencoded[handle] / 100})`;
//       break;
//     case 'marvin':
//       imgUploadPreview.style.filter = `invert(${unencoded[handle]}%)`;
//       break;
//     case 'phobos':
//       imgUploadPreview.style.filter = `blur(${unencoded[handle] * 3 / 100}px)`;
//       break;
//     case 'heat':
//       imgUploadPreview.style.filter = `brightness(${1 + 2 * unencoded[handle] / 100})`;
//       break;
//     default:
//       imgUploadPreview.style.filter = 'none';
//   }
// });
