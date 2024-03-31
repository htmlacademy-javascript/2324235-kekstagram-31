import { imgPreview } from './uploadForm.js';

const effectLevelSlider = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
if (slider) {
  noUiSlider.create(slider, {
    start: [100],
    step: 0.1,
    range: {
      'min': [0],
      'max': [100]
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
        imgPreview.style.filter = `grayscale(${(value / 100).toFixed(1)})`;
        break;
      case 'sepia':
        imgPreview.style.filter = `sepia(${(value / 100).toFixed(1)})`;
        break;
      case 'marvin':
        imgPreview.style.filter = `invert(${value.toFixed(1)}%)`;
        break;
      case 'phobos':
        imgPreview.style.filter = `blur(${(value * 0.03).toFixed(1)}px)`;
        break;
      case 'heat':
        imgPreview.style.filter = `brightness(${(1 + (value * 0.02)).toFixed(1)})`;
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
    slider.noUiSlider.set(100);
  });

  window.addEventListener('load', () => {
    const currentEffect = document.querySelector('input[name="effect"]:checked').value;
    if (currentEffect === 'none') {
      effectLevelSlider.classList.add('hidden');
    }
  });
}
