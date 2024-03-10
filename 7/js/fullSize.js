import { isEscapeKey, isEnterKey } from './util.js';

const userBigPicture = document.querySelector('.big-picture');
const userBigPictureCancel = document.querySelector('.big-picture__cancel');

const onBigPictureKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture() {
  userBigPicture.classList.remove('hidden');

  document.addEventListener('keydown', onBigPictureKeydown);
}

function closeBigPicture() {
  userBigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onBigPictureKeydown);
}

userBigPictureCancel.addEventListener('click', () => {
  closeBigPicture();
});

userBigPictureCancel.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeBigPicture();
  }
});

export { openBigPicture, closeBigPicture };
