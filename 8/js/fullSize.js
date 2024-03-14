import { isEscapeKey, isEnterKey } from './util.js';

const userBigPicture = document.querySelector('.big-picture');
const userBigPictureCancel = document.querySelector('.big-picture__cancel');
const likesCounter = userBigPicture.querySelector('.likes-count');
const fullPicture = userBigPicture.querySelector('.big-picture__img');
const pictureUrl = fullPicture.querySelector('img');
const commentsCount = userBigPicture.querySelector('.social__comment-total-count');
const socialCommentCount = userBigPicture.querySelector('.social__comment-count');
const description = userBigPicture.querySelector('.social__caption');
const commentsLoader = userBigPicture.querySelector('.comments-loader');
const socialComments = userBigPicture.querySelector('.social__comments');

let currentCommentsCount = 0;
const COMMENTS_LOAD_STEP = 5;

const onBigPictureKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function renderComments(comments) {
  socialComments.innerHTML = '';
  comments.slice(0, currentCommentsCount).forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');

    const avatarImg = document.createElement('img');
    avatarImg.classList.add('social__picture');
    avatarImg.src = comment.avatar;
    avatarImg.alt = comment.name;

    const textElement = document.createElement('p');
    textElement.classList.add('social__text');
    textElement.textContent = comment.message;

    commentElement.appendChild(avatarImg);
    commentElement.appendChild(textElement);

    socialComments.appendChild(commentElement);
  });
}

function openBigPicture(photo) {
  userBigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onBigPictureKeydown);

  likesCounter.textContent = photo.likes;
  pictureUrl.src = photo.url;
  commentsCount.textContent = photo.comments.length;
  socialCommentCount.textContent = `${currentCommentsCount}`;
  description.textContent = photo.description;

  commentsLoader.classList.remove('hidden');
  socialCommentCount.classList.remove('hidden');

  currentCommentsCount = COMMENTS_LOAD_STEP;

  renderComments(photo.comments);

  commentsLoader.addEventListener('click', () => {
    currentCommentsCount += COMMENTS_LOAD_STEP;
    renderComments(photo.comments);
    socialCommentCount.textContent = `${Math.min(currentCommentsCount, photo.comments.length)}`;
    if (currentCommentsCount >= photo.comments.length) {
      commentsLoader.classList.add('hidden');
    }
  });
}

function closeBigPicture() {
  userBigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
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
