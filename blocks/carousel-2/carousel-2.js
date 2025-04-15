/* eslint-disable*/
document.addEventListener('DOMContentLoaded', () => {
    // Create carousel elements
    const carousel = document.createElement('div');
    carousel.className = 'carousel';
  
    const track = document.createElement('div');
    track.className = 'carousel-track';
  
    // Add slides
    const numberOfSlides = 10; // You can change this
    for (let i = 1; i <= numberOfSlides; i++) {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';
      slide.textContent = `Slide ${i}`;
      track.appendChild(slide);
    }
  
    // Navigation buttons
    const prevBtn = document.createElement('button');
    prevBtn.className = 'carousel-button prev';
    prevBtn.innerHTML = '&#10094;'; // ← arrow
  
    const nextBtn = document.createElement('button');
    nextBtn.className = 'carousel-button next';
    nextBtn.innerHTML = '&#10095;'; // → arrow
  
    // Append everything
    carousel.appendChild(prevBtn);
    carousel.appendChild(track);
    carousel.appendChild(nextBtn);
    document.body.appendChild(carousel);
  
    // Scroll logic
    const slideWidth = 316; // 300px + 16px margin
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: slideWidth, behavior: 'smooth' });
    });
  
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -slideWidth, behavior: 'smooth' });
    });
});
  