import { renderUsersPictures, clearUsersPictures } from './thumbnails.js';
import { getData } from './api.js';

const imgFilters = document.querySelector('.img-filters');
const filterDefault = imgFilters.querySelector('#filter-default');
const filterRandom = imgFilters.querySelector('#filter-random');
const filterDiscussed = imgFilters.querySelector('#filter-discussed');

let usersPictures = null;

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

getData().then((data) => {
  usersPictures = data;
  renderUsersPictures(data);
  showImgFilters();
}).catch(() => {
  const errorTemplate = document.querySelector('#data-error').content.cloneNode(true);
  document.body.appendChild(errorTemplate);
  setTimeout(() => {
    document.body.removeChild(document.querySelector('.data-error'));
  }, 5000);
});
