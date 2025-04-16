/*eslint-disable*/
/*
 * Rating Block
 * Show a rating with stars (1 to 5) based on user input
 * This script will dynamically render stars based on the rating value.
 */

const loadRating = (block, ratingValue) => {
    if (block.classList.contains('rating-is-loaded')) {
      return;
    }
  
    const starContainer = document.createElement('div');
    starContainer.classList.add('star-rating');
  
    // Loop to create star elements based on ratingValue
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('span');
      if (i <= ratingValue) {
        star.classList.add('filled');
      } else {
        star.classList.add('empty');
      }
      star.classList.add('star');
      starContainer.appendChild(star);
    }
  
    block.innerHTML = '';  // Clear the existing content
    block.appendChild(starContainer);  // Append the star container
  
    block.classList.add('rating-is-loaded');
  };
  
  export default function decorate(block) {
    const ratingValue = parseInt(block.getAttribute('data-rating-value'), 10) || 3; // Default to 3 if not set
    loadRating(block, ratingValue);
  }
  