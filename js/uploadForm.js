import { sendData } from './api.js';

const SCALE_MAX = 100;
const SCALE_MIN = 10;
const SCALE_STEP = 25;
const MAX_HASHTAGS = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const imgUploadForm = document.querySelector('.img-upload__form');
const inputFile = document.querySelector('.img-upload__input');
const formOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');
const hashtagInput = imgUploadForm.querySelector('.text__hashtags');
const commentInput = imgUploadForm.querySelector('.text__description');
const scale = document.querySelector('.scale__control--value');

const slider = document.querySelector('.effect-level__slider');
const imgPreview = document.querySelector('.img-upload__preview img');
const effect = document.querySelector('.img-upload__effect-level');

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');

const successTemplate = document.querySelector('#success').content;
const successMessage = successTemplate.querySelector('.success').cloneNode(true);
const errorTemplate = document.querySelector('#error').content;
const errorMessage = errorTemplate.querySelector('.error').cloneNode(true);

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const onEscKeyDown = (evt) => {
  if (evt.key === 'Escape' && !evt.target.closest('.text__hashtags')) {
    formOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
};

const resetFormHandler = () => {
  formOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
  imgPreview.style.transform = 'scale(1)';
  slider.noUiSlider.set(SCALE_MAX);
  imgPreview.style.filter = 'none';
  effect.classList.add('hidden');
  scale.value = `${SCALE_MAX}%`;
  imgPreview.style.transform = '';
  effect.classList.add('hidden');
  inputFile.value = '';
  imgUploadForm.reset();
};

cancelButton.addEventListener('click', () => {
  formOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetFormHandler();
});

scaleControlSmaller.addEventListener('click', () => {
  let scaleValue = parseInt(scaleControlValue.value, SCALE_MIN);
  if (scaleValue > SCALE_STEP) {
    scaleValue -= SCALE_STEP;
    scaleControlValue.value = `${scaleValue} %`;
    imgPreview.style.transform = `scale(${scaleValue / SCALE_MAX})`;
  }
});

scaleControlBigger.addEventListener('click', () => {
  let scaleValue = parseInt(scaleControlValue.value, SCALE_MIN);
  if (scaleValue < SCALE_MAX) {
    scaleValue += SCALE_STEP;
    scaleControlValue.value = `${scaleValue} %`;
    imgPreview.style.transform = `scale(${scaleValue / SCALE_MAX})`;
  }
});

let hashtagErrorMessage = 'Неверный формат хэштега.';
pristine.addValidator(hashtagInput, (value) => {
  if (!value) {
    return true;
  }

  const hashtags = value.split(' ');

  if (hashtags.length > MAX_HASHTAGS) {
    hashtagErrorMessage = 'Слишком много хэштегов. Максимум 5.';
    return false;
  }

  const lowerCaseHashtags = hashtags.map((hashtag) => hashtag.toLowerCase());
  const hashDuplicates = new Set(lowerCaseHashtags).size !== lowerCaseHashtags.length;

  if (hashDuplicates) {
    hashtagErrorMessage = 'Хэштеги не должны повторяться.';
    return false;
  }

  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];
    if (hashtag === '#') {
      return false;
    }
    if (!hashtag.startsWith('#')) {
      hashtagErrorMessage = 'Хэштег должен начинаться с символа #.';
      return false;
    }

    if (hashtag.length > MAX_HASHTAG_LENGTH) {
      hashtagErrorMessage = 'Хэштег не может быть длиннее 20 символов.';
      return false;
    }

    if (/[^a-zа-яё0-9#]/i.test(hashtag)) {
      hashtagErrorMessage = 'Хэштег может содержать только буквы и цифры.';
      return false;
    }
  }
  return true;
}, () => hashtagErrorMessage, 2);


hashtagInput.addEventListener('focus', () => {
  document.removeEventListener('keydown', onEscKeyDown);
});

hashtagInput.addEventListener('blur', () => {
  document.addEventListener('keydown', onEscKeyDown);
});


document.addEventListener('keydown', onEscKeyDown);

pristine.addValidator(commentInput, (value) => {
  if (value === '') {
    return true;
  }

  return value.length <= MAX_COMMENT_LENGTH;
}, 'Комментарий не может быть длиннее 140 символов.', 2);

commentInput.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

const isEscapeKey = (evt) => evt.key === 'Escape';

const onCloseMessage = (message, escKeydownHandler, clickHandler) => {
  message.remove();
  document.removeEventListener('keydown', escKeydownHandler);
  message.removeEventListener('click', clickHandler);
};

const onMessageEscKeydown = (evt, closeHandler) => {
  if (isEscapeKey(evt)) {
    closeHandler();
  }
};

const onMessageClick = (evt, closeHandler) => {
  if (!evt.target.closest('.success__inner') || evt.target.closest('.success__button')) {
    closeHandler();
  }
};

imgUploadForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  evt.preventDefault();
  if (!isValid) {
    return;
  }
  submitButton.disabled = true;
  const formData = new FormData(imgUploadForm);
  sendData(formData)
    .then(() => {
      formOverlay.classList.add('hidden');
      document.body.classList.remove('modal-open');
      document.body.appendChild(successMessage);
      document.addEventListener('keydown', (evtKeydown) => onMessageEscKeydown(evtKeydown, () => onCloseMessage(successMessage, onMessageEscKeydown, onMessageClick)));
      successMessage.addEventListener('click', (evtClick) => onMessageClick(evtClick, () => onCloseMessage(successMessage, onMessageEscKeydown, onMessageClick)));
      resetFormHandler();
    })

    .catch(() => {
      document.body.appendChild(errorMessage);
      document.addEventListener('keydown', (evtKeydown) => onMessageEscKeydown(evtKeydown, () => onCloseMessage(errorMessage, onMessageEscKeydown, onMessageClick)));

      const errorButton = errorMessage.querySelector('.error__button');
      errorButton.addEventListener('click', () => {
        onCloseMessage(errorMessage, onMessageEscKeydown, onMessageClick);
      });
      errorMessage.addEventListener('click', (evtClick) => {
        if (evtClick.target === errorMessage) {
          onCloseMessage(errorMessage, onMessageEscKeydown, onMessageClick);
        }
      });

      const errorText = errorMessage.querySelector('.error__inner');
      errorText.addEventListener('click', (evtClick) => {
        evtClick.stopPropagation();
      });
    })
    .finally(() => {
      submitButton.disabled = false;
    });
});

inputFile.addEventListener('change', () => {
  formOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  const file = inputFile.files[0];
  const fileName = file.name.toLowerCase();
  const reader = new FileReader();

  reader.onloadend = function () {
    imgPreview.src = reader.result;
  };

  if (file && FILE_TYPES.some((it) => fileName.endsWith(it))) {
    reader.readAsDataURL(file);
    submitButton.disabled = false;
  } else {
    imgPreview.src = '';
    submitButton.disabled = true;
  }
});

const errorMessageElement = document.createElement('div');
errorMessageElement.classList.add('error-message');
errorMessageElement.textContent = 'Произошла ошибка при загрузке фотографии. Пожалуйста, попробуйте еще раз.';

errorMessageElement.style.position = 'fixed';
errorMessageElement.style.top = '0';
errorMessageElement.style.left = '0';
errorMessageElement.style.width = '100%';
errorMessageElement.style.padding = '10px';
errorMessageElement.style.backgroundColor = 'red';
errorMessageElement.style.color = 'white';
errorMessageElement.style.textAlign = 'center';
errorMessageElement.style.zIndex = '1000';
errorMessageElement.style.display = 'none';

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(imgUploadForm);

  sendData(formData)
    .then(() => {
      errorMessageElement.style.display = 'none';
    })

    .catch(() => {
      errorMessageElement.style.display = 'block';
      setTimeout(() => {
        errorMessageElement.style.display = 'none';
      }, 3000);

    });
});

document.body.prepend(errorMessageElement);

export { imgPreview };
