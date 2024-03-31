import { imgPreview } from './uploadForm.js';

const START_VALUE = 100;
const STEP_VALUE = 0.1;
const MIN_RANGE = 0;
const MAX_RANGE = 100;
const BLUR_SCALE_FACTOR = 0.03;
const BRIGHTNESS_SCALE_FACTOR = 0.02;

const effectLevelSlider = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
if (slider) {
  noUiSlider.create(slider, {
    start: [START_VALUE],
    step: STEP_VALUE,
    range: {
      'min': [MIN_RANGE],
      'max': [MAX_RANGE]
    },
    format: {
      to: function (value) {
        return Number(value).toFixed(1);
      },
      from: function (value) {
        return Number(value);
      }
    }
  });

  slider.noUiSlider.on('update', (values, handle) => {
    const value = Number(values[handle]);
    const effectLevelValue = document.querySelector('.effect-level__value');
    effectLevelValue.value = value.toFixed(1);

    const currentEffect = document.querySelector('input[name="effect"]:checked').value;

    switch (currentEffect) {
      case 'chrome':
        imgPreview.style.filter = `grayscale(${(value / MAX_RANGE).toFixed(1)})`;
        break;
      case 'sepia':
        imgPreview.style.filter = `sepia(${(value / MAX_RANGE).toFixed(1)})`;
        break;
      case 'marvin':
        imgPreview.style.filter = `invert(${value.toFixed(1)}%)`;
        break;
      case 'phobos':
        imgPreview.style.filter = `blur(${(value * BLUR_SCALE_FACTOR).toFixed(1)}px)`;
        break;
      case 'heat':
        imgPreview.style.filter = `brightness(${(1 + (value * BRIGHTNESS_SCALE_FACTOR)).toFixed(1)})`;
        break;
      default:
        imgPreview.style.filter = 'none';
    }
  });

  document.querySelector('.effects__list').addEventListener('change', (evt) => {
    if (evt.target.value === 'none') {
      effectLevelSlider.classList.add('hidden');
    } else {
      effectLevelSlider.classList.remove('hidden');
    }
    slider.noUiSlider.set(START_VALUE);
  });

  window.addEventListener('load', () => {
    const currentEffect = document.querySelector('input[name="effect"]:checked').value;
    if (currentEffect === 'none') {
      effectLevelSlider.classList.add('hidden');
    }
  });
}
