export default function decorate(block) {
  const container = block.querySelector(':scope > div > div:nth-child(2)');
  if (!container) return;

  const paragraphs = [...container.querySelectorAll('p')];

  // Add main content wrapper
  container.classList.add('demo1-content');

  const leftContent = document.createElement('div');
  leftContent.classList.add('leftContent');

  const rightContent = document.createElement('div');
  rightContent.classList.add('rightContent');

  // Extract heading from first <p>
  const heading = paragraphs.shift();

  // Build Icons section: pattern = pic + desc
  const iconsWrapper = document.createElement('div');
  iconsWrapper.classList.add('demo1-icons');

  for (let i = 0; i < 3; i++) {
    const pic = paragraphs.shift();
    const desc = paragraphs.shift();

    const iconItem = document.createElement('div');
    iconItem.classList.add('demo1-icon-item');

    if (pic) iconItem.appendChild(pic.querySelector('picture'));
    if (desc) {
      desc.classList.add('demo1-icon-desc');
      iconItem.appendChild(desc);
    }

    iconsWrapper.appendChild(iconItem);
  }

  // CTA button
  const buttonPara = paragraphs.shift(); // contains <a>
  if (buttonPara) buttonPara.classList.add('button-container');

  // Final small image
  const endPic = paragraphs.shift();
  if (endPic) endPic.classList.add('demo1-final-img');

  // Clear container and rebuild
  container.innerHTML = '';
  leftContent.appendChild(heading);
  leftContent.appendChild(iconsWrapper);
  if (buttonPara) leftContent.appendChild(buttonPara);
  if (endPic) rightContent.appendChild(endPic);
  container.appendChild(leftContent);
  container.appendChild(rightContent);
}
