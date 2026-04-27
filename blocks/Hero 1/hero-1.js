import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const rows = [...block.children];
  block.innerText = ''; // Reset the block container

  const slideWrapper = document.createElement('div');
  slideWrapper.classList.add('hero-slides');

  const thumbWrapper = document.createElement('div');
  thumbWrapper.classList.add('hero-thumbs');

  const counter = document.createElement('div');
  counter.classList.add('hero-counter');

  rows.forEach((row, i) => {
    const [mediaCol, contentCol] = row.children;
    const mediaType = mediaCol.querySelector('p')?.textContent.trim().toLowerCase();

    // 1. Create the Main Slide
    const slide = document.createElement('div');
    slide.classList.add('hero-slide');
    if (i === 0) slide.classList.add('active');

    if (mediaType === 'video') {
      const videoUrl = mediaCol.querySelector('a')?.href;
      if (videoUrl) {
        slide.innerHTML = `<video autoplay muted loop playsinline class="hero-video">
          <source src="${videoUrl}" type="video/mp4">
        </video>`;
      }
    } else {
      // It's an image - get the FIRST picture in the media column
      const mainPic = mediaCol.querySelectorAll('picture')[0];
      if (mainPic) slide.append(mainPic);
    }

    // Add Overlay (Column 2)
    const overlay = document.createElement('div');
    overlay.classList.add('hero-overlay');
    overlay.innerHTML = contentCol.innerHTML;
    slide.append(overlay);
    slideWrapper.append(slide);

    // 2. Create the Thumbnail
    const thumbBtn = document.createElement('button');
    thumbBtn.classList.add('thumb-item');
    if (i === 0) thumbBtn.classList.add('selected');

    // Get the LAST picture in the media column (the thumbnail)
    const allPics = mediaCol.querySelectorAll('picture');
    const thumbPic = allPics[allPics.length - 1]; 
    if (thumbPic) thumbBtn.append(thumbPic);

    thumbBtn.addEventListener('click', () => {
      block.querySelectorAll('.hero-slide').forEach((s) => s.classList.remove('active'));
      block.querySelectorAll('.thumb-item').forEach((b) => b.classList.remove('selected'));
      
      slide.classList.add('active');
      thumbBtn.classList.add('selected');
      counter.innerHTML = `<span>${i + 1}</span>/<span>${rows.length}</span>`;
    });

    thumbWrapper.append(thumbBtn);
  });

  // Initial Counter Value
  counter.innerHTML = `<span>1</span>/<span>${rows.length}</span>`;

  block.append(slideWrapper, thumbWrapper, counter);
}