import { sendData } from './api.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const inputFile = document.querySelector('.img-upload__input');
const formOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');
const hashtagInput = imgUploadForm.querySelector('.text__hashtags');
const commentInput = imgUploadForm.querySelector('.text__description');
const isEscapeKey = (evt) => evt.key === 'Escape';

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
    imgUploadForm.submit();
    imgUploadForm.reset();
    scaleControlValue.value = '100%';
    imgPreview.style.transform = 'scale(1)';
    imgPreview.style.filter = 'none';
  }
  submitButton.disabled = false;
});

// 11 ДЗ

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  submitButton.disabled = true;

  const formData = new FormData(imgUploadForm);

  sendData(formData)
    .then(() => {
      // Обработка успешной отправки данных
    })
    .catch(() => {
      // Обработка ошибки отправки данных
    })
    .finally(() => {
      submitButton.disabled = false;
    });
});

// Выбираем шаблон сообщения об успехе и создаем элемент сообщения
const successTemplate = document.querySelector('#success').content;
const successMessage = successTemplate.querySelector('.success').cloneNode(true);

// Функция для закрытия сообщения об успехе
function closeSuccessMessage() {
  successMessage.remove();
  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  successMessage.removeEventListener('click', onSuccessMessageClick);
}

// Обработчики событий для закрытия сообщения об успехе
function onSuccessMessageEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    closeSuccessMessage();
  }
}

function onSuccessMessageClick(evt) {
  if (!evt.target.closest('.success__inner')) {
    closeSuccessMessage();
  }
}

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  // Блокировка кнопки "Отправить" на время выполнения запроса
  submitButton.disabled = true;

  const formData = new FormData(imgUploadForm);

  sendData(formData)
    .then(() => {
      // Обработка успешной отправки данных
      // Закрываем форму и показываем сообщение об успешной отправке
      formOverlay.classList.add('hidden');
      document.body.classList.remove('modal-open');
      document.body.appendChild(successMessage);

      // Добавляем обработчики событий для закрытия сообщения об успехе
      document.addEventListener('keydown', onSuccessMessageEscKeydown);
      successMessage.addEventListener('click', onSuccessMessageClick);

      // Сбрасываем форму в исходное состояние
      imgUploadForm.reset();
      scaleControlValue.value = '100%';
      imgPreview.style.transform = 'scale(1)';
      imgPreview.style.filter = 'none';
    })
    .catch(() => {
      // Обработка ошибки отправки данных
    })
    .finally(() => {
      // В любом случае снова активируем кнопку "Отправить"
      submitButton.disabled = false;
    });
});

// Выбираем шаблон сообщения об ошибке и создаем элемент сообщения
const errorTemplate = document.querySelector('#error').content;
const errorMessage = errorTemplate.querySelector('.error').cloneNode(true);

// Функция для закрытия сообщения об ошибке
function closeErrorMessage() {
  errorMessage.remove();
  document.removeEventListener('keydown', onErrorMessageEscKeydown);
  errorMessage.removeEventListener('click', onErrorMessageClick);
}

// Обработчики событий для закрытия сообщения об ошибке
function onErrorMessageEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    closeErrorMessage();
  }
}

function onErrorMessageClick(evt) {
  if (!evt.target.closest('.error__inner')) {
    closeErrorMessage();
  }
}

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  // Блокировка кнопки "Отправить" на время выполнения запроса
  submitButton.disabled = true;

  const formData = new FormData(imgUploadForm);

  sendData(formData)
    .then(() => {
      // Обработка успешной отправки данных
      // Закрываем форму и показываем сообщение об успешной отправке
      formOverlay.classList.add('hidden');
      document.body.classList.remove('modal-open');
      document.body.appendChild(successMessage);

      // Добавляем обработчики событий для закрытия сообщения об успехе
      document.addEventListener('keydown', onSuccessMessageEscKeydown);
      successMessage.addEventListener('click', onSuccessMessageClick);

      // Сбрасываем форму в исходное состояние
      imgUploadForm.reset();
      scaleControlValue.value = '100%';
      imgPreview.style.transform = 'scale(1)';
      imgPreview.style.filter = 'none';
    })
    .catch(() => {
      // Обработка ошибки отправки данных
      // Показываем сообщение об ошибке
      document.body.appendChild(errorMessage);

      // Добавляем обработчики событий для закрытия сообщения об ошибке
      document.addEventListener('keydown', onErrorMessageEscKeydown);
      errorMessage.addEventListener('click', onErrorMessageClick);
    })
    .finally(() => {
      // В любом случае снова активируем кнопку "Отправить" после выполнения запроса
      submitButton.disabled = false;
    });
});

export { imgPreview };
