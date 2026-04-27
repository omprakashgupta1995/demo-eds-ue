export default function decorate(block) {
  const slides = [...block.children];

  const wrapper = document.createElement('div');
  wrapper.className = 'carousel-wrapper';

  const slidesContainer = document.createElement('div');
  slidesContainer.className = 'slides';

  const thumbnails = document.createElement('div');
  thumbnails.className = 'thumbnails';

  let current = 0;

  slides.forEach((slide, index) => {
    const cells = [...slide.children];

    const type = cells[0]?.textContent.trim(); // image | video
    const thumbnailSrc = cells[1]?.querySelector('img')?.src;
    const imageSrc = cells[2]?.querySelector('img')?.src;
    const videoUrl = cells[3]?.textContent.trim();
    const ctaText = cells[4]?.textContent.trim();
    const ctaLink = cells[5]?.textContent.trim();

    slide.className = 'slide';

    if (type === 'video') {
      slide.classList.add('video-slide');

      const video = document.createElement('video');
      video.src = videoUrl;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;

      const btn = document.createElement('a');
      btn.className = 'cta';
      btn.textContent = ctaText || 'Explore';
      btn.href = ctaLink || '#';

      slide.innerHTML = '';
      slide.append(video, btn);
    } else {
      slide.classList.add('image-slide');

      const img = document.createElement('img');
      img.src = imageSrc;

      slide.innerHTML = '';
      slide.appendChild(img);
    }

    slidesContainer.appendChild(slide);

    // Thumbnail
    const thumb = document.createElement('img');
    thumb.src = thumbnailSrc;
    thumb.className = 'thumb';

    thumb.addEventListener('click', () => {
      goToSlide(index);
    });

    thumbnails.appendChild(thumb);
  });

  wrapper.append(slidesContainer, thumbnails);
  block.innerHTML = '';
  block.append(wrapper);

  function goToSlide(index) {
    current = (index + slides.length) % slides.length;

    slidesContainer.style.transform = `translateX(-${current * 100}%)`;

    // Handle video play/pause
    slides.forEach((slide, i) => {
      const video = slide.querySelector('video');

      if (video) {
        if (i === current) {
          video.play();
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });

    [...thumbnails.children].forEach((t, i) => {
      t.classList.toggle('active', i === current);
    });
  }

  goToSlide(0);

  // Optional autoplay
  setInterval(() => {
    goToSlide(current + 1);
  }, 5000);
}