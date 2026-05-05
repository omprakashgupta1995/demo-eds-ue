export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });
  

 

  if(block && block.classList.contains('our-range-h')){
    const homePage_ourRange = block?.children?.[0];
    if(!homePage_ourRange) return;
    homePage_ourRange.classList.add('homepage-our-range');
    const ourRangeTextWrapper = homePage_ourRange?.children?.[0];
    const ourRangeButtonWrpper = homePage_ourRange?.children?.[1];

    if(ourRangeTextWrapper){
       ourRangeTextWrapper.classList.add('ourRange-text-wrapper');
       ourRangeTextWrapper?.children?.[0].classList.add('our-range-title');
       ourRangeTextWrapper?.children?.[1].classList.add('our-range-heading');
    }
   
    if(ourRangeButtonWrpper){
      const hasLink = ourRangeButtonWrpper.querySelector('a');
      if(hasLink){
        ourRangeButtonWrpper.classList.add('ourRange-button-wrapper');
      }
     else{
      ourRangeButtonWrpper.remove();
    } 
    }
    
  }

  if(block && block.classList.contains('our-range-cards')){
    const rangeCardsWrapper = block?.children?.[0];
    if(rangeCardsWrapper){
      rangeCardsWrapper.classList.add('range-cards-wrapper');
      [...rangeCardsWrapper.children].forEach((row)=>{
        row.classList.add('range-card');

        const cardPicture = row.querySelector('picture');
        const cardImage = cardPicture.querySelector('img');
        cardImage.classList.add('range-card-image');
        const imageWrapper = cardPicture.parentElement;
        imageWrapper.classList.add('card-image-wrapper');
        const link = row.querySelector('a');
        const buttonContainer = link.parentElement;
        buttonContainer.classList.add('card-button');
        const ImageText = row.children?.[2];
        ImageText.classList.add('image-text');
      })
    }
  }

  if(block && block.classList.contains('auto-scroll-h') && block.classList.contains('carousel-primary')){
      const carouselCardWrapper = block.children?.[0];
      if(carouselCardWrapper){
        carouselCardWrapper.classList.add('carousel-card-wrapper');
        [...carouselCardWrapper.children].forEach((row,index)=>{
          const carouselCard = row;
          if(carouselCard){
            carouselCard.classList.add(`carousel-card-${index+1}`);
          }
          const carouselCardImage = carouselCard.querySelector('img');
          if(carouselCardImage){
            carouselCardImage.classList.add('card-image');
          const carouselImageWrapper  = carouselCardImage.closest('p');
          carouselImageWrapper?.classList.add('card-image-wrapper');

          }
          
          const carouselButton = carouselCard.querySelector('a');
          if(carouselButton){
            carouselButton?.classList.add('card-button');
            const buttonContainer = carouselButton.parentElement;
            buttonContainer?.classList.add('card-button-container');
          }

          const textParagraphs = carouselCard.querySelectorAll('p:not(.card-image-wrapper):not(.card-button-container)');
          
          textParagraphs.forEach((textElement, textIndex) => {
            // Add a general class to all text
            textElement?.classList.add('card-text');
            
            // Differentiate between the first and second text blocks (like in Card 3)
            if (textIndex === 0) {
              textElement?.classList.add('card-text-primary'); 
            } else if (textIndex === 1) {
              textElement?.classList.add('card-text-secondary');
            }
          });

        })
        
        // --- THE BULLETPROOF INFINITE CLONE SETUP ---
      const track = document.createElement('div');
      track.classList.add('carousel-track');
      
      block.appendChild(track);
      track.appendChild(carouselCardWrapper); // Add original

      // Helper function to safely clone and strip EDS Universal Editor attributes
      const createCleanClone = () => {
        const clone = carouselCardWrapper.cloneNode(true);
        clone.classList.add('carousel-card-wrapper-clone');
        
        const aueElements = clone.querySelectorAll('[data-aue-resource], [data-aue-type], [data-aue-prop], [data-aue-behavior], [data-aue-filter]');
        aueElements.forEach((el) => {
          el.removeAttribute('data-aue-resource');
          el.removeAttribute('data-aue-type');
          el.removeAttribute('data-aue-prop');
          el.removeAttribute('data-aue-behavior');
          el.removeAttribute('data-aue-filter');
        });
        
        return clone;
      };

      // Append Clone 1
      track.appendChild(createCleanClone());
      
      // Append Clone 2 (The Buffer)
      track.appendChild(createCleanClone());
      }
  }

}
