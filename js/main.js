const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.', 'В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const NAMES = ['Мария', 'Дмитрий', 'Евгений', 'Елена', 'Александр', 'Алексей', 'Ирина', 'Иван', 'Оксана', 'Валентина', 'Дарья', 'Олег', 'Виктор'];

const DESCRIPTIONS = ['Супер', 'Круто', 'Пойдёт', 'Не очень', 'Так себе', 'Хорошо', 'Нормально', 'Могло быть и лучше', 'Огонь'];

const LIKES = {
  MIN: 15,
  MAX: 200,
};

const COMMENTS = {
  MIN: 0,
  MAX: 30,
};

const AVATARS = {
  MIN: 1,
  MAX: 6,
};

const CREATE_POST = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createCount = () => {
  let count = 0;
  return function () {
    count += 1;
    return count;
  };
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getCommentId = createCount();
const getId = createCount();
const getUrlPhoto = createCount();

const getObjectComments = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${getRandomInteger(AVATARS.MIN, AVATARS.MAX)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPost = () => ({
  id: getId(),
  url: `img/avatar-${getUrlPhoto()}.svg`,
  likes: getRandomInteger(LIKES.MIN, LIKES.MAX),
  comments: Array.from({length: getRandomInteger(COMMENTS.MIN, COMMENTS.MAX)}, getObjectComments),
  description: getRandomArrayElement(DESCRIPTIONS),
});

const posts = Array.from({length: CREATE_POST}, createPost);
posts.values();

