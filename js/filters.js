import { renderUsersPictures, clearUsersPictures, getFetchDataAndRender, usersPictures } from './thumbnails.js';

const imgFilters = document.querySelector('.img-filters');
const filterDefault = imgFilters.querySelector('#filter-default');
const filterRandom = imgFilters.querySelector('#filter-random');
const filterDiscussed = imgFilters.querySelector('#filter-discussed');

const showImgFilters = () => {
  imgFilters.classList.remove('img-filters--inactive');
};

const getRandomPictures = (pictures) => {
  const randomPictures = pictures.slice();
  while (randomPictures.length > 10) {
    randomPictures.splice(Math.floor(Math.random() * randomPictures.length), 1);
  }
  return randomPictures;
};

const getDiscussedPictures = (pictures) => pictures.slice().sort((a, b) => b.comments.length - a.comments.length);

filterDefault.addEventListener('click', () => {
  clearUsersPictures();
  renderUsersPictures(usersPictures);
});

filterRandom.addEventListener('click', () => {
  clearUsersPictures();
  renderUsersPictures(getRandomPictures(usersPictures));
});

filterDiscussed.addEventListener('click', () => {
  clearUsersPictures();
  renderUsersPictures(getDiscussedPictures(usersPictures));
});

getFetchDataAndRender().then(() => {
  showImgFilters();
  renderUsersPictures(usersPictures);
});
