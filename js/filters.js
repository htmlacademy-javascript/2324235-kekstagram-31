import { renderUsersPictures, clearUsersPictures } from './thumbnails.js';
import { getData } from './api.js';
import { debounce } from './util.js';

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

const filters = [filterDefault, filterRandom, filterDiscussed];

const setActiveFilter = (activeFilter) => {
  filters.forEach((filter) => {
    filter.classList.remove('img-filters__button--active');
  });
  activeFilter.classList.add('img-filters__button--active');
};

filterDefault.addEventListener('click', () => {
  clearUsersPictures();
  renderUsersPictures(usersPictures);
  setActiveFilter(filterDefault);
});

filterRandom.addEventListener('click', () => {
  clearUsersPictures();
  renderUsersPictures(getRandomPictures(usersPictures));
  setActiveFilter(filterRandom);
});

filterDiscussed.addEventListener('click', () => {
  clearUsersPictures();
  renderUsersPictures(getDiscussedPictures(usersPictures));
  setActiveFilter(filterDiscussed);
});

filterDefault.addEventListener('click', debounce(() => {
  clearUsersPictures();
  renderUsersPictures(usersPictures);
  setActiveFilter(filterDefault);
}, 500));

filterRandom.addEventListener('click', debounce(() => {
  clearUsersPictures();
  renderUsersPictures(getRandomPictures(usersPictures));
  setActiveFilter(filterRandom);
}, 500));

filterDiscussed.addEventListener('click', debounce(() => {
  clearUsersPictures();
  renderUsersPictures(getDiscussedPictures(usersPictures));
  setActiveFilter(filterDiscussed);
}, 500));
