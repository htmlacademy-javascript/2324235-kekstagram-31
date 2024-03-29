import { getData } from './api.js';
import { openBigPicture } from './fullSize.js';

const templateUserPicture = document.querySelector('#picture')
  .content
  .querySelector('.picture');

let usersPictures = [];

const containerUsersPictures = document.querySelector('.pictures');

const renderUsersPictures = (pictures) => {
  const usersPicturesFragment = document.createDocumentFragment();

  pictures.forEach(({ url, description, likes, comments, id }) => {
    const userPicture = templateUserPicture.cloneNode(true);
    userPicture.querySelector('.picture__img').src = url;
    userPicture.querySelector('.picture__img').alt = description;
    userPicture.querySelector('.picture__likes').textContent = likes;
    userPicture.querySelector('.picture__comments').textContent = comments.length;
    userPicture.dataset.id = id;
    usersPicturesFragment.append(userPicture);
    userPicture.addEventListener('click', (event) => {
      const currentPicture = usersPictures.find((photo) => event.currentTarget.dataset.id === photo.id.toString());
      openBigPicture(currentPicture);
    });
  });
  containerUsersPictures.append(usersPicturesFragment);
};

const clearUsersPictures = () => {
  containerUsersPictures.innerHTML = '';
};

function getFetchDataAndRender() {
  getData().then((data) => {
    usersPictures = data;
    renderUsersPictures(usersPictures);
  }).catch(() => {
    const errorTemplate = document.querySelector('#data-error').content.cloneNode(true);
    document.body.appendChild(errorTemplate);
    setTimeout(() => {
      document.body.removeChild(document.querySelector('.data-error'));
    }, 5000);
  });
}

export { renderUsersPictures, clearUsersPictures, getFetchDataAndRender };
