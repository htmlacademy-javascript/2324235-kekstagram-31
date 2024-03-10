import { isEscapeKey, isEnterKey } from './util.js';
import { renderUsersPictures, clearUsersPictures } from './thumbnails.js';

const userBigPicture = document.querySelector('.big-picture');
const userBigPictureOpen = document.querySelector('.big-picture__preview');
const userBigPictureCancel = document.querySelector('.big-picture__cancel');

const onBigPictureKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture() {
  userBigPicture.classList.remove('hidden');
  renderUsersPictures();

  document.removeEventListener('keydown', onBigPictureKeydown);
}

function closeBigPicture() {
  userBigPicture.classList.add('hidden');
  clearUsersPictures();

  document.removeEventListener('keydown', onBigPictureKeydown);
}

userBigPictureOpen.addEventListener('click', () => {
  openBigPicture();
});

userBigPictureOpen.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    openBigPicture();
  }
});

userBigPictureCancel.addEventListener('click', () => {
  closeBigPicture();
});

userBigPictureCancel.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeBigPicture();
  }
});

// export { openBigPicture, closeBigPicture };
