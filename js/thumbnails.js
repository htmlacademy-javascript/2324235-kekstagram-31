import { createPosts } from './data.js';

const templateUserPicture = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const usersPictures = createPosts();

const containerUsersPictures = document.querySelector('.pictures');

const usersPicturesFragment = document.createDocumentFragment();

usersPictures.forEach(({ url, description, likes, comments }) => {
  const userPicture = templateUserPicture.cloneNode(true);
  userPicture.querySelector('.picture__img').src = url;
  userPicture.querySelector('.picture__img').alt = description;
  userPicture.querySelector('.picture__likes').textContent = likes;
  userPicture.querySelector('.picture__comments').textContent = comments.length;
  usersPicturesFragment.appendChild(userPicture);
});

containerUsersPictures.appendChild(usersPicturesFragment);
