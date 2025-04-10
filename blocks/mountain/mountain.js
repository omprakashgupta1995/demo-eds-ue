document.addEventListener('DOMContentLoaded', () => {
  // Select all elements with the class "explore-slider"
  const containers = document.querySelectorAll('.swippers');
  // Function to create previous and next buttons for each slider
  containers.forEach((sliderContainer) => {
    // Create the previous button
    const prevButton = document.createElement('button');
    prevButton.classList.add('slider-btn', 'prev-btn');
    prevButton.innerHTML = '<';
    // Create the next button
    const nextButton = document.createElement('button');
    nextButton.classList.add('slider-btn', 'next-btn');
    nextButton.innerHTML = '>';
    // Append the buttons to the slider container
    sliderContainer.appendChild(prevButton);
    sliderContainer.appendChild(nextButton);
    // Teasers (slider items)
    const teasers = sliderContainer.querySelectorAll('.mountain');

    const totalTeasers = teasers.length;
    const teasersVisible = 1; // Number of teasers visible at a time
    const teaserWidth = 428; // Width of each teaser (adjust as necessary)
    const teaserMargin = 10;// margin
    let currentIndex = 0;
    // Function to update the slider position
    function updateSliderPosition() {
      const offset = -currentIndex * (teaserWidth + teaserMargin);
      teasers.forEach((element) => {
        element.style.transform = `translateX(${offset}px)`;
      });
    }
    // Event listener for the previous button
    prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex -= 1;
      } else {
        currentIndex = totalTeasers - teasersVisible; // Go back to the last set of teasers
      }
      updateSliderPosition();
    });
    // Event listener for the next button
    nextButton.addEventListener('click', () => {
      if (currentIndex < totalTeasers - teasersVisible) {
        currentIndex += 1;
      } else {
        currentIndex = 0; // Go back to the first set of teasers
      }
      updateSliderPosition();
    });
  });
});
