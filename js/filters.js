import { renderUsersPictures, clearUsersPictures } from './thumbnails.js';
import { getData } from './api.js';
import { debounce } from './util.js';

const DEBOUNCE_DELAY = 500;

const imgFilters = document.querySelector('.img-filters');
const filterDefault = imgFilters.querySelector('#filter-default');
const filterRandom = imgFilters.querySelector('#filter-random');
const filterDiscussed = imgFilters.querySelector('#filter-discussed');
const filters = [filterDefault, filterRandom, filterDiscussed];

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

const getDiscussedPictures = (pictures) => pictures.slice().sort((firstPicture, secondPicture) => secondPicture.comments.length - firstPicture.comments.length);

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

const setActiveFilter = (activeFilter) => {
  filters.forEach((filter) => {
    filter.classList.remove('img-filters__button--active');
  });
  activeFilter.classList.add('img-filters__button--active');
};

filterDefault.addEventListener('click', () => {
  setActiveFilter(filterDefault);
  debounce(() => {
    clearUsersPictures();
    renderUsersPictures(usersPictures);
  }, DEBOUNCE_DELAY)();
});


filterRandom.addEventListener('click', () => {
  setActiveFilter(filterRandom);
  debounce(() => {
    clearUsersPictures();
    renderUsersPictures(getRandomPictures(usersPictures));
  }, DEBOUNCE_DELAY)();
});

filterDiscussed.addEventListener('click', () => {
  setActiveFilter(filterDiscussed);
  debounce(() => {
    clearUsersPictures();
    renderUsersPictures(getDiscussedPictures(usersPictures));
  }, DEBOUNCE_DELAY)();
});
