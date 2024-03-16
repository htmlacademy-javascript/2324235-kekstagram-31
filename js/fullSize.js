import { isEscapeKey, isEnterKey } from './util.js';

const userBigPicture = document.querySelector('.big-picture');
const userBigPictureCancel = document.querySelector('.big-picture__cancel');
const likesCounter = userBigPicture.querySelector('.likes-count');
const fullPicture = userBigPicture.querySelector('.big-picture__img');
const pictureUrl = fullPicture.querySelector('img');
const commentsCount = userBigPicture.querySelector('.social__comment-total-count');
const socialCommentCount = userBigPicture.querySelector('.social__comment-shown-count');
const description = userBigPicture.querySelector('.social__caption');
const commentsLoader = userBigPicture.querySelector('.comments-loader');
const socialComments = userBigPicture.querySelector('.social__comments');
let currentOpenPhoto = null;
let currentCommentsCount = 0;
const COMMENTS_LOAD_STEP = 5;

const onBigPictureKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const updateAndRenderComments = () => {
  currentCommentsCount += COMMENTS_LOAD_STEP;
  renderComments(currentOpenPhoto.comments);
  socialCommentCount.textContent = Math.min(currentCommentsCount, currentOpenPhoto.comments.length);
  if (currentCommentsCount >= currentOpenPhoto.comments.length) {
    commentsLoader.classList.add('hidden');
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

    commentElement.append(avatarImg);
    commentElement.append(textElement);

    socialComments.append(commentElement);
  });
}

function openBigPicture(photo) {
  userBigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onBigPictureKeydown);
  currentOpenPhoto = photo;

  likesCounter.textContent = photo.likes;
  pictureUrl.src = photo.url;
  commentsCount.textContent = photo.comments.length;
  socialCommentCount.textContent = photo.comments.length < 5 ? photo.comments.length : 5;

  setTimeout(() => {
    if (photo.comments.length <= 5) {
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');
    }
  }, 0);

  description.textContent = photo.description;

  commentsLoader.classList.remove('hidden');
  socialCommentCount.classList.remove('hidden');

  currentCommentsCount = COMMENTS_LOAD_STEP;

  renderComments(photo.comments);

  commentsLoader.addEventListener('click', updateAndRenderComments);
}

function closeBigPicture() {
  userBigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureKeydown);
  commentsLoader.removeEventListener('click', updateAndRenderComments);
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
