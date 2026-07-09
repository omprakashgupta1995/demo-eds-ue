import {
  div, h2, h3, button, form, input, label, span, img,
} from '../../scripts/dom-helpers.js';

export default function decorate(block) {
  const rows = [...block.children];

  let title = 'Find Your Ride';
  let productName = 'HF DELUXE';
  let imageCol = null;

  if (rows.length >= 3) {
    title = rows[0].textContent.trim();
    productName = rows[1].textContent.trim();
    imageCol = rows[2].querySelector('picture');
  } else if (rows.length === 1) {
    imageCol = rows[0].querySelector('picture');
  }

  // Clear block content
  block.textContent = '';

  const engineGroup = div(
    { class: 'find-ride__range-group' },
    h3({ class: 'find-ride__range-title' }, 'Engine'),
    div(
      { class: 'range-slider' },
      div({ class: 'range-slider__track', style: 'left: 20%; right: 20%;' }),
      input({
        type: 'range', class: 'range-slider__input range-slider__input--min', min: '50', max: '500', value: '97', step: '0.1',
      }),
      input({
        type: 'range', class: 'range-slider__input range-slider__input--max', min: '50', max: '500', value: '445', step: '0.1',
      }),
    ),
    div(
      { class: 'range-inputs' },
      div(
        { class: 'range-inputs__field' },
        label({ class: 'range-inputs__label' }, 'Min'),
        div(
          { class: 'range-inputs__wrapper' },
          input({
            type: 'number', class: 'range-inputs__input min-val', value: '97.2', step: '0.1',
          }),
          span({ class: 'range-inputs__suffix' }, 'cc'),
        ),
      ),
      div(
        { class: 'range-inputs__field' },
        label({ class: 'range-inputs__label' }, 'Max'),
        div(
          { class: 'range-inputs__wrapper' },
          input({
            type: 'number', class: 'range-inputs__input max-val', value: '445', step: '0.1',
          }),
          span({ class: 'range-inputs__suffix' }, 'cc'),
        ),
      ),
    ),
  );

  const priceGroup = div(
    { class: 'find-ride__range-group' },
    h3({ class: 'find-ride__range-title' }, 'Price'),
    div(
      { class: 'range-slider' },
      div({ class: 'range-slider__track', style: 'left: 10%; right: 40%;' }),
      input({
        type: 'range', class: 'range-slider__input range-slider__input--min', min: '30000', max: '500000', value: '50000', step: '1000',
      }),
      input({
        type: 'range', class: 'range-slider__input range-slider__input--max', min: '30000', max: '500000', value: '300000', step: '1000',
      }),
    ),
    div(
      { class: 'range-inputs' },
      div(
        { class: 'range-inputs__field' },
        label({ class: 'range-inputs__label' }, 'Min'),
        div(
          { class: 'range-inputs__wrapper' },
          span({ class: 'range-inputs__prefix' }, '₹'),
          input({ type: 'text', class: 'range-inputs__input min-val', value: '50,000' }),
        ),
      ),
      div(
        { class: 'range-inputs__field' },
        label({ class: 'range-inputs__label' }, 'Max'),
        div(
          { class: 'range-inputs__wrapper' },
          span({ class: 'range-inputs__prefix' }, '₹'),
          input({ type: 'text', class: 'range-inputs__input max-val', value: '3,00,000' }),
        ),
      ),
    ),
  );

  const actions = div(
    { class: 'find-ride__actions' },
    button({ type: 'button', class: 'find-ride__btn find-ride__btn--primary' }, 'REQUEST A CALLBACK'),
    div(
      { class: 'checkbox-group' },
      input({ type: 'checkbox', id: 'compareCheckbox', class: 'checkbox-group__input' }),
      label({ for: 'compareCheckbox', class: 'checkbox-group__label' }, 'ADD TO COMPARE'),
    ),
  );

  const controls = div(
    { class: 'find-ride__controls' },
    h2({ class: 'find-ride__title' }, title),
    div(
      { class: 'find-ride__tabs' },
      button({ class: 'find-ride__tab find-ride__tab--active', 'aria-selected': 'true' }, 'Motorcycles'),
      button({ class: 'find-ride__tab', 'aria-selected': 'false' }, 'Scooters'),
    ),
    form({ class: 'find-ride__form', id: 'findRideForm' }, engineGroup, priceGroup, actions),
  );

  const carousel = div({ class: 'find-ride__product-carousel' });

  if (imageCol) {
    imageCol.classList.add('find-ride__product-image');
    carousel.append(imageCol);
  } else {
    carousel.append(img({ src: 'https://via.placeholder.com/600x400/111111/ffffff?text=Product+Image', alt: 'Product', class: 'find-ride__product-image' }));
  }

  carousel.append(
    div(
      { class: 'carousel-indicators' },
      button({ class: 'carousel-indicators__arrow' }, '<'),
      div(
        { class: 'carousel-indicators__dots' },
        span({ class: 'dot dot--active' }),
        span({ class: 'dot' }),
        span({ class: 'dot' }),
        span({ class: 'dot' }),
      ),
      button({ class: 'carousel-indicators__arrow' }, '>'),
    ),
  );

  const display = div(
    { class: 'find-ride__display' },
    h2({ class: 'find-ride__product-title' }, productName),
    carousel,
  );

  const container = div({ class: 'find-ride__container' }, controls, display);
  block.append(container);

  // --- Initialize Dual Sliders logic ---
  const ranges = block.querySelectorAll('.find-ride__range-group');
  ranges.forEach((group) => {
    const minSlider = group.querySelector('.range-slider__input--min');
    const maxSlider = group.querySelector('.range-slider__input--max');
    const minInput = group.querySelector('.min-val');
    const maxInput = group.querySelector('.max-val');
    const track = group.querySelector('.range-slider__track');

    const updateTrack = () => {
      const minVal = parseFloat(minSlider.value);
      const maxVal = parseFloat(maxSlider.value);
      const minAllowed = parseFloat(minSlider.min);
      const maxAllowed = parseFloat(minSlider.max);
      const percent1 = ((minVal - minAllowed) / (maxAllowed - minAllowed)) * 100;
      const percent2 = ((maxVal - minAllowed) / (maxAllowed - minAllowed)) * 100;
      track.style.left = `${percent1}%`;
      track.style.right = `${100 - percent2}%`;
    };

    const onInput = (e) => {
      const minVal = parseFloat(minSlider.value);
      const maxVal = parseFloat(maxSlider.value);
      if (minVal > maxVal) {
        if (e.target === minSlider) minSlider.value = maxVal;
        else maxSlider.value = minVal;
      }
      if (minInput.type === 'number') {
        minInput.value = minSlider.value;
        maxInput.value = maxSlider.value;
      } else {
        minInput.value = Number(minSlider.value).toLocaleString('en-IN');
        maxInput.value = Number(maxSlider.value).toLocaleString('en-IN');
      }
      updateTrack();
    };

    minSlider.addEventListener('input', onInput);
    maxSlider.addEventListener('input', onInput);
    updateTrack();
  });
}
