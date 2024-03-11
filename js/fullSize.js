import { isEscapeKey, isEnterKey } from './util.js';

const userBigPicture = document.querySelector('.big-picture');
const userBigPictureCancel = document.querySelector('.big-picture__cancel');
const likesCounter = userBigPicture.querySelector('.likes-count');
const fullPicture = document.querySelector('.big-picture__img');
const pictureUrl = fullPicture.querySelector('img');
const socialCommentTotalCount = document.querySelector('.social__comment-total-count');
const socialCommentCount = document.querySelector('.social__comment-count');
const description = document.querySelector('.social__caption');
const commentsLoader = document.querySelector('.comments-loader');


const onBigPictureKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture() {
  userBigPicture.classList.remove('hidden');
  // body.classList.add('modal-open');
  document.addEventListener('keydown', onBigPictureKeydown);
}

// const socialComments = document.querySelector('.social__comments');

// comments.forEach((comment) => {
//   const commentElement = document.createElement('li');
//   commentElement.classList.add('social__comment');

//   const avatarImg = document.createElement('img');
//   avatarImg.classList.add('social__picture');
//   avatarImg.src = comment.avatar;
//   avatarImg.alt = comment.name;

//   const textElement = document.createElement('p');
//   textElement.classList.add('social__text');
//   textElement.textContent = comment.text;

//   commentElement.appendChild(avatarImg);
//   commentElement.appendChild(textElement);

//   socialComments.appendChild(commentElement);
// });

function closeBigPicture() {
  userBigPicture.classList.add('hidden');
  // body.classList.remove('modal-open');
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

export { openBigPicture, closeBigPicture, userBigPicture };
