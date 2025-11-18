import { div, nav, p } from '../../scripts/dom-helpers.js';

export default function decorate(block) {
  const rows = block.children;
  if (rows.length < 3) return;

  // 1: prepare bgWrapper (DOM write #1)
  const bgWrapper = rows[0].querySelector('div');
  if (!bgWrapper) return;
  bgWrapper.className += ' idfc-hero__bg-wrapper';

  // extract authored elements (breadcrumb, title, desc)
  const leftWrapper = rows[1].querySelector('div');
  if (!leftWrapper || leftWrapper.children.length < 3) return;

  const [breadcrumbEl, titleEl, descEl] = leftWrapper.children;

  // modify their className BEFORE re-inserting (not counted as DOM writes)
  breadcrumbEl.className += ' idfc-hero__breadcrumb-text';
  titleEl.className += ' idfc-hero__title';
  descEl.className += ' idfc-hero__description';

  const breadcrumbDOM = nav(
    { class: 'idfc-hero__breadcrumb' },
    breadcrumbEl
  );

  // build features in memory (0 DOM writes)
  const rightWrapper = rows[2].querySelector('div');
  if (!rightWrapper) return;

  const items = Array.from(rightWrapper.children).filter((el) => el.localName === 'p');
  const features = [];

  for (let i = 0; i < items.length; i += 2) {
    const picture = items[i].querySelector('picture');
    const textP = items[i + 1];
    if (picture && textP) {
      features.push({
        picture: picture.cloneNode(true),
        text: textP.textContent.trim(),
      });
    }
  }

  const featuresContainer = div(
    { class: 'idfc-hero__features' },
    ...features.map(({ picture, text }) =>
      div(
        { class: 'idfc-hero__feature' },
        div({ class: 'idfc-hero__feature-icon' }, picture),
        p({ class: 'idfc-hero__feature-text' }, text)
      )
    )
  );

  // build hero layout in memory
  const leftSection = div(
    { class: 'idfc-hero__section idfc-hero__section--left' },
    titleEl,
    descEl
  );

  const rightSection = div(
    { class: 'idfc-hero__section idfc-hero__section--right' },
    featuresContainer
  );

  const heroContent = div(
    { class: 'idfc-hero__content' },
    leftSection,
    rightSection
  );

  // 2: final atomic DOM write (replaceChildren → DOM write #2)
  block.replaceChildren(bgWrapper, breadcrumbDOM, heroContent);
}