import { imgPreview } from './uploadForm.js';

const effectLevelSlider = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');

const format = {
  to: function (value) {
    if (Number.isInteger(value)) {
      return value.toFixed(0);
    }
    return value.toFixed(1);
  },
  from: function (value) {
    return parseFloat(value);
  },
};

const defaultSettings = {
  animate: false,
  start: 0,
  step: 0.1,
  connect: 'lower',
  range: {
    min: 0,
    max: 1
  },
};

const CONFIGS = {
  chrome: {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1,
    format
  },
  sepia: {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1,
    format
  },
  marvin: {
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1
  },
  phobos: {
    range: {
      min: 0,
      max: 3
    },
    start: 3,
    step: 0.1,
    format
  },
  heat: {
    range: {
      min: 1,
      max: 3
    },
    start: 3,
    step: 0.1,
    format
  },
  none: defaultSettings

};

document.querySelector('.effects__list').addEventListener('change', (evt) => {
  const currentEffect = document.querySelector('input[name="effect"]:checked').value;
  if (slider.noUiSlider) {
    slider.noUiSlider.destroy();
  }
  noUiSlider.create(slider, CONFIGS[currentEffect]);
  const effectLevelValue = document.querySelector('.effect-level__value');
  slider.noUiSlider.on('update', (values) => {
    const value = values[0];
    effectLevelValue.value = value;
    switch (currentEffect) {
      case 'chrome':
        imgPreview.style.filter = `grayscale(${value})`;
        break;
      case 'sepia':
        imgPreview.style.filter = `sepia(${value})`;
        break;
      case 'marvin':
        imgPreview.style.filter = `invert(${value}%)`;
        break;
      case 'phobos':
        effectLevelValue.value = value;
        imgPreview.style.filter = `blur(${value}px)`;
        break;
      case 'heat':
        imgPreview.style.filter = `brightness(${value})`;
        break;
      default:
        imgPreview.style.filter = 'none';
    }
  });


  if (evt.target.value === 'none') {
    effectLevelSlider.classList.add('hidden');
  } else {
    effectLevelSlider.classList.remove('hidden');
  }
  slider.noUiSlider.set(100);
});

window.addEventListener('load', () => {
  const currentEffect = document.querySelector('input[name="effect"]:checked').value;
  if (currentEffect === 'none') {
    effectLevelSlider.classList.add('hidden');
  }
});

