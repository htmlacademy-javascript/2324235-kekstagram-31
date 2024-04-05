const getRandomInteger = (lowerLimit, upperLimit) => {
  const lower = Math.ceil(Math.min(lowerLimit, upperLimit));
  const upper = Math.floor(Math.max(lowerLimit, upperLimit));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const isEnterKey = (evt) => evt.key === 'Enter';

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export { getRandomInteger, getRandomArrayElement, isEscapeKey, isEnterKey, debounce };
