import { isEscapeKey, isEnterKey, isBodyKey } from './util.js';

const userBigPicture = document.querySelector('.big-picture');
const userBigPictureCancel = document.querySelector('.big-picture__cancel');
const likesCounter = userBigPicture.querySelector('.likes-count');
const fullPicture = userBigPicture.querySelector('.big-picture__img');
const pictureUrl = fullPicture.querySelector('img');
const commentsCount = userBigPicture.querySelector('.social__comment-total-count');
const socialCommentCount = userBigPicture.querySelector('.social__comment-count');
const description = userBigPicture.querySelector('.social__caption');
const comments = userBigPicture.querySelector('.comments-loader');
const socialComments = userBigPicture.querySelector('.social__comments');
const body = document.querySelector('body');

const onBigPictureKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture(photo) {
  userBigPicture.classList.remove('hidden');
  // body.classList.add('modal-open');
  document.addEventListener('keydown', onBigPictureKeydown);

  likesCounter.textContent = photo.likes;
  pictureUrl.src = photo.url;
  commentsCount.textContent = photo.comments.length;
  socialCommentCount.textContent = `${photo.comments.length}`;
  description.textContent = photo.description;

  if (Array.isArray(comments)) {
    comments.forEach((comment) => {
      const commentElement = document.createElement('li');
      commentElement.classList.add('social__comment');

      const avatarImg = document.createElement('img');
      avatarImg.classList.add('social__picture');
      avatarImg.src = comment.avatar;
      avatarImg.alt = comment.name;

      const textElement = document.createElement('p');
      textElement.classList.add('social__text');
      textElement.textContent = comment.text;

      commentElement.appendChild(avatarImg);
      commentElement.appendChild(textElement);

      socialComments.appendChild(commentElement);
    });
  }
}

function closeBigPicture() {
  userBigPicture.classList.add('hidden');
  // body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureKeydown);
}

userBigPictureCancel.addEventListener('click', () => {
  closeBigPicture();
});

body.addEventListener('click', (evt) => {
  if (isBodyKey(evt)) {
    closeBigPicture();
  }
});

userBigPictureCancel.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeBigPicture();
  }
});

export { openBigPicture, closeBigPicture, userBigPicture };
